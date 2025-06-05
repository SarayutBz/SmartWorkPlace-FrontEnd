<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="3">
        <SummaryCard
          title="พนักงานทั้งหมด"
          :value="`${employeeCount} คน`"
          color="green lighten-4"
          @click="goToEmployeeTable"
        />
      </v-col>

      <v-col cols="12" md="3">
        <SummaryCard
          title="ที่นั่งทั้งหมด"
          :value="`${totalSeats} ที่นั่ง`"
          color="blue lighten-4"
          @click="goToSeatList"
        />
      </v-col>

      <v-col cols="12" md="3">
        <SummaryCard
          title="ที่นั่งถูกจอง"
          :value="`${occupiedSeats} ที่นั่ง`"
          color="red lighten-4"
        />
      </v-col>

      <v-col cols="12" md="3">
        <SummaryCard
          title="ที่นั่งว่าง"
          :value="`${availableSeats} ที่นั่ง`"
          color="grey lighten-4"
        />
      </v-col>

      <v-col cols="12" md="6">
        <CheckinChart :labels="labels" :data="chartData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SummaryCard from "@/components/dashboard/SummaryCard.vue";
import CheckinChart from "@/components/dashboard/CheckinChart.vue";

export default {
  name: "DashboardContent",
  components: { SummaryCard, CheckinChart },
  props: {
    employeeCount: Number,
    totalSeats: Number,
    occupiedSeats: Number,
    availableSeats: Number,
    labels: Array,
    chartData: Array
  },
  methods: {
    goToEmployeeTable() {
      this.$router.push("/employees");
    },
    goToSeatList() {
      this.$router.push("/seats");  // เปลี่ยน path ไปหน้า seatlist
    },
  },
};
</script>
