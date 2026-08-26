const HR_DATA = {
  employees: [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Regional Sales Manager',
      department: 'Sales & BD',
      manager: 'Abhilash Pandey',
      location: 'Gurugram',
      attendance: 96.2,
      kra: 84,
      status: 'Green',
      tenure: '3.8 yrs',
      joining: '12 Nov 2022',
      band: 'M3',
      leave: '14 days',
      training: '18 hrs',
      recognition: '2 awards',
      timeline: [
        'Jul 2026 · KRA score 84%',
        'Jun 2026 · Product certification completed',
        'Apr 2026 · Promoted to Regional Sales Manager'
      ]
    },

    {
      id: 2,
      name: 'Amit Verma',
      role: 'Business Development Manager',
      department: 'Sales & BD',
      manager: 'Lalit',
      location: 'Gurugram',
      attendance: 91.4,
      kra: 67,
      status: 'Yellow',
      tenure: '2.2 yrs',
      joining: '04 Jun 2024',
      band: 'M2',
      leave: '9 days',
      training: '11 hrs',
      recognition: '0 awards',
      timeline: [
        'Jul 2026 · Yellow performance card',
        'Jun 2026 · Attendance warning',
        'May 2026 · Coaching plan started'
      ]
    },

    {
      id: 3,
      name: 'Neha Gupta',
      role: 'Finance Manager',
      department: 'Finance',
      manager: 'CFO',
      location: 'Gurugram',
      attendance: 97.8,
      kra: 91,
      status: 'Green',
      tenure: '5.1 yrs',
      joining: '21 Jul 2021',
      band: 'M3',
      leave: '17 days',
      training: '24 hrs',
      recognition: '3 awards',
      timeline: [
        'Jul 2026 · KRA 91%',
        'Jun 2026 · Recognition award',
        'Apr 2026 · Audit lead'
      ]
    },

    {
      id: 4,
      name: 'Rohit Singh',
      role: 'Shift Supervisor',
      department: 'Production',
      manager: 'Plant Head',
      location: 'Gurugram',
      attendance: 84.1,
      kra: 61,
      status: 'PIP',
      tenure: '4.6 yrs',
      joining: '03 Jan 2022',
      band: 'S2',
      leave: '4 days',
      training: '8 hrs',
      recognition: '0 awards',
      timeline: [
        'Jul 2026 · PIP initiated',
        'Jun 2026 · Red performance card',
        'May 2026 · Attendance escalation'
      ]
    },

    {
      id: 5,
      name: 'Priya Nair',
      role: 'Quality Engineer',
      department: 'Quality',
      manager: 'Quality Head',
      location: 'Gurugram',
      attendance: 95.6,
      kra: 88,
      status: 'Green',
      tenure: '2.9 yrs',
      joining: '18 Sep 2023',
      band: 'E2',
      leave: '12 days',
      training: '20 hrs',
      recognition: '1 award',
      timeline: [
        'Jul 2026 · KRA 88%',
        'Jun 2026 · Kaizen recognition',
        'Apr 2026 · Quality audit completed'
      ]
    },

    {
      id: 6,
      name: 'Sahil Mehta',
      role: 'Supply Chain Executive',
      department: 'Supply Chain',
      manager: 'SCM Head',
      location: 'Gurugram',
      attendance: 93.1,
      kra: 73,
      status: 'Yellow',
      tenure: '1.8 yrs',
      joining: '11 Nov 2024',
      band: 'E1',
      leave: '7 days',
      training: '10 hrs',
      recognition: '0 awards',
      timeline: [
        'Jul 2026 · Yellow card',
        'Jun 2026 · Vendor OT issue',
        'Apr 2026 · Training assigned'
      ]
    },

    {
      id: 7,
      name: 'Ananya Iyer',
      role: 'NPD Engineer',
      department: 'Engineering/NPD',
      manager: 'NPD Head',
      location: 'Gurugram',
      attendance: 97.1,
      kra: 89,
      status: 'Green',
      tenure: '3.1 yrs',
      joining: '27 Jul 2023',
      band: 'E2',
      leave: '15 days',
      training: '28 hrs',
      recognition: '2 awards',
      timeline: [
        'Jul 2026 · KRA 89%',
        'May 2026 · Patent filing support',
        'Apr 2026 · Product launch team'
      ]
    },

    {
      id: 8,
      name: 'Karan Malhotra',
      role: 'Sales Manager',
      department: 'Sales & BD',
      manager: 'Vikram',
      location: 'Mumbai',
      attendance: 94.4,
      kra: 78,
      status: 'Green',
      tenure: '3.0 yrs',
      joining: '05 Aug 2023',
      band: 'M2',
      leave: '10 days',
      training: '14 hrs',
      recognition: '1 award',
      timeline: [
        'Jul 2026 · KRA 78%',
        'Jun 2026 · New key account win',
        'Apr 2026 · Territory review'
      ]
    },

    {
      id: 9,
      name: 'Meera Joshi',
      role: 'HR Executive',
      department: 'HR & Admin',
      manager: 'CHRO',
      location: 'Gurugram',
      attendance: 96.5,
      kra: 86,
      status: 'Green',
      tenure: '2.4 yrs',
      joining: '15 Mar 2024',
      band: 'E2',
      leave: '13 days',
      training: '22 hrs',
      recognition: '2 awards',
      timeline: [
        'Jul 2026 · Recruitment SLA met',
        'Jun 2026 · R&R award',
        'Apr 2026 · HRIS project'
      ]
    },

    {
      id: 10,
      name: 'Arjun Rao',
      role: 'Area Sales Manager',
      department: 'Sales & BD',
      manager: 'Kartick',
      location: 'Bengaluru',
      attendance: 92.6,
      kra: 69,
      status: 'Red',
      tenure: '1.9 yrs',
      joining: '09 Oct 2024',
      band: 'M2',
      leave: '8 days',
      training: '9 hrs',
      recognition: '0 awards',
      timeline: [
        'Jul 2026 · Red performance card',
        'Jun 2026 · Yellow performance card',
        'May 2026 · Pipeline correction plan'
      ]
    }
  ],

  alerts: [
    {
      priority: 'Critical',
      action: 'Healthcare Business Head role open 81 days',
      owner: 'Suman · TA',
      due: '29 Aug',
      status: 'Open'
    },
    {
      priority: 'Critical',
      action: '2 Sales PIP cases approaching cycle-end review',
      owner: 'Abhilash',
      due: '31 Aug',
      status: 'In Progress'
    },
    {
      priority: 'High',
      action: 'Plant absenteeism at 11.2% — Mon/Fri pattern',
      owner: 'Plant HR',
      due: '30 Aug',
      status: 'Open'
    },
    {
      priority: 'High',
      action: 'Attendance sync issue bucket not falling',
      owner: 'HRIS',
      due: '02 Sep',
      status: 'In Progress'
    },
    {
      priority: 'Medium',
      action: 'Factories Act audit prep checklist',
      owner: 'Compliance',
      due: '05 Sep',
      status: 'Done'
    }
  ],

  requisitions: [
    {
      role: 'Healthcare Business Head',
      dept: 'Sales',
      owner: 'Suman',
      stage: 'Sourcing',
      days: 81
    },
    {
      role: 'BDM — West',
      dept: 'Sales',
      owner: 'Naman',
      stage: 'Interview',
      days: 58
    },
    {
      role: 'QC Engineer',
      dept: 'Quality',
      owner: 'Rishita',
      stage: 'Interview',
      days: 44
    },
    {
      role: 'PCB Design Engineer',
      dept: 'Engineering',
      owner: 'Nainika',
      stage: 'Offer',
      days: 29
    },
    {
      role: 'HR Executive — Plant',
      dept: 'HR',
      owner: 'Snigdha',
      stage: 'Joined',
      days: 17
    },
    {
      role: 'Area Sales Manager',
      dept: 'Sales',
      owner: 'Suman',
      stage: 'Requisition',
      days: 12
    },
    {
      role: 'Service Engineer',
      dept: 'Service',
      owner: 'Rishita',
      stage: 'Sourcing',
      days: 15
    }
  ]
};
