const CHARTS = {};

function makeLineChart(id, labels, data, label) {
  const el = document.getElementById(id);

  if (!el) return;

  if (CHARTS[id]) {
    CHARTS[id].destroy();
  }

  CHARTS[id] = new Chart(el, {
    type: 'line',

    data: {
      labels: labels,

      datasets: [
        {
          label: label,
          data: data,

          borderColor: '#147b8d',
          backgroundColor: 'rgba(20,123,141,.10)',

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
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          backgroundColor: '#0f5f6d',
          padding: 10,
          titleFont: {
            size: 11,
            weight: '700'
          },
          bodyFont: {
            size: 11
          }
        }
      },

      scales: {
        x: {
          grid: {
            display: false
          },

          ticks: {
            color: '#6f8b92',

            font: {
              size: 10
            }
          }
        },

        y: {
          grid: {
            color: 'rgba(15,95,109,.08)'
          },

          ticks: {
            color: '#6f8b92',

            font: {
              size: 10
            }
          }
        }
      }
    }
  });
}
