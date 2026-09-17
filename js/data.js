/* =========================================================
   EURONICS HR COMMAND CENTRE
   BASE DATA
========================================================= */

const HR_DATA = {

  employees: [

    {
      id: 1,
      name: 'Aarav Sharma',
      role: 'Regional Sales Manager',
      department: 'Sales & BD',
      manager: 'Abhilash Pandey',
      location: 'Gurgaon',
      attendance: 96,
      kra: 88,
      status: 'Green',
      joining: '12 Apr 2022',
      tenure: '4.4 Years',
      band: 'M2',
      leave: '14 Days',
      training: '92%',
      recognition: '2 Awards',
      timeline: [
        'Apr 2022 · Joined Euronics',
        'Jul 2025 · Promoted to Regional Sales Manager',
        'Aug 2026 · Completed Sales Leadership Program'
      ]
    },

    {
      id: 2,
      name: 'Neha Verma',
      role: 'HR Business Partner',
      department: 'Human Resources',
      manager: 'Ruchika Jain',
      location: 'Gurgaon',
      attendance: 97,
      kra: 91,
      status: 'Green',
      joining: '18 Jan 2023',
      tenure: '3.7 Years',
      band: 'M1',
      leave: '17 Days',
      training: '96%',
      recognition: '3 Awards',
      timeline: [
        'Jan 2023 · Joined Euronics',
        'Mar 2025 · Promoted to HRBP',
        'Jul 2026 · Completed Leadership Development'
      ]
    },

    {
      id: 3,
      name: 'Rohan Mehta',
      role: 'Production Manager',
      department: 'Production',
      manager: 'Plant Head',
      location: 'Gurgaon',
      attendance: 89,
      kra: 74,
      status: 'Yellow',
      joining: '10 Jun 2021',
      tenure: '5.3 Years',
      band: 'M2',
      leave: '8 Days',
      training: '78%',
      recognition: '1 Award',
      timeline: [
        'Jun 2021 · Joined Euronics',
        'May 2024 · Promoted to Production Manager',
        'Aug 2026 · Performance coaching initiated'
      ]
    },

    {
      id: 4,
      name: 'Priya Nair',
      role: 'Quality Manager',
      department: 'Quality',
      manager: 'Operations Head',
      location: 'Gurgaon',
      attendance: 95,
      kra: 85,
      status: 'Green',
      joining: '05 Feb 2022',
      tenure: '4.6 Years',
      band: 'M1',
      leave: '11 Days',
      training: '89%',
      recognition: '2 Awards',
      timeline: [
        'Feb 2022 · Joined Euronics',
        'Apr 2025 · Promoted to Quality Manager',
        'Jun 2026 · Quality Excellence Award'
      ]
    },

    {
      id: 5,
      name: 'Siddharth Jain',
      role: 'Supply Chain Lead',
      department: 'Supply Chain',
      manager: 'SCM Head',
      location: 'Gurgaon',
      attendance: 94,
      kra: 79,
      status: 'Green',
      joining: '14 Aug 2020',
      tenure: '6.1 Years',
      band: 'M2',
      leave: '9 Days',
      training: '84%',
      recognition: '1 Award',
      timeline: [
        'Aug 2020 · Joined Euronics',
        'Jan 2024 · Promoted to Supply Chain Lead',
        'Jul 2026 · Completed Advanced SCM Program'
      ]
    },

    {
      id: 6,
      name: 'Mohit Kumar',
      role: 'Sales Executive',
      department: 'Sales & BD',
      manager: 'Regional Sales Manager',
      location: 'Delhi',
      attendance: 91,
      kra: 68,
      status: 'Yellow',
      joining: '11 Nov 2024',
      tenure: '1.8 Years',
      band: 'E2',
      leave: '7 Days',
      training: '71%',
      recognition: '0 Awards',
      timeline: [
        'Nov 2024 · Joined Euronics',
        'Apr 2026 · Territory expanded',
        'Aug 2026 · Coaching plan initiated'
      ]
    },

    {
      id: 7,
      name: 'Anjali Singh',
      role: 'Specifier Manager',
      department: 'Sales & BD',
      manager: 'Naman',
      location: 'Mumbai',
      attendance: 97,
      kra: 90,
      status: 'Green',
      joining: '02 Sep 2023',
      tenure: '3 Years',
      band: 'M1',
      leave: '12 Days',
      training: '94%',
      recognition: '4 Awards',
      timeline: [
        'Sep 2023 · Joined Euronics',
        'Dec 2025 · Key Account Recognition',
        'Aug 2026 · Advanced Negotiation Training'
      ]
    },

    {
      id: 8,
      name: 'Karan Patel',
      role: 'Service Manager',
      department: 'Service',
      manager: 'Service Head',
      location: 'Ahmedabad',
      attendance: 94,
      kra: 82,
      status: 'Green',
      joining: '17 Mar 2022',
      tenure: '4.5 Years',
      band: 'M1',
      leave: '10 Days',
      training: '87%',
      recognition: '2 Awards',
      timeline: [
        'Mar 2022 · Joined Euronics',
        'Feb 2025 · Promoted to Service Manager',
        'Aug 2026 · Customer Excellence Training'
      ]
    }

  ],


  alerts: [

    {
      priority: 'High',
      action: 'Close aged recruitment positions',
      owner: 'TA Team',
      due: '20 Sep',
      status: 'Open'
    },

    {
      priority: 'High',
      action: 'Review yellow performance cases',
      owner: 'HRBP',
      due: '18 Sep',
      status: 'In Progress'
    },

    {
      priority: 'Medium',
      action: 'Resolve pending leave approvals',
      owner: 'Managers',
      due: '19 Sep',
      status: 'Open'
    },

    {
      priority: 'Medium',
      action: 'Complete statutory audit documentation',
      owner: 'HR Ops',
      due: '25 Sep',
      status: 'In Progress'
    },

    {
      priority: 'Low',
      action: 'Publish monthly recognition update',
      owner: 'HR',
      due: '30 Sep',
      status: 'Planned'
    }

  ]

};
