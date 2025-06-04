<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    sort-by="empNumber"
    :sort-desc="false"
  >
    <template v-slot:item="props">
      <tr>
        <!-- <td>{{ props.item.empNumber }}</td> -->
        <td>{{ props.item._id }}</td>
        <td>{{ props.item.firstname }}</td>
        <td>{{ props.item.lastname }}</td>
        <td>{{ props.item.department }}</td>
        <td>{{ props.item.position }}</td>
        <td>{{ props.item.phone }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: {
    employees: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  data() {
    return {
      headers: [
        { text: 'Employee ID', value: '_id' },
        { text: 'First Name', value: 'firstname' },
        { text: 'Last Name', value: 'lastname' },
        { text: 'Department', value: 'department' },
        { text: 'Position', value: 'position' },
        { text: 'Phone', value: 'phone' }
      ]
    }
  }
}
</script>
