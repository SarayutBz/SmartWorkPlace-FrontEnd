<template>
  <v-col class="px-3 flex-grow-1">
    <v-container fluid>
      <v-col cols="12">
        <CheckinChart />
      </v-col>
      <SummaryCards
        :employeeCount="employeeCount"
        :branchCount="branchCount"
        :seatCount="seatCount"
      />
    </v-container>
  </v-col>
</template>

<script>
import CheckinChart from "@/components/dashboard/CheckinChart.vue";
import SummaryCards from "@/components/dashboard/SummaryCard.vue";

export default {
  name: "DashboardContent",
  components: { CheckinChart, SummaryCards },
  props: {
    employeeCount: Number,
    branchCount: Number,
    seatCount: Number,
  },
};
</script>
