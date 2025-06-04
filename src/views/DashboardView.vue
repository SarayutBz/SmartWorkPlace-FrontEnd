<!-- eslint-disable no-undef -->
<template>
  <div class="app">
    <SideBar />
    
    <div class="box-content ">
      <NavBar />
      <div class="box-card m-2">
        <StatsCard :stats="stats" />
      </div>

      <!-- Top Charts Row -->
      <div class="charts-grid m-2">
        <BarChart  />
        <PieChart/>
      </div>

      <!-- Bottom Charts Row -->
      <div class="bottom-charts m-2">
        <HorizontalBarChart/>
        <StackedBarChart/>

      </div>

      <!-- Line Chart Full Width -->
      <div class="full-width-chart m-2">
        <LineChart/>
      </div>

    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import StatsCard from "@/components/Dashboard/StatsCard.vue";
import BarChart from "@/components/Dashboard/BarChart"
import PieChart from "@/components/Dashboard/PieChart.vue";
import HorizontalBarChart from "@/components/Dashboard/HorizontalBarChart.vue";
import StackedBarChart from "@/components/Dashboard/StackedBarChart.vue";
import LineChart from "@/components/Dashboard/LineChart.vue";
export default {
  components: {
    StatsCard,
    SideBar,
    NavBar,
    BarChart,
    PieChart,
    HorizontalBarChart,
    StackedBarChart,
    LineChart
  },
  name: "SmartWorkPlaceDashboard",
  data() {
    return {
      stats: {
        employees: 10,
        desks: 10,
        meetings: 10,
        completed: 10,
      },
      charts: {},
    };
  },

};
</script>

<style>
.app {
  display: flex;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
}
.box-content{
  width:100%;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.bottom-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.full-width-chart {
  grid-column: 1 / -1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.chart-container {
  position: relative;
  height: 250px;
}

.chart-container.small {
  height: 200px;
}

.chart-container.line {
  height: 200px;
}

@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .charts-grid,
  .bottom-charts {
    grid-template-columns: 1fr;
  }
}
</style>
