<template>
  <v-app>
    <v-row no-gutters>
      <SidebarLeft />
      <DashboardContent
        :employeeCount="employeeCount"
        :branchCount="branchCount"
        :seatCount="seatCount"
      />
      <SidebarRightCalendar />
    </v-row>
  </v-app>
</template>

<script>
import SidebarLeft from "@/components/dashboard/SidebarLeft.vue";
import SidebarRightCalendar from "@/components/dashboard/SidebarRightCalendar.vue";
import DashboardContent from "@/components/dashboard/DashboardContent.vue";
import employees from "@/assets/mock/mock-data.json";
import branches from "@/assets/mock/branches.json";
import seats from "@/assets/mock/seats.json";

export default {
  name: "DashboardView",
  components: { SidebarLeft, SidebarRightCalendar, DashboardContent },
  data() {
    return {
      employeeCount: employees.length,
      branchCount: branches.length,
      seatCount: seats.length,
    };
  },
};
</script>
