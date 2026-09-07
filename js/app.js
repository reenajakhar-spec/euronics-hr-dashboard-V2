/* =========================================================
   EURONICS HR COMMAND CENTRE
   COMPLETE app.js
   Recruitment = LIVE
   Other dashboards = existing HR_DATA / dummy data
========================================================= */


/* =========================================================
   PAGE TITLES
========================================================= */

const pageTitles = {

  overview: [
    'Executive Overview',
    'CEO & CHRO command view'
  ],

  employees: [
    'Employee CRM',
    'Searchable employee 360° operating view'
  ],

  recruitment: [
    'Recruitment Command Centre',
    'Live Talent Acquisition analytics'
  ],

  attendance: [
    'Attendance & Leave',
    'Attendance health and regularisation'
  ],

  performance: [
    'Performance Management',
    'Green / Yellow / Red / PIP view'
  ],

  payroll: [
    'Payroll & Compensation',
    'Cost and compensation health'
  ],

  learning: [
    'L&D / EuroVersity',
    'Training and certification'
  ],

  engagement: [
    'Engagement & Culture',
    'Sentiment and recognition'
  ],

  compliance: [
    'Compliance & Statutory',
    'Statutory readiness'
  ],

  alerts: [
    'Alerts & Action Centre',
    'Ownership, due dates and follow-up'
  ]

};


/* =========================================================
   SAFE DOM HELPERS
========================================================= */

function getEl(id) {
  return document.getElementById(id);
}


function setHTML(id, html) {

  const el = getEl(id);

  if (el) {
    el.innerHTML = html;
  }

}


function setText(id, value) {

  const el = getEl(id);

  if (el) {
    el.textContent = value;
  }

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigate(page) {

  document
    .querySelectorAll('.page')
    .forEach(p => p.classList.remove('active'));


  document
    .querySelectorAll('.nav-item')
    .forEach(n => n.classList.remove('active'));


  const pageEl =
    getEl(page);


  if (pageEl) {
    pageEl.classList.add('active');
  }


  const navBtn =
    document.querySelector(
      `.nav-item[data-page="${page}"]`
    );


  if (navBtn) {
    navBtn.classList.add('active');
  }


  if (pageTitles[page]) {

    setText(
      'pageTitle',
      pageTitles[page][0]
    );


    setText(
      'pageSub',
      pageTitles[page][1]
    );

  }


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}


document
  .querySelectorAll('.nav-item')
  .forEach(btn => {

    btn.addEventListener(
      'click',
      () => navigate(btn.dataset.page)
    );

  });


document
  .querySelectorAll('[data-page-jump]')
  .forEach(btn => {

    btn.addEventListener(
      'click',
      () => navigate(btn.dataset.pageJump)
    );

  });


/* =========================================================
   KPI HELPER
========================================================= */

function kpi(
  label,
  value,
  sub = '',
  cls = ''
) {

  return `

    <div class="kpi-card ${cls}">

      <div class="label">
        ${label}
      </div>

      <div class="value">
        ${value}
      </div>

      <div
        class="sub ${
          sub.includes('▲')
            ? 'good'
            : sub.includes('▼')
              ? 'bad'
              : ''
        }"
      >
        ${sub}
      </div>

    </div>

  `;

}


/* =========================================================
   OVERVIEW
========================================================= */

if (getEl('overviewKpis')) {

  setHTML(
    'overviewKpis',

    [

      kpi(
        'Total Headcount',
        '612',
        '▲ +6 vs June'
      ),

      kpi(
        'Attendance Rate',
        '93.4%',
        'Jul MTD avg'
      ),

      kpi(
        'Open Positions',
        '18',
        'Recruitment connected live',
        'warn'
      ),

      kpi(
        'Attrition (Rolling 12M)',
        '14.2%',
        'Sales 18.4% · Non-Sales 9.7%'
      ),

      kpi(
        'PIP Cases',
        '4',
        '2 Sales · 1 Plant · 1 Corp'
      ),

      kpi(
        'eNPS Score',
        '+32',
        '▲ +4 vs last survey',
        'highlight'
      )

    ].join('')

  );

}


if (
  typeof makeLineChart === 'function'
) {

  makeLineChart(
    'headcountChart',
    [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
    ],
    [
      605,
      606,
      606,
      612,
      618
    ],
    'Headcount'
  );


  makeLineChart(
    'attritionChart',
    [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
    ],
    [
      15.4,
      15.1,
      14.8,
      14.2,
      13.9
    ],
    'Attrition %'
  );

}


const departments = [

  [
    'Production',
    89.1,
    81,
    'red'
  ],

  [
    'Sales & BD',
    96.2,
    74,
    'amber'
  ],

  [
    'Quality',
    94.8,
    85,
    'green'
  ],

  [
    'Supply Chain',
    95.5,
    79,
    'green'
  ],

  [
    'Engineering/NPD',
    97.1,
    88,
    'green'
  ]

];


if (getEl('departmentHealth')) {

  setHTML(

    'departmentHealth',

    departments
      .map(d => `

        <div class="health-row">

          <div class="health-main">

            <div
              class="health-dot ${d[3]}"
            ></div>

            <div>

              <div class="health-name">
                ${d[0]}
              </div>

              <div class="health-meta">
                Attendance ${d[1]}%
                ·
                Avg KRA ${d[2]}%
              </div>

            </div>

          </div>

          <div class="health-score">
            ${d[2]}%
          </div>

        </div>

      `)
      .join('')

  );

}


/* =========================================================
   ALERT CARD
========================================================= */

function alertCard(a) {

  const priorityClass =
    String(a.priority || '')
      .toLowerCase();


  const statusClass =
    String(a.status || '')
      .toLowerCase()
      .replaceAll(' ', '');


  return `

    <div class="alert-card">

      <div class="alert-left">

        <span
          class="priority-pill
          priority-${priorityClass}"
        >
          ${a.priority}
        </span>

        <div>

          <div class="alert-title">
            ${a.action}
          </div>

          <div class="alert-meta">
            ${a.owner}
            ·
            Due ${a.due}
          </div>

        </div>

      </div>

      <span
        class="status-pill
        status-${statusClass}"
      >
        ${a.status}
      </span>

    </div>

  `;

}


if (
  typeof HR_DATA !== 'undefined' &&
  HR_DATA.alerts &&
  getEl('priorityAlerts')
) {

  setHTML(

    'priorityAlerts',

    HR_DATA.alerts
      .slice(0, 4)
      .map(alertCard)
      .join('')

  );

}


/* =========================================================
   EMPLOYEE CRM
========================================================= */

function renderEmployees() {

  if (
    typeof HR_DATA === 'undefined' ||
    !HR_DATA.employees
  ) {
    return;
  }


  const employeeSearch =
    getEl('employeeSearch');


  const globalSearch =
    getEl('globalSearch');


  const q =
    employeeSearch
      ? employeeSearch.value.toLowerCase()
      : '';


  const globalQ =
    globalSearch
      ? globalSearch.value.toLowerCase()
      : '';


  const loc =
    getEl('filterLocation')
      ?.value || 'all';


  const dept =
    getEl('filterDepartment')
      ?.value || 'all';


  const manager =
    getEl('filterManager')
      ?.value || 'all';


  const status =
    getEl('filterStatus')
      ?.value || 'all';


  const rows =
    HR_DATA.employees.filter(e => {

      const text =
        `${e.name}
         ${e.role}
         ${e.department}
         ${e.manager}
         ${e.location}`
          .toLowerCase();


      return (

        (
          !q ||
          text.includes(q)
        )

        &&

        (
          !globalQ ||
          text.includes(globalQ)
        )

        &&

        (
          loc === 'all' ||
          e.location === loc
        )

        &&

        (
          dept === 'all' ||
          e.department === dept
        )

        &&

        (
          manager === 'all' ||
          e.manager === manager
        )

        &&

        (
          status === 'all' ||
          e.status === status
        )

      );

    });


  setText(
    'employeeCount',
    rows.length
  );


  setHTML(

    'employeeTableBody',

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

          <span
            class="status-pill
            status-${String(e.status).toLowerCase()}"
          >
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

    `).join('')

  );

}


getEl('employeeSearch')
  ?.addEventListener(
    'input',
    renderEmployees
  );


getEl('globalSearch')
  ?.addEventListener(
    'input',
    renderEmployees
  );


[
  'filterLocation',
  'filterDepartment',
  'filterManager',
  'filterStatus'
]
.forEach(id => {

  getEl(id)
    ?.addEventListener(
      'change',
      renderEmployees
    );

});


getEl('resetFilters')
  ?.addEventListener(
    'click',
    () => {

      [
        'filterLocation',
        'filterDepartment',
        'filterManager',
        'filterStatus'
      ]
      .forEach(id => {

        const el =
          getEl(id);

        if (el) {
          el.value = 'all';
        }

      });


      if (getEl('globalSearch')) {
        getEl('globalSearch').value = '';
      }


      if (getEl('employeeSearch')) {
        getEl('employeeSearch').value = '';
      }


      renderEmployees();

    }
  );


renderEmployees();


/* =========================================================
   EMPLOYEE 360
========================================================= */

function profileCard(
  label,
  value
) {

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


function openEmployee(id) {

  if (
    typeof HR_DATA === 'undefined' ||
    !HR_DATA.employees
  ) {
    return;
  }


  const e =
    HR_DATA.employees.find(
      x => x.id === id
    );


  if (!e) {
    return;
  }


  setText(
    'drawerName',
    e.name
  );


  setText(
    'drawerRole',
    `${e.role} · ${e.department}`
  );


  setHTML(

    'drawerBody',

    `

      <div class="profile-grid">

        ${profileCard(
          'Manager',
          e.manager
        )}

        ${profileCard(
          'Location',
          e.location
        )}

        ${profileCard(
          'Joining Date',
          e.joining
        )}

        ${profileCard(
          'Tenure',
          e.tenure
        )}

        ${profileCard(
          'Attendance',
          e.attendance + '%'
        )}

        ${profileCard(
          'KRA Score',
          e.kra + '%'
        )}

        ${profileCard(
          'Status',
          e.status
        )}

        ${profileCard(
          'Band',
          e.band
        )}

        ${profileCard(
          'Leave Balance',
          e.leave
        )}

        ${profileCard(
          'Training',
          e.training
        )}

        ${profileCard(
          'Recognition',
          e.recognition
        )}

      </div>


      <div class="profile-section">

        <h4>
          Employee Timeline
        </h4>

        ${
          (e.timeline || [])
            .map(t => {

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

            })
            .join('')
        }

      </div>

    `

  );


  getEl('employeeDrawer')
    ?.classList
    .add('open');


  getEl('drawerOverlay')
    ?.classList
    .add('open');

}


function closeDrawer() {

  getEl('employeeDrawer')
    ?.classList
    .remove('open');


  getEl('drawerOverlay')
    ?.classList
    .remove('open');

}


getEl('drawerClose')
  ?.addEventListener(
    'click',
    closeDrawer
  );


getEl('drawerOverlay')
  ?.addEventListener(
    'click',
    closeDrawer
  );


/* =========================================================
   LIVE RECRUITMENT
========================================================= */

const RECRUITMENT_API_URL =
  'https://script.google.com/a/macros/euronics.co.in/s/AKfycbxA8vc8YBnpl1u3lbi8L-K_jHOKVXJPc3j1h1Ggs7c_M2MhpUFxFSGZFDyy88zMLTPg/exec';


let recruitmentHeaders = [];

let recruitmentRawRows = [];

let recruitmentData = [];

let recruitmentAgeFilter =
  'all';


const recruitmentCharts = {};


/* =========================================================
   RECRUITMENT HELPERS
========================================================= */

function recruitmentEscapeHtml(value) {

  return String(
    value ?? ''
  )
    .replace(
      /&/g,
      '&amp;'
    )
    .replace(
      /</g,
      '&lt;'
    )
    .replace(
      />/g,
      '&gt;'
    )
    .replace(
      /"/g,
      '&quot;'
    )
    .replace(
      /'/g,
      '&#039;'
    );

}


function recruitmentField(
  row,
  possibleKeys
) {

  for (
    const key of possibleKeys
  ) {

    if (
      Object.prototype
        .hasOwnProperty
        .call(row, key)

      &&

      row[key] !== null

      &&

      row[key] !== undefined
    ) {

      return String(
        row[key]
      ).trim();

    }

  }


  return '';

}


function normalizeReqType(value) {

  const v =
    String(value || '')
      .trim()
      .toLowerCase();


  if (
    v.includes('replacement')
  ) {
    return 'Replacement';
  }


  if (
    v.includes('new hire')
  ) {
    return 'New Hire';
  }


  return String(
    value || ''
  ).trim();

}


/* =========================================================
   IMPORTANT:
   THESE FIELD NAMES MATCH YOUR WORKING JSON API
========================================================= */

function normalizeRecruitmentRow(row) {

  return {

    raw: row,


    reqNo:
      recruitmentField(
        row,
        [
          'reqId',
          'Req. No.',
          'Req No.',
          'Req No',
          'reqNo'
        ]
      ),


    reqDate:
      recruitmentField(
        row,
        [
          'reqDate',
          'Req Date',
          'Req. Date'
        ]
      ),


    jobTitle:
      recruitmentField(
        row,
        [
          'jobTitle',
          'Job Title'
        ]
      ),


    posted:
      recruitmentField(
        row,
        [
          'sourceOfHire',
          'Source of Hire',
          'posted',
          'Posted',
          'Source'
        ]
      ),


    department:
      recruitmentField(
        row,
        [
          'department',
          'Department'
        ]
      ),


    location:
      recruitmentField(
        row,
        [
          'location',
          'Location'
        ]
      ),


    remarks:
      recruitmentField(
        row,
        [
          'remarks',
          'Remarks'
        ]
      ),


    status:
      recruitmentField(
        row,
        [
          'status',
          'Status'
        ]
      ),


    priority:
      recruitmentField(
        row,
        [
          'priority',
          'Priority'
        ]
      ),


    recruiter:
      recruitmentField(
        row,
        [
          'recruiter',
          'Recruiter'
        ]
      ),


    calls:
      recruitmentField(
        row,
        [
          'totalCalls',
          'calls',
          'Total Calls Done (Count)',
          'Total Calls Done',
          'Calls'
        ]
      ),


    screened:
      recruitmentField(
        row,
        [
          'screened',
          'Screened (Called and had a first discussion about role)',
          'Screened'
        ]
      ),


    nextRound:
      recruitmentField(
        row,
        [
          'nextRound',
          'Next Round (Count out of Screened)',
          'Next Round'
        ]
      ),


    rejected:
      recruitmentField(
        row,
        [
          'rejected',
          'Rejected (Count Out of Screened)',
          'Rejected'
        ]
      ),


    hiringManager:
      recruitmentField(
        row,
        [
          'hiringManager',
          'Hiring Manager',
          'HiringManager'
        ]
      ),


    reqType:
      normalizeReqType(

        recruitmentField(
          row,
          [
            'reqType',
            'Req Type\n(New Hire / Replacement)',
            'Req Type (New Hire / Replacement)',
            'Req Type'
          ]
        )

      ),


    budget:
      recruitmentField(
        row,
        [
          'budget',
          'Budget\n(CTC Range ₹)',
          'Budget (CTC Range ₹)',
          'Budget'
        ]
      ),


    experience:
      recruitmentField(
        row,
        [
          'experience',
          'Experience\nRequired',
          'Experience Required',
          'Experience'
        ]
      ),


    tat:
      recruitmentField(
        row,
        [
          'tatDays',
          'Target Close Days (TAT)',
          'Target Close Days',
          'TAT'
        ]
      ),


    positionType:
      recruitmentField(
        row,
        [
          'positionType',
          'Position Type'
        ]
      ),


    headCount:
      recruitmentField(
        row,
        [
          'headcount',
          'Head count',
          'Headcount'
        ]
      ),


    replacementName:
      recruitmentField(
        row,
        [
          'replacementName',
          ' Replacement Name ',
          'Replacement Name'
        ]
      ),


    candidateShortlistedDate:
      recruitmentField(
        row,
        [
          'shortlistedDate',
          'Candidate Shortlisted Date',
          'Shortlisted Date'
        ]
      ),


    offerDate:
      recruitmentField(
        row,
        [
          'offerDate',
          'Offer Date'
        ]
      ),


    candidateName:
      recruitmentField(
        row,
        [
          'candidateName',
          'Candidate Name'
        ]
      ),


    candidateDoj:
      recruitmentField(
        row,
        [
          'candidateDOJ',
          'candidateDoj',
          'Candidate DOJ',
          'DOJ'
        ]
      ),


    positionLevel:
      recruitmentField(
        row,
        [
          'positionLevel',
          'Position Level'
        ]
      ),


    apiAgeDays:
      recruitmentField(
        row,
        [
          'ageDays'
        ]
      ),


    timeToHireDays:
      recruitmentField(
        row,
        [
          'timeToHireDays'
        ]
      )

  };

}


/* =========================================================
   DATE / AGE
========================================================= */

function parseRecruitmentDate(value) {

  if (!value) {
    return null;
  }


  const raw =
    String(value).trim();


  const direct =
    new Date(raw);


  if (
    !isNaN(
      direct.getTime()
    )
  ) {

    return direct;

  }


  const months = {

    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    sep: 8,
    sept: 8,
    oct: 9,
    nov: 10,
    dec: 11

  };


  const cleaned =
    raw
      .replace(
        /,/g,
        ''
      )
      .replace(
        /\s+/g,
        '-'
      );


  const parts =
    cleaned.split('-');


  if (
    parts.length === 3
  ) {

    const day =
      parseInt(
        parts[0],
        10
      );


    const month =
      months[
        String(parts[1])
          .toLowerCase()
      ];


    let year =
      parseInt(
        parts[2],
        10
      );


    if (
      year < 100
    ) {

      year +=
        2000;

    }


    if (
      !isNaN(day) &&
      month !== undefined &&
      !isNaN(year)
    ) {

      return new Date(
        year,
        month,
        day
      );

    }

  }


  return null;

}


function recruitmentAgeDays(row) {

  const apiAge =
    Number(
      row.apiAgeDays
    );


  if (
    !isNaN(apiAge) &&
    row.apiAgeDays !== ''
  ) {

    return apiAge;

  }


  const d =
    parseRecruitmentDate(
      row.reqDate
    );


  if (!d) {
    return null;
  }


  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  d.setHours(
    0,
    0,
    0,
    0
  );


  return Math.max(

    0,

    Math.floor(
      (
        today -
        d
      )
      /
      86400000
    )

  );

}


function recruitmentAgeBucket(days) {

  if (
    days === null ||
    days === undefined
  ) {

    return 'unknown';

  }


  if (
    days <= 7
  ) {
    return '0-7';
  }


  if (
    days <= 15
  ) {
    return '8-15';
  }


  if (
    days <= 30
  ) {
    return '16-30';
  }


  return '30+';

}


/* =========================================================
   STATUS RULES
========================================================= */

function recruitmentNormalizedStatus(row) {

  return String(
    row.status || ''
  )
    .toLowerCase()
    .trim();

}


function isRecruitmentClosed(row) {

  return [

    'joined',

    'close',

    'closed'

  ].includes(
    recruitmentNormalizedStatus(row)
  );

}


function isRecruitmentHold(row) {

  return (
    recruitmentNormalizedStatus(row)
    ===
    'hold'
  );

}


function isRecruitmentActive(row) {

  return (

    row.reqNo

    &&

    !isRecruitmentClosed(row)

    &&

    !isRecruitmentHold(row)

  );

}


function isRecruitmentOfferStage(row) {

  return [

    'shortlisted',

    'offered',

    'offer accepted'

  ].includes(
    recruitmentNormalizedStatus(row)
  );

}


function numericRecruitmentValue(value) {

  const n =
    parseFloat(

      String(
        value || ''
      )

      .replace(
        /[^0-9.-]/g,
        ''
      )

    );


  return isNaN(n)
    ? 0
    : n;

}


/* =========================================================
   JSONP LIVE LOADER
   NO FETCH()
========================================================= */

function loadRecruitmentLive(
  forceRefresh = false
) {

  const statusEl =
    getEl(
      'recruitmentStatus'
    );


  if (!statusEl) {
    return;
  }


  statusEl.className =
    'recruitment-status';


  statusEl.textContent =
    'Loading live recruitment data...';


  const previous =
    getEl(
      'recruitmentJsonpScript'
    );


  if (previous) {

    previous.remove();

  }


  const callbackName =
    'euronicsRecruitmentCallback_' +
    Date.now();


  let completed =
    false;


  const cleanup =
    function() {

      const script =
        getEl(
          'recruitmentJsonpScript'
        );


      if (script) {

        script.remove();

      }


      try {

        delete window[
          callbackName
        ];

      }

      catch (e) {

        window[
          callbackName
        ] = undefined;

      }

    };


  const timeout =
    setTimeout(

      function() {

        if (completed) {
          return;
        }


        completed =
          true;


        cleanup();


        statusEl.className =
          'recruitment-status error';


        statusEl.textContent =
          'Recruitment API timed out. Click Refresh Live Data.';

      },

      20000

    );


  window[
    callbackName
  ] =
    function(result) {

      if (completed) {
        return;
      }


      completed =
        true;


      clearTimeout(
        timeout
      );


      try {

        console.log(
          'Recruitment API response:',
          result
        );


        if (!result) {

          throw new Error(
            'Empty response received from Recruitment API.'
          );

        }


        if (
          result.success === false
        ) {

          throw new Error(
            result.error ||
            'Recruitment API returned an error.'
          );

        }


        let rows = [];


        if (
          Array.isArray(result)
        ) {

          rows =
            result;

        }


        else if (
          Array.isArray(
            result.data
          )
        ) {

          rows =
            result.data;

        }


        else if (
          Array.isArray(
            result.rows
          )
        ) {

          rows =
            result.rows;

        }


        else if (
          Array.isArray(
            result.requisitions
          )
        ) {

          rows =
            result.requisitions;

        }


        else {

          throw new Error(
            'No recruitment data array found in API response.'
          );

        }


        recruitmentRawRows =
          rows.filter(
            row =>
              row &&
              typeof row ===
              'object'
          );


        recruitmentHeaders =

          Array.isArray(
            result.headers
          )

          &&

          result.headers.length

          ?

          result.headers

          :

          (
            recruitmentRawRows.length

            ?

            Object.keys(
              recruitmentRawRows[0]
            )

            :

            []
          );


        recruitmentData =
          recruitmentRawRows

            .map(
              normalizeRecruitmentRow
            )

            .filter(
              row => !!row.reqNo
            );


        console.log(
          'Recruitment rows loaded:',
          recruitmentData.length
        );


        statusEl.className =
          'recruitment-status success';


        statusEl.textContent =
          'Live connected · ' +
          recruitmentData.length +
          ' requisitions · Updated ' +
          new Date()
            .toLocaleString();


        initialiseRecruitmentFilters();


        renderRecruitmentDashboard();

      }


      catch (error) {

        console.error(
          'Recruitment processing error:',
          error
        );


        statusEl.className =
          'recruitment-status error';


        statusEl.textContent =
          'Recruitment data error: ' +
          error.message;

      }


      finally {

        cleanup();

      }

    };


  const script =
    document.createElement(
      'script'
    );


  script.id =
    'recruitmentJsonpScript';


  script.async =
    true;


  script.src =

    RECRUITMENT_API_URL

    +

    '?api=recruitment'

    +

    '&callback='

    +

    encodeURIComponent(
      callbackName
    )

    +

    '&_='

    +

    Date.now();


  console.log(
    'Recruitment JSONP URL:',
    script.src
  );


  script.onerror =
    function() {

      if (completed) {
        return;
      }


      completed =
        true;


      clearTimeout(
        timeout
      );


      cleanup();


      statusEl.className =
        'recruitment-status error';


      statusEl.textContent =
        'Recruitment JSONP API could not load.';

    };


  document.body
    .appendChild(
      script
    );

}


/* =========================================================
   RECRUITMENT FILTER DROPDOWNS
========================================================= */

function setRecruitmentSelect(
  id,
  values,
  allLabel
) {

  const el =
    getEl(id);


  if (!el) {
    return;
  }


  const current =
    el.value;


  el.innerHTML =

    `<option value="all">
      ${allLabel}
    </option>`

    +

    values
      .map(v => `

        <option
          value="${recruitmentEscapeHtml(v)}"
        >
          ${recruitmentEscapeHtml(v)}
        </option>

      `)
      .join('');


  if (
    values.includes(current)
  ) {

    el.value =
      current;

  }

}


function initialiseRecruitmentFilters() {

  const statuses =
    [
      ...new Set(
        recruitmentData
          .map(r => r.status)
          .filter(Boolean)
      )
    ]
    .sort();


  const recruiters =
    [
      ...new Set(
        recruitmentData
          .map(r => r.recruiter)
          .filter(Boolean)
      )
    ]
    .sort();


  const departments =
    [
      ...new Set(
        recruitmentData
          .map(r => r.department)
          .filter(Boolean)
      )
    ]
    .sort();


  const types =
    [
      ...new Set(
        recruitmentData
          .map(r => r.reqType)
          .filter(Boolean)
      )
    ]
    .sort();


  setRecruitmentSelect(
    'recruitmentStatusFilter',
    statuses,
    'All Status'
  );


  setRecruitmentSelect(
    'recruitmentRecruiterFilter',
    recruiters,
    'All Recruiters'
  );


  setRecruitmentSelect(
    'recruitmentDepartmentFilter',
    departments,
    'All Departments'
  );


  setRecruitmentSelect(
    'recruitmentTypeFilter',
    types,
    'All Requirement Types'
  );

}


/* =========================================================
   RECRUITMENT AGE FILTER
========================================================= */

function setRecruitmentAgeFilter(bucket) {

  recruitmentAgeFilter =

    recruitmentAgeFilter === bucket

    ?

    'all'

    :

    bucket;


  [
    'ageCard0_7',
    'ageCard8_15',
    'ageCard16_30',
    'ageCard30Plus'
  ]
  .forEach(id => {

    getEl(id)
      ?.classList
      .remove('selected');

  });


  const map = {

    '0-7':
      'ageCard0_7',

    '8-15':
      'ageCard8_15',

    '16-30':
      'ageCard16_30',

    '30+':
      'ageCard30Plus'

  };


  if (
    recruitmentAgeFilter !==
    'all'
  ) {

    getEl(
      map[
        recruitmentAgeFilter
      ]
    )
      ?.classList
      .add('selected');

  }


  renderRecruitmentTable();

}


/* =========================================================
   RESET RECRUITMENT FILTERS
========================================================= */

function clearRecruitmentFilters() {

  recruitmentAgeFilter =
    'all';


  [
    'ageCard0_7',
    'ageCard8_15',
    'ageCard16_30',
    'ageCard30Plus'
  ]
  .forEach(id => {

    getEl(id)
      ?.classList
      .remove('selected');

  });


  const search =
    getEl(
      'recruitmentSearch'
    );


  if (search) {
    search.value = '';
  }


  [
    'recruitmentStatusFilter',
    'recruitmentRecruiterFilter',
    'recruitmentDepartmentFilter',
    'recruitmentPriorityFilter',
    'recruitmentTypeFilter'
  ]
  .forEach(id => {

    const el =
      getEl(id);


    if (el) {
      el.value = 'all';
    }

  });


  renderRecruitmentTable();

}


/* =========================================================
   RECRUITMENT KPIS
========================================================= */

function renderRecruitmentKpis() {

  const active =
    recruitmentData
      .filter(
        isRecruitmentActive
      );


  const joined =
    recruitmentData
      .filter(
        r =>
          recruitmentNormalizedStatus(r)
          ===
          'joined'
      );


  const offerStage =
    recruitmentData
      .filter(
        isRecruitmentOfferStage
      );


  const hold =
    recruitmentData
      .filter(
        isRecruitmentHold
      );


  const critical =
    active.filter(r => {

      const age =
        recruitmentAgeDays(r);


      return (
        age !== null &&
        age > 30
      );

    });


  const openHeadcount =
    active.reduce(
      (sum, r) => {

        const hc =
          numericRecruitmentValue(
            r.headCount
          );


        return sum +
          (
            hc > 0
              ? hc
              : 1
          );

      },
      0
    );


  setHTML(

    'recruitmentLiveKpis',

    [

      kpi(
        'Active Requirements',
        active.length,
        'Excludes Hold / Joined / Close'
      ),

      kpi(
        'Open Headcount',
        openHeadcount,
        'Required positions'
      ),

      kpi(
        'Offer Stage',
        offerStage.length,
        'Shortlisted / Offered / Accepted'
      ),

      kpi(
        'Joined',
        joined.length,
        'Recorded in live tracker'
      ),

      kpi(
        'On Hold',
        hold.length,
        'Tracked separately',
        'warn'
      ),

      kpi(
        '30+ Day Critical',
        critical.length,
        'Immediate attention',
        'warn'
      )

    ].join('')

  );

}


/* =========================================================
   AGEING CARDS
========================================================= */

function renderRecruitmentAgeing() {

  const active =
    recruitmentData
      .filter(
        isRecruitmentActive
      );


  const counts = {

    '0-7': 0,

    '8-15': 0,

    '16-30': 0,

    '30+': 0

  };


  active.forEach(r => {

    const bucket =
      recruitmentAgeBucket(
        recruitmentAgeDays(r)
      );


    if (
      counts[bucket] !==
      undefined
    ) {

      counts[bucket]++;

    }

  });


  setText(
    'age7Count',
    counts['0-7']
  );


  setText(
    'age15Count',
    counts['8-15']
  );


  setText(
    'age30Count',
    counts['16-30']
  );


  setText(
    'age30PlusCount',
    counts['30+']
  );

}


/* =========================================================
   RECRUITMENT CHART HELPERS
========================================================= */

function countByRecruitmentField(
  rows,
  field
) {

  const map = {};


  rows.forEach(r => {

    const key =
      String(
        r[field] ||
        'Not Specified'
      )
      .trim()

      ||

      'Not Specified';


    map[key] =
      (
        map[key] ||
        0
      )
      + 1;

  });


  return map;

}


function buildRecruitmentChart(
  id,
  type,
  labels,
  data
) {

  const canvas =
    getEl(id);


  if (
    !canvas ||
    typeof Chart ===
    'undefined'
  ) {

    return;

  }


  if (
    recruitmentCharts[id]
  ) {

    recruitmentCharts[id]
      .destroy();

  }


  const palette = [

    '#0f5f6d',

    '#147b8d',

    '#3d6e99',

    '#6a55b7',

    '#16835b',

    '#b8750a',

    '#c52d4c',

    '#8aa4aa',

    '#4c7b85',

    '#86b0b8'

  ];


  recruitmentCharts[id] =
    new Chart(

      canvas,

      {

        type,


        data: {

          labels,


          datasets: [

            {

              data,

              borderWidth:
                1,


              backgroundColor:

                type ===
                'doughnut'

                ?

                labels.map(
                  (_, index) =>
                    palette[
                      index %
                      palette.length
                    ]
                )

                :

                '#147b8d'

            }

          ]

        },


        options: {

          responsive:
            true,


          maintainAspectRatio:
            false,


          plugins: {

            legend: {

              display:
                type ===
                'doughnut',

              position:
                'bottom'

            }

          },


          scales:

            type ===
            'doughnut'

            ?

            {}

            :

            {

              x: {

                grid: {
                  display: false
                }

              },


              y: {

                beginAtZero:
                  true,

                ticks: {
                  precision: 0
                }

              }

            }

        }

      }

    );

}


/* =========================================================
   RECRUITMENT CHARTS
========================================================= */

function renderRecruitmentCharts() {

  const active =
    recruitmentData
      .filter(
        isRecruitmentActive
      );


  const statusMap =
    countByRecruitmentField(
      recruitmentData,
      'status'
    );


  buildRecruitmentChart(

    'recruitmentStatusChart',

    'doughnut',

    Object.keys(statusMap),

    Object.values(statusMap)

  );


  const sourceEntries =
    Object.entries(

      countByRecruitmentField(
        recruitmentData,
        'posted'
      )

    )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(
      0,
      10
    );


  buildRecruitmentChart(

    'recruitmentSourceChart',

    'bar',

    sourceEntries.map(
      x => x[0]
    ),

    sourceEntries.map(
      x => x[1]
    )

  );


  const recruiterEntries =
    Object.entries(

      countByRecruitmentField(
        active,
        'recruiter'
      )

    )
    .sort(
      (a, b) =>
        b[1] - a[1]
    );


  buildRecruitmentChart(

    'recruiterWorkloadChart',

    'bar',

    recruiterEntries.map(
      x => x[0]
    ),

    recruiterEntries.map(
      x => x[1]
    )

  );


  const departmentEntries =
    Object.entries(

      countByRecruitmentField(
        active,
        'department'
      )

    )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )
    .slice(
      0,
      12
    );


  buildRecruitmentChart(

    'recruitmentDepartmentChart',

    'bar',

    departmentEntries.map(
      x => x[0]
    ),

    departmentEntries.map(
      x => x[1]
    )

  );


  const priorityMap =
    countByRecruitmentField(
      active,
      'priority'
    );


  buildRecruitmentChart(

    'recruitmentPriorityChart',

    'bar',

    Object.keys(priorityMap),

    Object.values(priorityMap)

  );


  const typeMap =
    countByRecruitmentField(
      recruitmentData,
      'reqType'
    );


  buildRecruitmentChart(

    'recruitmentTypeChart',

    'doughnut',

    Object.keys(typeMap),

    Object.values(typeMap)

  );

}


/* =========================================================
   RECRUITMENT FUNNEL
========================================================= */

function renderRecruitmentFunnel() {

  const calls =
    recruitmentData.reduce(
      (
        sum,
        row
      ) =>
        sum +
        numericRecruitmentValue(
          row.calls
        ),
      0
    );


  const screened =
    recruitmentData.reduce(
      (
        sum,
        row
      ) =>
        sum +
        numericRecruitmentValue(
          row.screened
        ),
      0
    );


  const nextRound =
    recruitmentData.reduce(
      (
        sum,
        row
      ) =>
        sum +
        numericRecruitmentValue(
          row.nextRound
        ),
      0
    );


  const offerStage =
    recruitmentData
      .filter(
        isRecruitmentOfferStage
      )
      .length;


  const joined =
    recruitmentData
      .filter(
        r =>
          recruitmentNormalizedStatus(r)
          ===
          'joined'
      )
      .length;


  const stages = [

    [
      'Calls',
      calls
    ],

    [
      'Screened',
      screened
    ],

    [
      'Next Round',
      nextRound
    ],

    [
      'Offer Stage',
      offerStage
    ],

    [
      'Joined',
      joined
    ]

  ];


  setHTML(

    'recruitmentFunnel',

    stages.map(stage => `

      <div class="funnel-box">

        <div class="funnel-number">
          ${stage[1]}
        </div>

        <div class="funnel-label">
          ${stage[0]}
        </div>

      </div>

    `).join('')

  );

}


/* =========================================================
   CRITICAL ROLES
========================================================= */

function renderCriticalRecruitmentRoles() {

  const rows =
    recruitmentData

      .filter(
        isRecruitmentActive
      )

      .map(r => ({

        ...r,

        age:
          recruitmentAgeDays(r)

      }))

      .filter(
        r =>
          r.age !== null &&
          r.age > 30
      )

      .sort(
        (a, b) =>
          b.age - a.age
      )

      .slice(
        0,
        15
      );


  const el =
    getEl(
      'criticalRecruitmentRoles'
    );


  if (!el) {
    return;
  }


  if (!rows.length) {

    el.innerHTML =
      `
      <div class="empty-state">
        No 30+ day active requisitions.
      </div>
      `;

    return;

  }


  el.innerHTML =
    rows.map(r => `

      <div class="recruitment-list-row">

        <div>

          <div class="recruitment-role-name">

            ${
              recruitmentEscapeHtml(
                r.jobTitle ||
                r.reqNo
              )
            }

          </div>

          <div class="recruitment-role-meta">

            ${
              recruitmentEscapeHtml(
                r.department
              )
            }

            ·

            ${
              recruitmentEscapeHtml(
                r.location
              )
            }

            ·

            ${
              recruitmentEscapeHtml(
                r.recruiter
              )
            }

            ·

            ${
              recruitmentEscapeHtml(
                r.priority
              )
            }

          </div>

        </div>

        <span
          class="age-badge critical"
        >

          ${r.age} days

        </span>

      </div>

    `).join('');

}


/* =========================================================
   UPCOMING DOJ
========================================================= */

function renderUpcomingDoj() {

  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  const rows =
    recruitmentData

      .map(r => ({

        ...r,

        dojDate:
          parseRecruitmentDate(
            r.candidateDoj
          )

      }))

      .filter(
        r =>
          r.dojDate &&
          r.dojDate >= today
      )

      .sort(
        (a, b) =>
          a.dojDate -
          b.dojDate
      )

      .slice(
        0,
        15
      );


  const el =
    getEl(
      'upcomingDojList'
    );


  if (!el) {
    return;
  }


  if (!rows.length) {

    el.innerHTML =
      `
      <div class="empty-state">
        No future DOJ found.
      </div>
      `;

    return;

  }


  el.innerHTML =
    rows.map(r => `

      <div class="recruitment-list-row">

        <div>

          <div class="recruitment-role-name">

            ${
              recruitmentEscapeHtml(
                r.candidateName ||
                r.jobTitle
              )
            }

          </div>

          <div class="recruitment-role-meta">

            ${
              recruitmentEscapeHtml(
                r.jobTitle
              )
            }

            ·

            ${
              recruitmentEscapeHtml(
                r.department
              )
            }

          </div>

        </div>

        <span
          class="age-badge fresh"
        >

          ${
            recruitmentEscapeHtml(
              r.candidateDoj
            )
          }

        </span>

      </div>

    `).join('');

}


/* =========================================================
   RECRUITER PERFORMANCE
========================================================= */

function renderRecruiterPerformance() {

  const recruiters =
    [
      ...new Set(
        recruitmentData
          .map(r => r.recruiter)
          .filter(Boolean)
      )
    ]
    .sort();


  const rows =
    recruiters.map(name => {

      const all =
        recruitmentData
          .filter(
            r =>
              r.recruiter === name
          );


      const active =
        all.filter(
          isRecruitmentActive
        );


      const offer =
        all.filter(
          isRecruitmentOfferStage
        );


      const joined =
        all.filter(
          r =>
            recruitmentNormalizedStatus(r)
            ===
            'joined'
        );


      const critical =
        active.filter(r => {

          const age =
            recruitmentAgeDays(r);


          return (
            age !== null &&
            age > 30
          );

        });


      const ages =
        active
          .map(
            recruitmentAgeDays
          )
          .filter(
            age =>
              age !== null
          );


      const avg =
        ages.length

          ?

          Math.round(

            ages.reduce(
              (
                a,
                b
              ) =>
                a + b,
              0
            )

            /

            ages.length

          )

          :

          0;


      return {

        name,

        active:
          active.length,

        offer:
          offer.length,

        joined:
          joined.length,

        critical:
          critical.length,

        avg

      };

    })
    .sort(
      (a, b) =>
        b.active -
        a.active
    );


  setHTML(

    'recruiterPerformanceBody',

    rows.map(r => `

      <tr>

        <td>
          <strong>
            ${
              recruitmentEscapeHtml(
                r.name
              )
            }
          </strong>
        </td>

        <td>
          ${r.active}
        </td>

        <td>
          ${r.offer}
        </td>

        <td>
          ${r.joined}
        </td>

        <td>
          ${r.critical}
        </td>

        <td>
          ${r.avg} days
        </td>

      </tr>

    `).join('')

  );

}


/* =========================================================
   TABLE FILTERING
========================================================= */

function filteredRecruitmentRows() {

  const search =
    getEl(
      'recruitmentSearch'
    )
      ?.value
      .toLowerCase()

    ||

    '';


  const status =
    getEl(
      'recruitmentStatusFilter'
    )
      ?.value

    ||

    'all';


  const recruiter =
    getEl(
      'recruitmentRecruiterFilter'
    )
      ?.value

    ||

    'all';


  const department =
    getEl(
      'recruitmentDepartmentFilter'
    )
      ?.value

    ||

    'all';


  const priority =
    getEl(
      'recruitmentPriorityFilter'
    )
      ?.value

    ||

    'all';


  const type =
    getEl(
      'recruitmentTypeFilter'
    )
      ?.value

    ||

    'all';


  return recruitmentData
    .filter(r => {

      const age =
        recruitmentAgeDays(r);


      const bucket =
        recruitmentAgeBucket(
          age
        );


      const haystack =
        [

          r.reqNo,

          r.jobTitle,

          r.department,

          r.location,

          r.recruiter,

          r.hiringManager,

          r.status,

          r.candidateName,

          r.remarks,

          r.posted,

          r.reqType

        ]
        .join(' ')
        .toLowerCase();


      return (

        (
          !search ||
          haystack.includes(search)
        )

        &&

        (
          status === 'all' ||
          r.status === status
        )

        &&

        (
          recruiter === 'all' ||
          r.recruiter === recruiter
        )

        &&

        (
          department === 'all' ||
          r.department === department
        )

        &&

        (
          priority === 'all' ||
          r.priority === priority
        )

        &&

        (
          type === 'all' ||
          r.reqType === type
        )

        &&

        (
          recruitmentAgeFilter ===
          'all'

          ||

          (
            isRecruitmentActive(r)

            &&

            bucket ===
            recruitmentAgeFilter
          )
        )

      );

    });

}


/* =========================================================
   AGE BADGE CLASS
========================================================= */

function recruitmentAgeClass(days) {

  const bucket =
    recruitmentAgeBucket(
      days
    );


  if (
    bucket === '0-7'
  ) {
    return 'fresh';
  }


  if (
    bucket === '8-15'
  ) {
    return 'watch';
  }


  if (
    bucket === '16-30'
  ) {
    return 'ageing';
  }


  return 'critical';

}


/* =========================================================
   LIVE REQUISITION TABLE
========================================================= */

function renderRecruitmentTable() {

  const rows =
    filteredRecruitmentRows()

      .sort(
        (a, b) => {

          const da =
            parseRecruitmentDate(
              a.reqDate
            );


          const db =
            parseRecruitmentDate(
              b.reqDate
            );


          return (

            (
              db?.getTime() ||
              0
            )

            -

            (
              da?.getTime() ||
              0
            )

          );

        }
      );


  setText(
    'recruitmentVisibleCount',
    rows.length
  );


  const head =
    getEl(
      'recruitmentLiveTableHead'
    );


  const body =
    getEl(
      'recruitmentLiveTableBody'
    );


  if (
    !head ||
    !body
  ) {
    return;
  }


  const headers = [

    'Age (Days)',

    ...recruitmentHeaders

  ];


  head.innerHTML =
    `

    <tr>

      ${
        headers.map(h => `

          <th>

            ${
              recruitmentEscapeHtml(

                String(h)
                  .replace(
                    /\n/g,
                    ' '
                  )

              )
            }

          </th>

        `)
        .join('')
      }

    </tr>

    `;


  body.innerHTML =
    rows.map(r => {

      const age =
        recruitmentAgeDays(r);


      const raw =
        r.raw || {};


      const cells =
        recruitmentHeaders
          .map(header => {

            let value =
              raw[header];


            if (
              value === undefined ||
              value === null ||
              value === ''
            ) {

              value = '-';

            }


            const wrap =
              [

                'jobTitle',

                'Job Title',

                'remarks',

                'Remarks',

                'candidatePool',

                'Candidate pool',

                'Candidate pool ',

                'jdLink',

                'JD Link',

                'JD Link ',

                'budget',

                'experience'

              ]
              .includes(header)

              ?

              'wrap'

              :

              '';


            return `

              <td
                class="${wrap}"
              >

                ${
                  recruitmentEscapeHtml(
                    value
                  )
                }

              </td>

            `;

          })
          .join('');


      return `

        <tr>

          <td>

            <span
              class="age-badge
              ${recruitmentAgeClass(age)}"
            >

              ${
                age === null

                ?

                '-'

                :

                age + 'd'
              }

            </span>

          </td>

          ${cells}

        </tr>

      `;

    })
    .join('');

}


/* =========================================================
   RECRUITMENT FILTER EVENTS
========================================================= */

[
  'recruitmentSearch',
  'recruitmentStatusFilter',
  'recruitmentRecruiterFilter',
  'recruitmentDepartmentFilter',
  'recruitmentPriorityFilter',
  'recruitmentTypeFilter'
]
.forEach(id => {

  const el =
    getEl(id);


  if (!el) {
    return;
  }


  el.addEventListener(

    id ===
    'recruitmentSearch'

    ?

    'input'

    :

    'change',

    renderRecruitmentTable

  );

});


/* =========================================================
   RENDER RECRUITMENT
========================================================= */

function renderRecruitmentDashboard() {

  renderRecruitmentKpis();

  renderRecruitmentAgeing();

  renderRecruitmentCharts();

  renderRecruitmentFunnel();

  renderCriticalRecruitmentRoles();

  renderUpcomingDoj();

  renderRecruiterPerformance();

  renderRecruitmentTable();

}


/* =========================================================
   START LIVE RECRUITMENT
========================================================= */

loadRecruitmentLive(false);


/* =========================================================
   ATTENDANCE
========================================================= */

if (
  getEl(
    'attendanceKpis'
  )
) {

  setHTML(

    'attendanceKpis',

    [

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

    ].join('')

  );

}


if (
  typeof makeLineChart ===
  'function'
) {

  makeLineChart(

    'attendanceChart',

    [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
    ],

    [
      93.0,
      93.1,
      93.2,
      93.4,
      93.6
    ],

    'Attendance %'

  );

}


if (
  getEl(
    'attendanceIssues'
  )
) {

  setHTML(

    'attendanceIssues',

    [

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

    ]
    .map(i => `

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
          status-${
            i[2] === 'red'
              ? 'red'
              : 'yellow'
          }"
        >

          ${
            i[2] === 'red'
              ? 'Critical'
              : 'Watch'
          }

        </span>

      </div>

    `)
    .join('')

  );

}


/* =========================================================
   PERFORMANCE
========================================================= */

if (
  getEl(
    'performanceKpis'
  )
) {

  setHTML(

    'performanceKpis',

    [

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

    ].join('')

  );

}


if (
  typeof HR_DATA !==
  'undefined'

  &&

  HR_DATA.employees

  &&

  getEl(
    'performanceMatrix'
  )
) {

  setHTML(

    'performanceMatrix',

    `

      <div
        class="matrix-row
        matrix-head"
      >

        <div>
          Employee
        </div>

        <div>
          Attendance
        </div>

        <div>
          KRA
        </div>

        <div>
          Status
        </div>

        <div>
          Manager
        </div>

      </div>


      ${
        HR_DATA.employees
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
                  status-${
                    String(
                      e.status
                    ).toLowerCase()
                  }"
                >
                  ${e.status}
                </span>

              </div>

              <div>
                ${e.manager}
              </div>

            </div>

          `)
          .join('')
      }

    `

  );

}


/* =========================================================
   PAYROLL
========================================================= */

if (
  getEl(
    'payrollKpis'
  )
) {

  setHTML(

    'payrollKpis',

    [

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

    ].join('')

  );

}


if (
  typeof makeLineChart ===
  'function'
) {

  makeLineChart(

    'payrollChart',

    [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
    ],

    [
      1.34,
      1.36,
      1.39,
      1.42,
      1.44
    ],

    'Payroll ₹Cr'

  );

}


/* =========================================================
   L&D
========================================================= */

if (
  getEl(
    'learningKpis'
  )
) {

  setHTML(

    'learningKpis',

    [

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

    ].join('')

  );

}


if (
  getEl(
    'learningTable'
  )
) {

  setHTML(

    'learningTable',

    [

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

    ]
    .map(r => `

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

    `)
    .join('')

  );

}


/* =========================================================
   ENGAGEMENT
========================================================= */

if (
  getEl(
    'engagementKpis'
  )
) {

  setHTML(

    'engagementKpis',

    [

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

    ].join('')

  );

}


if (
  typeof makeLineChart ===
  'function'
) {

  makeLineChart(

    'engagementChart',

    [
      'Q3 FY25',
      'Q4 FY25',
      'Q1 FY26',
      'Q2 FY26'
    ],

    [
      21,
      26,
      28,
      32
    ],

    'eNPS'

  );

}


/* =========================================================
   COMPLIANCE
========================================================= */

if (
  getEl(
    'complianceKpis'
  )
) {

  setHTML(

    'complianceKpis',

    [

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

    ].join('')

  );

}


if (
  getEl(
    'complianceList'
  )
) {

  setHTML(

    'complianceList',

    [

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

    ]
    .map(r => `

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
          status-${
            r[2].toLowerCase()
          }"
        >
          ${r[2]}
        </span>

      </div>

    `)
    .join('')

  );

}


/* =========================================================
   ALERT CENTRE
========================================================= */

if (
  typeof HR_DATA !==
  'undefined'

  &&

  HR_DATA.alerts

  &&

  getEl(
    'alertTableBody'
  )
) {

  setHTML(

    'alertTableBody',

    HR_DATA.alerts
      .map(a => `

        <tr>

          <td>

            <span
              class="priority-pill
              priority-${
                String(
                  a.priority
                )
                .toLowerCase()
              }"
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
              status-${
                String(
                  a.status
                )
                .toLowerCase()
                .replaceAll(
                  ' ',
                  ''
                )
              }"
            >
              ${a.status}
            </span>

          </td>

          <td>

            <button
              class="view-btn"
            >
              Open
            </button>

          </td>

        </tr>

      `)
      .join('')

  );

}


/* =========================================================
   END
========================================================= */
