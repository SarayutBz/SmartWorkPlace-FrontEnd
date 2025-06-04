<template>
  <div class="chart-wrapper">
    <div class="chart-title">เวลาเฉลี่ยเข้า-ออกงาน</div>
    <div class="chart-container line">
      <canvas ref="lineChart"></canvas>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.renderChart();
  },
  beforeDestroy() {
    if (this.chart) this.chart.destroy();
  },

  methods: {
    renderChart() {
      // eslint-disable-next-line no-undef
      this.charts.lineChart = new Chart(this.$refs.lineChart, {
        type: "line",
        data: {
          labels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."],
          datasets: [
            {
              label: "เวลาเข้างาน",
              data: [8.2, 8.1, 8.3, 8.0, 8.2, 8.1],
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "เวลาออกงาน",
              data: [17.5, 17.3, 17.8, 17.2, 17.6, 17.4],
              borderColor: "#8B5CF6",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "เวลา (ชั่วโมง)",
              },
              ticks: {
                callback: function (value) {
                  return value + " น.";
                },
              },
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }
}



</script>