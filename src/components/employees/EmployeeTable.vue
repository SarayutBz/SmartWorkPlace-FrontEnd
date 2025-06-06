<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employees"
      sort-by="empNumber"
      :sort-desc="false"
    >
      <!-- ห่อทั้งแถวแล้วให้คลิกได้ทั้งแถว -->
      <template v-slot:item="{ item }">
        <tr @click="openDialog(item)" class="hover-row">
          <td>
            <v-img
              :src="item.image_url"
              width="50"
              height="50"
              cover
              class="rounded-circle"
            />
          </td>
          <td>{{ item._id }}</td>
          <td>{{ item.firstname }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.department }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.phone }}</td>
        </tr>
      </template>
    </v-data-table>

    <!-- Popup Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">Employee Details</span>
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="d-flex">
          <v-img
            :src="selected?.image_url"
            max-width="200"
            max-height="200"
            contain
            class="mr-4 rounded-circle"
          />

          <div>
            <p><strong>ID:</strong> {{ selected._id }}</p>
            <p><strong>Name:</strong> {{ selected.firstname }} {{ selected.lastname }}</p>
            <p><strong>Department:</strong> {{ selected.department }}</p>
            <p><strong>Position:</strong> {{ selected.position }}</p>
            <p><strong>Phone:</strong> {{ selected.phone }}</p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: 'Photo', value: 'image_url' },
        { text: 'Employee ID', value: '_id' },
        { text: 'First Name', value: 'firstname' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Department', value: 'department' },
        { text: 'Position', value: 'position' },
        { text: 'Phone', value: 'phone' }
      ],
      dialog: false,
      selected: {}
    }
  },
  methods: {
    openDialog(item) {
      this.selected = item
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.hover-row, .hover-row * {
  cursor: pointer !important;
}
.hover-row {
  transition: background-color 0.2s;
}
.hover-row:hover {
  background-color: #f5f5f5;
}
</style>
