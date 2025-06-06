<template>
  <v-container fluid>
    <v-row justify="center" dense>
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

      <!-- เพิ่ม v-card ห่อ CheckinChart -->
      <v-col cols="12" md="6">
        <v-card
          elevation="2"
          class="chart-card pa-4 d-flex flex-column"
        >
          <v-card-title class="text-h6">Check-in Chart</v-card-title>
          <v-card-text class="flex-grow-1 d-flex align-center justify-center">
            <CheckinChart :labels="labels" :data="chartData" />
          </v-card-text>
        </v-card>
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
    chartData: Array,
  },
  methods: {
    goToEmployeeTable() {
      this.$router.push("/employees");
    },
    goToSeatList() {
      this.$router.push("/seats");
    },
  },
};
</script>

<style scoped>
.chart-card {
  min-height: 180px; /* เท่ากับ SummaryCard */
}

</style>