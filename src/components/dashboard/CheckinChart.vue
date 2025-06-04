<template>
  <apexchart
    type="donut"
    width="100%"
    :options="chartOptions"
    :series="data"
  />
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "CheckinChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartOptions() {
      return {
        labels: this.labels,
        title: {
          text: "Employees by Department",
          align: "center",
          style: { fontSize: "18px" },
        },
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: { width: 300 },
              legend: { position: "bottom" },
            },
          },
        ],
      };
    },
  },
};
</script>
