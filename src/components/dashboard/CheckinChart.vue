<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="chart-card" elevation="2">
        <div class="chart-wrapper">
          <apex-charts
            type="bar"
            :options="barChartOptions"
            :series="barChartSeries"
            width="100%"
            height="250"
          />
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card class="chart-card" elevation="2">
        <div class="chart-wrapper">
          <apex-charts
            type="donut"
            :options="donutChartOptions"
            :series="donutChartSeries"
            width="100%"
            height="250"
          />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ApexCharts from "vue-apexcharts";

export default {
  name: "CheckinChart",
  components: { ApexCharts },
  data() {
    return {
      barChartOptions: {
        chart: {
          id: "basic-bar",
          toolbar: { show: true },
        },
        title: {
          text: "Weekly Check-ins",
          align: "center",
          style: { fontSize: "14px" },
        },
        xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
        dataLabels: { enabled: true },
      },
      barChartSeries: [{ name: "Check-ins", data: [10, 15, 12, 20, 18] }],

      donutChartOptions: {
        labels: ["HR", "Marketing", "IT", "Finance"],
        legend: { position: "bottom" },
        chart: { toolbar: { show: false } },
        title: {
          text: "Check-in by Department",
          align: "center",
          style: { fontSize: "14px" },
        },
        dataLabels: { enabled: true },
      },
      donutChartSeries: [25, 30, 20, 25],
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
  },
};
</script>

<style scoped>
.chart-card {
  height: 300px;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
}
</style>
