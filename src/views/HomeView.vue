<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Employee List</h1>
    <EmployeeTable :employees="employees" />
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import EmployeeTable from '@/components/employees/EmployeeTable.vue'

export default {
  name: 'HomeView',
  components: {
    EmployeeTable
  },
  data() {
    return {
      employees: [],
      error: ''
    }
  },
  async created() {
  try {
    const res = await axios.get('http://localhost:3000/employee')
    console.log('API response:', res.data)  // ดูข้อมูลทั้งหมดที่ได้จาก API
    if (res.data.success) {
      this.employees = res.data.data
      console.log('Employees sample:', this.employees[0])  // ดูข้อมูลพนักงานตัวแรก
    } else {
      this.error = 'Failed to load employees.'
    }
  } catch (err) {
    this.error = 'Error fetching employees: ' + err.message
  }
}



}
</script>

<style scoped>
/* ใส่สไตล์ถ้าต้องการ */
</style>
