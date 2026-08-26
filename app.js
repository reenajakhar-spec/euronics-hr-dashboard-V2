const pageTitles = {
  overview: ['Executive Overview', 'CEO & CHRO command view'],
  employees: ['Employee CRM', 'Searchable employee 360° operating view'],
  recruitment: ['Recruitment Pipeline', 'Requisition-to-joining funnel'],
  attendance: ['Attendance & Leave', 'Attendance health and regularisation'],
  performance: ['Performance Management', 'Green / Yellow / Red / PIP view'],
  payroll: ['Payroll & Compensation', 'Cost and compensation health'],
  learning: ['L&D / EuroVersity', 'Training and certification'],
  engagement: ['Engagement & Culture', 'Sentiment and recognition'],
  compliance: ['Compliance & Statutory', 'Statutory readiness'],
  alerts: ['Alerts & Action Centre', 'Ownership, due dates and follow-up']
};

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById(page).classList.add('active');

  const navBtn = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navBtn) navBtn.classList.add('active');

  document.getElementById('pageTitle').textContent = pageTitles[page][0];
  document.getElementById('pageSub').textContent = pageTitles[page][1];

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    navigate(btn.dataset.page);
  });
});

document.querySelectorAll('[data-page-jump]').forEach(btn => {
  btn.addEventListener('click', () => {
    navigate(btn.dataset.pageJump);
  });
});


function kpi(label, value, sub = '', cls = '') {
  return `
    <div class="kpi-card ${cls}">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
      <div class="sub ${sub.includes('▲') ? 'good' : sub.includes('▼') ? 'bad' : ''}">
        ${sub}
      </div>
    </div>
  `;
}


/* =========================
   OVERVIEW
========================= */

document.getElementById('overviewKpis').innerHTML = [
  kpi('Total Headcount', '612', '▲ +6 vs June'),
  kpi('Attendance Rate', '93.4%', 'Jul MTD avg'),
  kpi('Open Positions', '18', '3 aged >8 weeks', 'warn'),
  kpi(
    'Attrition (Rolling 12M)',
    '14.2%',
    'Sales 18.4% · Non-Sales 9.7%'
  ),
  kpi('PIP Cases', '4', '2 Sales · 1 Plant · 1 Corp'),
  kpi('eNPS Score', '+32', '▲ +4 vs last survey', 'highlight')
].join('');


makeLineChart(
  'headcountChart',
  ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
  [605, 606, 606, 612, 618],
  'Headcount'
);


makeLineChart(
  'attritionChart',
  ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
  [15.4, 15.1, 14.8, 14.2, 13.9],
  'Attrition %'
);


const departments = [
  ['Production', 89.1, 81, 'red'],
  ['Sales & BD', 96.2, 74, 'amber'],
  ['Quality', 94.8, 85, 'green'],
  ['Supply Chain', 95.5, 79, 'green'],
  ['Engineering/NPD', 97.1, 88, 'green']
];


document.getElementById('departmentHealth').innerHTML =
  departments.map(d => `
    <div class="health-row">

      <div class="health-main">

        <div class="health-dot ${d[3]}"></div>

        <div>
          <div class="health-name">
            ${d[0]}
          </div>

          <div class="health-meta">
            Attendance ${d[1]}% · Avg KRA ${d[2]}%
          </div>
        </div>

      </div>

      <div class="health-score">
        ${d[2]}%
      </div>

    </div>
  `).join('');


function alertCard(a) {
  const cls = a.priority.toLowerCase();

  return `
    <div class="alert-card">

      <div class="alert-left">

        <span class="priority-pill priority-${cls}">
          ${a.priority}
        </span>

        <div>
          <div class="alert-title">
            ${a.action}
          </div>

          <div class="alert-meta">
            ${a.owner} · Due ${a.due}
          </div>
        </div>

      </div>

      <span class="status-pill status-${a.status.toLowerCase().replaceAll(' ', '')}">
        ${a.status}
      </span>

    </div>
  `;
}


document.getElementById('priorityAlerts').innerHTML =
  HR_DATA.alerts
    .slice(0, 4)
    .map(alertCard)
    .join('');


/* =========================
   EMPLOYEE CRM
========================= */

function renderEmployees() {

  const q =
    document.getElementById('employeeSearch')
      .value
      .toLowerCase();

  const globalQ =
    document.getElementById('globalSearch')
      .value
      .toLowerCase();

  const loc =
    document.getElementById('filterLocation')
      .value;

  const dept =
    document.getElementById('filterDepartment')
      .value;

  const manager =
    document.getElementById('filterManager')
      .value;

  const status =
    document.getElementById('filterStatus')
      .value;


  const rows = HR_DATA.employees.filter(e => {

    const text =
      `${e.name} ${e.role} ${e.department} ${e.manager} ${e.location}`
        .toLowerCase();


    return (

      (!q || text.includes(q)) &&

      (!globalQ || text.includes(globalQ)) &&

      (loc === 'all' || e.location === loc) &&

      (dept === 'all' || e.department === dept) &&

      (manager === 'all' || e.manager === manager) &&

      (status === 'all' || e.status === status)

    );

  });


  document.getElementById('employeeCount').textContent =
    rows.length;


  document.getElementById('employeeTableBody').innerHTML =
    rows.map(e => `

      <tr>

        <td>

          <div class="emp-name">
            ${e.name}
          </div>

          <div class="emp-role">
            ${e.role}
          </div>

        </td>


        <td>
          ${e.department}
        </td>


        <td>
          ${e.manager}
        </td>


        <td>
          ${e.location}
        </td>


        <td>
          ${e.attendance}%
        </td>


        <td>
          ${e.kra}%
        </td>


        <td>

          <span class="status-pill status-${e.status.toLowerCase()}">
            ${e.status}
          </span>

        </td>


        <td>

          <button
            class="view-btn"
            onclick="openEmployee(${e.id})"
          >
            View 360°
          </button>

        </td>

      </tr>

    `).join('');

}


document
  .getElementById('employeeSearch')
  .addEventListener(
    'input',
    renderEmployees
  );


document
  .getElementById('globalSearch')
  .addEventListener(
    'input',
    renderEmployees
  );


[
  'filterLocation',
  'filterDepartment',
  'filterManager',
  'filterStatus'
].forEach(id => {

  document
    .getElementById(id)
    .addEventListener(
      'change',
      renderEmployees
    );

});


document
  .getElementById('resetFilters')
  .addEventListener(
    'click',
    () => {

      [
        'filterLocation',
        'filterDepartment',
        'filterManager',
        'filterStatus'
      ].forEach(id => {

        document
          .getElementById(id)
          .value = 'all';

      });


      document
        .getElementById('globalSearch')
        .value = '';


      document
        .getElementById('employeeSearch')
        .value = '';


      renderEmployees();

    }
  );


renderEmployees();


/* =========================
   EMPLOYEE 360 DRAWER
========================= */

function openEmployee(id) {

  const e =
    HR_DATA.employees.find(
      x => x.id === id
    );


  if (!e) return;


  document
    .getElementById('drawerName')
    .textContent = e.name;


  document
    .getElementById('drawerRole')
    .textContent =
      `${e.role} · ${e.department}`;


  document
    .getElementById('drawerBody')
    .innerHTML = `

      <div class="profile-grid">

        ${profileCard('Manager', e.manager)}

        ${profileCard('Location', e.location)}

        ${profileCard('Joining Date', e.joining)}

        ${profileCard('Tenure', e.tenure)}

        ${profileCard('Attendance', e.attendance + '%')}

        ${profileCard('KRA Score', e.kra + '%')}

        ${profileCard('Status', e.status)}

        ${profileCard('Band', e.band)}

        ${profileCard('Leave Balance', e.leave)}

        ${profileCard('Training', e.training)}

        ${profileCard('Recognition', e.recognition)}

      </div>


      <div class="profile-section">

        <h4>
          Employee Timeline
        </h4>


        ${e.timeline.map(t => {

          const split =
            t.split(' · ');


          return `

            <div class="timeline-item">

              <strong>
                ${split[0]}
              </strong>

              ${split[1] || ''}

            </div>

          `;

        }).join('')}

      </div>

    `;


  document
    .getElementById('employeeDrawer')
    .classList
    .add('open');


  document
    .getElementById('drawerOverlay')
    .classList
    .add('open');

}


function profileCard(label, value) {

  return `

    <div class="profile-card">

      <div class="profile-label">
        ${label}
      </div>

      <div class="profile-value">
        ${value}
      </div>

    </div>

  `;

}


function closeDrawer() {

  document
    .getElementById('employeeDrawer')
    .classList
    .remove('open');


  document
    .getElementById('drawerOverlay')
    .classList
    .remove('open');

}


document
  .getElementById('drawerClose')
  .addEventListener(
    'click',
    closeDrawer
  );


document
  .getElementById('drawerOverlay')
  .addEventListener(
    'click',
    closeDrawer
  );


/* =========================
   RECRUITMENT
========================= */

document.getElementById('recruitmentKpis').innerHTML = [

  kpi(
    'Open Positions',
    '18',
    '3 critical roles'
  ),

  kpi(
    'Avg Time-to-Hire',
    '34 days',
    '▼ 4 days vs Q1'
  ),

  kpi(
    'Offer Accept Rate',
    '81%',
    'Q2 rolling avg'
  ),

  kpi(
    'Requisitions MTD',
    '12',
    '7 Sales · 3 Plant · 2 Corp'
  )

].join('');


const stages = [
  'Requisition',
  'Sourcing',
  'Interview',
  'Offer',
  'Joined'
];


document.getElementById('recruitmentPipeline').innerHTML =

  stages.map(stage => {

    const list =
      HR_DATA.requisitions.filter(
        r => r.stage === stage
      );


    return `

      <div class="stage">

        <div class="stage-head">

          <div class="stage-title">
            ${stage}
          </div>

          <div class="stage-count">
            ${list.length}
          </div>

        </div>


        ${list.map(r => `

          <div class="req-card">

            <div class="req-role">
              ${r.role}
            </div>

            <div class="req-meta">
              ${r.dept} · ${r.owner}
            </div>

            <div class="req-age">
              ${r.days} days open
            </div>

          </div>

        `).join('')}

      </div>

    `;

  }).join('');


/* =========================
   ATTENDANCE
========================= */

document.getElementById('attendanceKpis').innerHTML = [

  kpi(
    'Overall Attendance',
    '93.4%',
    'Jul MTD'
  ),

  kpi(
    'Plant Absenteeism',
    '11.2%',
    'Mon/Fri pattern',
    'warn'
  ),

  kpi(
    'Pending Leave Approvals',
    '18',
    'Awaiting manager action'
  ),

  kpi(
    'Regularisation',
    '98',
    '▼ 14.8% MoM'
  )

].join('');


makeLineChart(
  'attendanceChart',
  ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
  [93.0, 93.1, 93.2, 93.4, 93.6],
  'Attendance %'
);


document.getElementById('attendanceIssues').innerHTML = [

  [
    'Plant absenteeism',
    '11.2%',
    'red'
  ],

  [
    'Late arrivals',
    '142 MTD',
    'amber'
  ],

  [
    'Regularisation requests',
    '98',
    'amber'
  ],

  [
    'Pending leave approvals',
    '18',
    'amber'
  ]

].map(i => `

  <div class="issue-row">

    <div>

      <div class="health-name">
        ${i[0]}
      </div>

      <div class="health-meta">
        ${i[1]}
      </div>

    </div>


    <span
      class="status-pill
      status-${i[2] === 'red' ? 'red' : 'yellow'}"
    >

      ${i[2] === 'red' ? 'Critical' : 'Watch'}

    </span>

  </div>

`).join('');


/* =========================
   PERFORMANCE
========================= */

document.getElementById('performanceKpis').innerHTML = [

  kpi(
    'Avg KRA Score',
    '78%',
    'Company-wide'
  ),

  kpi(
    'Green',
    '71%',
    'Healthy workforce'
  ),

  kpi(
    'Yellow',
    '18%',
    'Coaching required',
    'warn'
  ),

  kpi(
    'Red / PIP',
    '11%',
    'Immediate action'
  )

].join('');


document.getElementById('performanceMatrix').innerHTML = `

  <div class="matrix-row matrix-head">

    <div>Employee</div>
    <div>Attendance</div>
    <div>KRA</div>
    <div>Status</div>
    <div>Manager</div>

  </div>


  ${HR_DATA.employees
    .slice(0, 8)
    .map(e => `

      <div class="matrix-row">

        <div class="matrix-name">
          ${e.name}
        </div>

        <div>
          ${e.attendance}%
        </div>

        <div>
          ${e.kra}%
        </div>

        <div>

          <span
            class="status-pill
            status-${e.status.toLowerCase()}"
          >
            ${e.status}
          </span>

        </div>

        <div>
          ${e.manager}
        </div>

      </div>

    `)
    .join('')}

`;


/* =========================
   PAYROLL
========================= */

document.getElementById('payrollKpis').innerHTML = [

  kpi(
    'Payroll Cost',
    '₹1.42 Cr/mo',
    'Excl Directors'
  ),

  kpi(
    'OT Cost',
    '₹4.8 L',
    '▲ 6% vs Jun',
    'warn'
  ),

  kpi(
    'Comp Ratio',
    '0.96',
    'Vs band midpoint'
  ),

  kpi(
    'Increment Budget',
    '68%',
    'FY26-27 utilised'
  )

].join('');


makeLineChart(
  'payrollChart',
  ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
  [1.34, 1.36, 1.39, 1.42, 1.44],
  'Payroll ₹Cr'
);


/* =========================
   L&D
========================= */

document.getElementById('learningKpis').innerHTML = [

  kpi(
    'Training Coverage',
    '74%',
    'Eligible workforce'
  ),

  kpi(
    'Sales Training',
    '118 h',
    'July'
  ),

  kpi(
    'Dojo Sessions',
    '6',
    'This month'
  ),

  kpi(
    'Certifications',
    '22',
    'BIS + product certs'
  )

].join('');


document.getElementById('learningTable').innerHTML = [

  [
    'Sales Product Training',
    '46 employees',
    '92% complete'
  ],

  [
    'Leadership Essentials',
    '18 managers',
    '78% complete'
  ],

  [
    'Plant Safety',
    '212 employees',
    '96% complete'
  ],

  [
    'BIS / Compliance',
    '39 employees',
    '81% complete'
  ]

].map(r => `

  <div class="learning-row">

    <div>

      <div class="health-name">
        ${r[0]}
      </div>

      <div class="health-meta">
        ${r[1]}
      </div>

    </div>

    <strong>
      ${r[2]}
    </strong>

  </div>

`).join('');


/* =========================
   ENGAGEMENT
========================= */

document.getElementById('engagementKpis').innerHTML = [

  kpi(
    'eNPS',
    '+32',
    '▲ +4 vs last survey'
  ),

  kpi(
    'Survey Participation',
    '87%',
    'Latest pulse'
  ),

  kpi(
    'R&R Nominations',
    '14',
    'Across 6 categories'
  ),

  kpi(
    'Town Hall Attendance',
    '96%',
    'Last quarter'
  )

].join('');


makeLineChart(
  'engagementChart',
  [
    'Q3 FY25',
    'Q4 FY25',
    'Q1 FY26',
    'Q2 FY26'
  ],
  [21, 26, 28, 32],
  'eNPS'
);


/* =========================
   COMPLIANCE
========================= */

document.getElementById('complianceKpis').innerHTML = [

  kpi(
    'PF Compliance',
    '100%',
    'On-time filing'
  ),

  kpi(
    'ESI Compliance',
    '100%',
    'On-time filing'
  ),

  kpi(
    'POSH Cases',
    '0',
    'No pending cases'
  ),

  kpi(
    'Audit Pending',
    '1',
    'Factories Act · Aug',
    'warn'
  )

].join('');


document.getElementById('complianceList').innerHTML = [

  [
    'PF Filing',
    'Compliant',
    'Green'
  ],

  [
    'ESI Filing',
    'Compliant',
    'Green'
  ],

  [
    'POSH Committee',
    'Compliant',
    'Green'
  ],

  [
    'Factories Act Audit',
    'Scheduled — August',
    'Yellow'
  ]

].map(r => `

  <div class="compliance-row">

    <div>

      <div class="health-name">
        ${r[0]}
      </div>

      <div class="health-meta">
        ${r[1]}
      </div>

    </div>

    <span
      class="status-pill
      status-${r[2].toLowerCase()}"
    >
      ${r[2]}
    </span>

  </div>

`).join('');


/* =========================
   ALERT CENTRE
========================= */

document.getElementById('alertTableBody').innerHTML =

  HR_DATA.alerts.map(a => `

    <tr>

      <td>

        <span
          class="priority-pill
          priority-${a.priority.toLowerCase()}"
        >
          ${a.priority}
        </span>

      </td>


      <td>

        <strong>
          ${a.action}
        </strong>

      </td>


      <td>
        ${a.owner}
      </td>


      <td>
        ${a.due}
      </td>


      <td>

        <span
          class="status-pill
          status-${a.status
            .toLowerCase()
            .replaceAll(' ', '')}"
        >
          ${a.status}
        </span>

      </td>


      <td>

        <button class="view-btn">
          Open
        </button>

      </td>

    </tr>

  `).join('');