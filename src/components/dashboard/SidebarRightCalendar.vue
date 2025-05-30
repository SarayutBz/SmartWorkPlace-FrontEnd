<template>
  <v-navigation-drawer app right permanent width="360" class="pa-4">
    <div class="text-h6 font-weight-medium mb-4">📅 Upcoming check-ups</div>
    <v-card class="pa-4" elevation="2" style="border-radius: 15px;">
      <v-calendar color="primary" />
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SidebarRightCalendar",
};
</script>
