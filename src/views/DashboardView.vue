<template>
  <div>
    <NavBar />

    <div class="flex gap-8 m-2">
      <CardEmployees />
      <ChartView />
      <DonutChart />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import CardEmployees from "@/components/CardEmployees.vue";
import ChartView from "@/components/ChartView.vue";
import DonutChart from "@/components/DonutChart.vue";
export default {
  components: {
    NavBar,
    CardEmployees,
    ChartView,
    DonutChart,
  },
};
</script>

<style>
.container {
  margin: 50px;
}

.dashboard-user {
  background-color: white;
  max-width: 450px;
  height: 250px;
  border-radius: 20px;
}
.dashboard-user h3 {
  color: #757575;
}
</style>
