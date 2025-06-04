<script>
import SidebarLeft from "@/components/dashboard/SidebarLeft.vue";
import SidebarRightCalendar from "@/components/dashboard/SidebarRightCalendar.vue";
import DashboardContent from "@/components/dashboard/DashboardContent.vue";
import axios from "axios";

export default {
  name: "DashboardView",
  components: { SidebarLeft, SidebarRightCalendar, DashboardContent },
  data() {
    return {
      dashboardData: null,
      error: null,
      loading: true,
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:3000/dashboard");
      this.dashboardData = res.data;

      console.log("✅ Dashboard API:", this.dashboardData);

    } catch (err) {
      this.error = err;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<template>
  <v-app>
    <v-row no-gutters>
      <SidebarLeft />

      <v-col>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error.message }}</div>
        <div v-else>
          <DashboardContent
            :employeeCount="dashboardData.totalEmployees"
            :totalSeats="dashboardData.totalSeats"
            :occupiedSeats="dashboardData.occupiedSeats"
            :availableSeats="dashboardData.availableSeats"
            :labels="dashboardData.labels"
            :chartData="dashboardData.data"
          />
        </div>
      </v-col>

      <SidebarRightCalendar />
    </v-row>
  </v-app>
</template>
