<template>
  <v-app>
    <NavBar/>
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
                  <img :src="userList.pictureUrl" alt="User Image"
                    class="w-40 h-40 object-cover rounded-lg shadow-lg border border-gray-200" />
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="red" variant="text" @click="dialog = false">Disagree</v-btn>
                <v-btn color="green" variant="text" @click="dialog = false">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

        <!-- Table -->
        <div class="overflow-x-auto mt-10">
          <table class="min-w-full border border-blue-200 bg-white rounded-lg shadow-lg">
            <thead class="bg-blue-100 text-blue-800">
              <tr>
                <th class="py-3 px-4 border">First name</th>
                <th class="py-3 px-4 border">Last name</th>
                <th class="py-3 px-4 border">Department</th>
                <th class="py-3 px-4 border">Position</th>
                <th class="py-3 px-4 border">Phone</th>
                <th class="py-3 px-4 border">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id"
                class="hover:bg-gray-100 transition duration-200 text-gray-700">
                <td class="py-2 px-4 border">{{ user.firstname }}</td>
                <td class="py-2 px-4 border">{{ user.lastname }}</td>
                <td class="py-2 px-4 border">{{ user.department }}</td>
                <td class="py-2 px-4 border">{{ user.position }}</td>
                <td class="py-2 px-4 border">{{ user.phone }}</td>
                <td class="py-2 px-4 border text-center">
                  <img @click="testClick(user)" :src="user.pictureUrl" alt="user image"
                    class="w-20 h-20 object-cover rounded-full shadow cursor-pointer hover:scale-105 transition duration-200" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import NavBar from "../NavBar.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      userList: {},
      dialog: false,
    };
  },
  components: {
    NavBar,
  },
  computed: {
    users() {
      console.log(this.getEmployees)
      return this.getEmployees;
    },
    ...mapGetters(['getEmployees']),
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    testClick(user) {
      this.userList = user;
      this.dialog = true;
    },
    ...mapActions(['fetchEmployees']),
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
