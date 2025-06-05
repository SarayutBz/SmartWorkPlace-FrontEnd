<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <NavBar />
    <div>
      <div class="p-6 bg-gray-50 min-h-screen">
        <!-- User Dialog -->
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="400">
            <v-card>
              <v-card-title class="text-h6 font-bold text-blue-700">
                👤 User ID: {{ userList.id }}
              </v-card-title>
              <v-card-text>
                <div class="mb-2">
                  <span class="font-semibold text-gray-700">First name:</span>
                  {{ userList.firstname }}
                </div>
                <div class="mb-2">
                  <span class="font-semibold text-gray-700">Last name:</span>
                  {{ userList.lastname }}
                </div>
                <div class="mt-4 flex justify-center">
                  <img
                    :src="userList.image_url"
                    alt="User Image"
                    class="w-40 h-40 object-cover rounded-lg shadow-lg border border-gray-200"
                  />
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="red" variant="text" @click="dialog = false"
                  >Disagree</v-btn
                >
                <v-btn color="green" variant="text" @click="dialog = false"
                  >Agree</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- Table -->
        <template>
          <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="5"
            class="elevation-1"
          
          >
            <template v-slot:item.pictureUrl="{ item }">
              <img
                :src="item.image_url"
                alt="User Image"
                @click="testClick(item)"
                class="w-16 h-16 object-cover rounded"
              />
            </template>
          </v-data-table>
        </template>
      </div>
    </div>
  </v-app>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      userList: {},
      dialog: false,
      headers: [
        {
          text: "firstname",
          align: "start",
          sortable: false,
          value: "firstname",
        },
        {
          text: "lastname",
          align: "start",
          sortable: false,
          value: "lastname",
        },
        { text: "department", value: "department" },
        { text: "position", value: "position" },
        { text: "phone", value: "phone" },
        { text: "image", value: "pictureUrl" },
      ],
    };
  },

  components: {
 
  },
  computed: {
    users() {
      console.log(this.getEmployees);
      return this.getEmployees;
    },
    ...mapGetters(["getEmployees"]),
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    testClick(user) {
      this.userList = user;
      this.dialog = true;
    },
    ...mapActions(["fetchEmployees"]),
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

img{
  cursor: pointer;
}
</style>
