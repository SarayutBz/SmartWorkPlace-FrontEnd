<template>
  <v-card
    class="summary-card pa-4 text-center"
    :color="color"
    elevation="2"
    @click="$emit('click')"
    style="cursor: pointer"
  >
    <v-card-title class="justify-center">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <h2>{{ value }}</h2>
      <small>{{ subtext }}</small>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "SummaryCard",
  props: {
    title: String,
    value: [String, Number],
    subtext: String,
    color: {
      type: String,
      default: "green lighten-4",
    },
  },
};
</script>

<style scoped>
.summary-card {
  min-height: 180px; /* กำหนดความสูงขั้นต่ำเท่ากัน */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.3s ease;
}

.summary-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}
</style>
