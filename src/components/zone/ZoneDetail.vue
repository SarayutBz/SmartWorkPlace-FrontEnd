<template>
  <v-container class="pa-6" max-width="800px">
    <v-card outlined class="mb-6" elevation="3">
      <v-card-title class="green--text text-h5 font-weight-bold">
        รายละเอียดโซน: {{ zoneId }}
      </v-card-title>
      <v-card-text>
        <p>คุณกำลังดูข้อมูลของโซน <strong>{{ zoneId }}</strong></p>
      </v-card-text>
    </v-card>

    <v-row dense>
      <v-col cols="12" md="7">
        <v-card outlined elevation="3">
          <v-card-title class="text-h6">แผนผังโซน</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <interactive-svg 
              v-if="svgContent" 
              :svgContent="svgContent" 
              :occupiedTables="occupiedTables"
              @table-click="handleTableClick" 
            />
            <div v-else class="text-center grey--text">
              กำลังโหลดแผนผัง...
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="5" v-if="selectedTableId">
        <v-card outlined elevation="3" class="pa-4">
          <v-card-title class="text-h6">รายละเอียดโต๊ะ {{ selectedTableId }}</v-card-title>
          <v-card-text>
            <p>สถานะ: {{ tableIsAvailable ? '✅ ว่าง' : '❌ ไม่ว่าง' }}</p>

            <!-- แสดงข้อมูลพนักงานที่จองโต๊ะถ้าไม่ว่าง -->
            <div v-if="!tableIsAvailable && bookedTables[selectedTableId]">
              <p><strong>พนักงานที่จองโต๊ะนี้:</strong></p>
              <ul>
                <li>รหัสพนักงาน: {{ bookedTables[selectedTableId]._id }}</li>
                <li>ชื่อ: {{ bookedTables[selectedTableId].firstname }} {{ bookedTables[selectedTableId].lastname }}</li>
                <li>แผนก: {{ bookedTables[selectedTableId].department }}</li>
                <li>ตำแหน่ง: {{ bookedTables[selectedTableId].position }}</li>
                <li>โทรศัพท์: {{ bookedTables[selectedTableId].phone }}</li>
              </ul>
            </div>

            <v-btn color="success" v-if="tableIsAvailable" @click="addPermission">
              เพิ่มสิทธิ์
            </v-btn>
            <div v-else>
              <v-btn color="warning" class="mr-2" @click="editPermission">แก้ไข</v-btn>
              <v-btn color="error" @click="deletePermission">ลบ</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showAddDialog" max-width="400">
      <v-card>
        <v-card-title>
          {{ editingMode === 'add' ? 'เพิ่มสิทธิ์ที่นั่ง' : 'แก้ไขเจ้าของโต๊ะ' }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="กรอกรหัสพนักงาน"
            v-model="employeeCode"
            @input="searchEmployee"
            outlined
          />

          <div v-if="matchedEmployee" class="mt-3">
            <p><strong>ชื่อ:</strong> {{ matchedEmployee.firstname }} {{ matchedEmployee.lastname }}</p>
            <p><strong>แผนก:</strong> {{ matchedEmployee.department }}</p>
            <p><strong>ตำแหน่ง:</strong> {{ matchedEmployee.position }}</p>
          </div>
          <div v-else-if="searched" class="mt-2" style="color:red;">
            ไม่พบพนักงานที่มีรหัสนี้
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showAddDialog = false">ยกเลิก</v-btn>
          <v-btn
            color="green"
            :disabled="!matchedEmployee"
            @click="assignToTable"
          >
            {{ editingMode === 'add' ? 'ยืนยัน' : 'บันทึก' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios'
import InteractiveSvg from './InteractiveSvg.vue'

export default {
  components: { InteractiveSvg },
  data() {
    return {
      svgContent: null,
      selectedTableId: null,
      occupiedTables: [], // โต๊ะที่ไม่ว่าง (จองแล้ว)
      availableTables: [],
      tableIsAvailable: true,

      bookedTables: {}, // เก็บข้อมูลพนักงานที่จองโต๊ะ

      showAddDialog: false,
      employeeCode: '',
      matchedEmployee: null,
      searched: false,

      editingMode: 'add', // 'add' หรือ 'edit' กำหนดว่าเปิด popup เพื่อเพิ่ม หรือแก้ไข
    }
  },

  computed: {
    zoneId() {
      return this.$route.params.zoneId || 'zoneA'
    }
  },

  watch: {
    zoneId: {
      immediate: true,
      handler(newZone) {
        this.loadZoneSvg(newZone)
      }
    },
    employeeCode() {
      this.searchEmployee()
    }
  },

  methods: {
    async loadZoneSvg(zoneId) {
      this.svgContent = null
      this.selectedTableId = null
      try {
        const path = `/svg/cnx/zone/${zoneId}.svg`
        const res = await fetch(path)
        if (!res.ok) throw new Error('ไม่พบไฟล์ SVG ของโซนนี้')
        this.svgContent = await res.text()
      } catch (error) {
        console.error(error)
        this.svgContent = '<p>ไม่พบแผนผังของโซนนี้</p>'
      }
    },

    handleTableClick(id) {
      this.selectedTableId = id
      this.tableIsAvailable = !this.occupiedTables.includes(id)
    },

    addPermission() {
      this.editingMode = 'add'
      this.showAddDialog = true
      this.employeeCode = ''
      this.matchedEmployee = null
      this.searched = false
    },

    editPermission() {
      this.editingMode = 'edit'
      this.showAddDialog = true
      this.searched = false

      // ดึงข้อมูลเจ้าของโต๊ะเก่า (ถ้ามี) มาแสดงในช่องกรอกรหัส
      const occupant = this.bookedTables[this.selectedTableId]
      if (occupant) {
        this.employeeCode = occupant._id
        this.matchedEmployee = occupant
      } else {
        this.employeeCode = ''
        this.matchedEmployee = null
      }
    },

    deletePermission() {
      const confirmed = confirm(`❗ คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลโต๊ะ ${this.selectedTableId} ?`)
      if (!confirmed) return

      // ลบออกจาก occupiedTables
      this.occupiedTables = this.occupiedTables.filter(id => id !== this.selectedTableId)

      // ลบออกจาก bookedTables
      delete this.bookedTables[this.selectedTableId]

      // ตั้งค่าว่าโต๊ะว่าง
      this.tableIsAvailable = true

      // ปิด popup ถ้ามี
      this.showAddDialog = false

      // แจ้งเตือน
      alert(`✅ ลบข้อมูลโต๊ะ ${this.selectedTableId} เรียบร้อยแล้ว`)
    },

    async searchEmployee() {
      this.searched = true
      const code = this.employeeCode.trim()
      if (!code) {
        this.matchedEmployee = null
        return
      }
      try {
        const res = await axios.get('http://localhost:3000/employee')
        const allEmployees = res.data.data || res.data

        if (!Array.isArray(allEmployees)) {
          console.error('ข้อมูลที่ได้ไม่ใช่ array:', allEmployees)
          this.matchedEmployee = null
          return
        }

        const match = allEmployees.find(emp => emp._id === code)
        this.matchedEmployee = match || null
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลพนักงาน:', error)
        this.matchedEmployee = null
      }
    },

    assignToTable() {
      if (!this.matchedEmployee) return

      if (this.editingMode === 'add') {
        alert(`✅ เพิ่มสิทธิ์ให้พนักงาน ${this.matchedEmployee.firstname} ที่โต๊ะ ${this.selectedTableId}`)
        if (!this.occupiedTables.includes(this.selectedTableId)) {
          this.occupiedTables.push(this.selectedTableId)
        }
      } else if (this.editingMode === 'edit') {
        alert(`✏️ แก้ไขเจ้าของโต๊ะเป็นพนักงาน ${this.matchedEmployee.firstname} ที่โต๊ะ ${this.selectedTableId}`)
      }

      // บันทึกข้อมูลพนักงานที่จองโต๊ะนี้ (เพิ่ม/แก้ไข)
      this.bookedTables = {
        ...this.bookedTables,
        [this.selectedTableId]: this.matchedEmployee
      }

      this.tableIsAvailable = false
      this.showAddDialog = false
    }
  }
}

</script>

<style scoped>
.v-card {
  border-radius: 12px;
}
.text-center {
  text-align: center;
  padding: 20px 0;
}
.v-list-item-subtitle {
  color: #666;
}
</style>
