/* =========================================================
   EURONICS HR COMMAND CENTRE
   CHART HELPERS
========================================================= */

const CHARTS = {};


/* =========================================================
   LINE CHART
========================================================= */

function makeLineChart(
  id,
  labels,
  data,
  label
) {

  const el =
    document.getElementById(id);

  if (!el) {
    return;
  }


  if (
    typeof Chart === 'undefined'
  ) {

    console.error(
      'Chart.js is not loaded.'
    );

    return;

  }


  if (CHARTS[id]) {
    CHARTS[id].destroy();
  }


  CHARTS[id] =
    new Chart(
      el,
      {

        type: 'line',

        data: {

          labels: labels,

          datasets: [

            {

              label: label,

              data: data,

              borderColor:
                '#147b8d',

              backgroundColor:
                'rgba(20,123,141,.10)',

              fill: true,

              tension: 0.35,

              pointRadius: 3,

              pointHoverRadius: 5,

              borderWidth: 2.4

            }

          ]

        },


        options: {

          responsive: true,

          maintainAspectRatio:
            false,


          interaction: {

            intersect: false,

            mode: 'index'

          },


          plugins: {

            legend: {
              display: false
            },

            tooltip: {

              backgroundColor:
                '#15333a',

              padding: 10,

              cornerRadius: 8

            }

          },


          scales: {

            x: {

              grid: {
                display: false
              },

              ticks: {
                color: '#74878d'
              }

            },


            y: {

              beginAtZero: false,

              grid: {
                color:
                  'rgba(15,68,78,.07)'
              },

              ticks: {
                color: '#74878d'
              }

            }

          }

        }

      }
    );

}


/* =========================================================
   BAR CHART
========================================================= */

function makeBarChart(
  id,
  labels,
  data,
  label
) {

  const el =
    document.getElementById(id);

  if (
    !el ||
    typeof Chart === 'undefined'
  ) {
    return;
  }


  if (CHARTS[id]) {
    CHARTS[id].destroy();
  }


  CHARTS[id] =
    new Chart(
      el,
      {

        type: 'bar',

        data: {

          labels: labels,

          datasets: [

            {

              label: label,

              data: data,

              backgroundColor:
                '#147b8d',

              borderRadius: 6,

              maxBarThickness: 34

            }

          ]

        },


        options: {

          responsive: true,

          maintainAspectRatio:
            false,


          plugins: {

            legend: {
              display: false
            }

          },


          scales: {

            x: {

              grid: {
                display: false
              }

            },


            y: {

              beginAtZero: true,

              grid: {
                color:
                  'rgba(15,68,78,.07)'
              }

            }

          }

        }

      }
    );

}
