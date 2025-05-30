<template>
  <v-navigation-drawer app permanent width="72">
    <v-list>
      <v-list-item v-for="icon in icons" :key="icon" class="justify-center">
        <v-icon>{{ icon }}</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SidebarLeft",
  data() {
    return {
      icons: ["mdi-view-dashboard", "mdi-account-group", "mdi-chair-rolling", "mdi-calendar-month"],
    };
  },
};
</script>
