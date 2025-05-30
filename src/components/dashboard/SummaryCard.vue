<template>
  <v-row>
    <v-col cols="4" v-for="card in cards" :key="card.title">
      <v-card
        class="pa-4"
        :style="{ cursor: 'pointer', backgroundColor: card.backgroundColor }"
        elevation="2"
        @click="card.onClick"
      >
        <v-row align="center" no-gutters>
          <v-col cols="3">
            <v-avatar size="56" :color="card.color" class="white--text">
              <v-icon size="36">{{ card.icon }}</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <div class="text-subtitle-1 font-weight-medium">{{ card.title }}</div>
            <div class="text-h5 font-weight-bold">{{ card.count }}</div>
            <div class="text-caption text--secondary">(คลิกเพื่อดูรายละเอียด)</div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SummaryCards",
  props: {
    employeeCount: Number,
    branchCount: Number,
    seatCount: Number,
  },
  methods: {
    goToEmployees() {
      this.$router.push("/employees");
    },
    goToBranches() {
      this.$router.push("/branches");
    },
    goToSeats() {
      this.$router.push("/seats");
    },
  },
  computed: {
    cards() {
      return [
        {
          title: "Total Employees",
          count: this.employeeCount,
          icon: "mdi-account-group",
          color: "blue",
          backgroundColor: "#E3F2FD",
          onClick: this.goToEmployees,
        },
        {
          title: "Branches",
          count: this.branchCount,
          icon: "mdi-office-building",
          color: "green",
          backgroundColor: "#E8F5E9",
          onClick: this.goToBranches,
        },
        {
          title: "Total Seats",
          count: this.seatCount,
          icon: "mdi-chair-rolling",
          color: "purple",
          backgroundColor: "#F3E5F5",
          onClick: this.goToSeats,
        },
      ];
    },
  },
};
</script>
