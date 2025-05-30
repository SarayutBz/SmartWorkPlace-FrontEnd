<template>
  <div class="p-6 bg-gray-50 min-h-screen">

    <v-app>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card>
            <v-card-title class="text-h5 font-bold text-blue-600">
              👤 User ID: {{ userList.id }}
            </v-card-title>
            <v-card-text>
              <div class="mb-2">
                <span class="font-semibold text-gray-700">First name:</span>
                {{ userList.fname }}
              </div>
              <div class="mb-2">
                <span class="font-semibold text-gray-700">Last name:</span>
                {{ userList.lname }}
              </div>
              <div class="mb-2">
                <span class="italic text-gray-700">Age:</span>
                {{ userList.age }}
              </div>
              <div class="mb-2">
                <span class="text-green-600 font-semibold">Salary:</span>
                {{ userList.salary }}
              </div>
              <div class="mt-4 flex justify-center">
                <img :src="userList.imageUrl" alt="User Image" class="w-40 h-40 object-cover rounded shadow" />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog = false">Disagree</v-btn>
              <v-btn color="green" text @click="dialog = false">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="overflow-x-auto mt-8">
        <table class="min-w-full border border-blue-300 bg-white rounded shadow">
          <thead class="">
            <tr>
              <th class="py-3 px-4 border">First name</th>
              <th class="py-3 px-4 border">Last name</th>
              <th class="py-3 px-4 border">Age</th>
              <th class="py-3 px-4 border">Phone</th>
              <th class="py-3 px-4 border">Salary</th>
              <th class="py-3 px-4 border">Department</th>
              <th class="py-3 px-4 border">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-100 transition">
              <td class="py-2 px-4 border">{{ user.fname }}</td>
              <td class="py-2 px-4 border">{{ user.lname }}</td>
              <td class="py-2 px-4 border">{{ user.age }}</td>
              <td class="py-2 px-4 border">{{ user.phone }}</td>
              <td class="py-2 px-4 border">{{ user.salary }}</td>
              <td class="py-2 px-4 border">{{ user.department }}</td>
              <td class="py-2 px-4 border">
                <img @click="testClick(user)" :src="user.imageUrl" alt="user image"
                  class="w-24 h-24 object-cover rounded shadow cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: {},
      dialog: false,
    };
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    testClick(user) {
      this.userList = user;
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
