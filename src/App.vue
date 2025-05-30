<template>
  <v-app>
    <v-app-bar
      app
      color="teal darken-2"
      dark
      elevate-on-scroll
      flat
    >
      <!-- โลโก้ + ชื่อเว็บ -->
      <!-- <v-btn icon @click="$router.push('/')" aria-label="Home">
        <v-img
          alt="SeatBook Logo"
          src="https://cdn-icons-png.flaticon.com/512/2917/2917997.png"
          contain
          width="40"
        />
      </v-btn> -->

      <v-toolbar-title class="hidden-sm-and-down" style="cursor: pointer" @click="$router.push('/')">
        SeatBook
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- เมนูหลัก -->
      <v-btn text to="/" class="mx-2" exact>
        Dashboard
      </v-btn>
      <v-btn text to="/book-seat" class="mx-2">
        Book Seat
      </v-btn>
      <v-btn text to="/my-bookings" class="mx-2">
        My Bookings
      </v-btn>
      <v-btn text to="/employees" class="mx-2">
        Employees
      </v-btn>
      <v-btn text to="/settings" class="mx-2">
        Settings
      </v-btn>


      <!-- ปุ่มลิงก์ช่วยเหลือ -->
      <!-- <v-btn href="https://help.seatbook.example.com" target="_blank" text class="ml-4" rel="noopener">
        <v-icon left>mdi-lifebuoy</v-icon> ช่วยเหลือ
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.v-toolbar-title {
  font-weight: 700;
  font-size: 1.25rem;
  user-select: none;
  color: #ffffff;
}

.v-btn {
  font-weight: 500;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
