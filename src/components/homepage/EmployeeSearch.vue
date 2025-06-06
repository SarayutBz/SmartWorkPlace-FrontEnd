<template>
  <v-card class="pa-4 mb-4" outlined>
    <v-row dense align="center" justify="space-between">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="employeeId"
          label="กรอกรหัสพนักงาน"
          outlined
          dense
          clearable
          :disabled="isLoading || isSearching"
          @keyup.enter="onSearch"
        />
      </v-col>

      <v-col cols="12" md="4" class="d-flex align-center">
        <v-btn
          color="green"
          class="white--text"
          :disabled="!employeeId || isLoading || isSearching"
          @click="onSearch"
          block
          height="56px"
        >
          ค้นหา
        </v-btn>
      </v-col>
    </v-row>

    <!-- แสดงข้อมูลพนักงานถ้ามี -->
    <v-card v-if="employee" class="mt-4 pa-4" outlined>
      <v-row>
        <v-col cols="4">
          <v-img :src="employee.image_url" alt="ภาพพนักงาน" />
        </v-col>
        <v-col cols="8">
          <div><strong>ชื่อ:</strong> {{ employee.firstname }} {{ employee.lastname }}</div>
          <div><strong>แผนก:</strong> {{ employee.department }}</div>
          <div><strong>ตำแหน่ง:</strong> {{ employee.position }}</div>
          <div><strong>โทร:</strong> {{ employee.phone }}</div>

          <v-btn
            color="primary"
            class="mt-4"
            @click="viewSeatZone"
          >
            ดูโซนที่นั่ง
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: {
    isLoading: Boolean,
  },
  emits: ['search-result', 'view-seat-zone'],
  data() {
    return {
      employeeId: '',
      isSearching: false,
      employee: null, // เก็บข้อมูลพนักงานที่ค้นหาเจอ
    };
  },
  methods: {
    async onSearch() {
      if (!this.employeeId) return;

      this.isSearching = true;
      this.employee = null;

      try {
        const res = await fetch('http://localhost:3000/employee');
        if (!res.ok) throw new Error('ไม่สามารถดึงข้อมูลพนักงานได้');

        const json = await res.json();

        if (json.success && json.data.length > 0) {
          const found = json.data.find(emp => emp._id === this.employeeId);

          if (found) {
            this.employee = found;
            this.$emit('search-result', found);
          } else {
            alert('ไม่พบข้อมูลพนักงานที่ระบุ');
          }
        } else {
          alert('ไม่พบข้อมูลพนักงาน');
        }
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการค้นหา: ' + error.message);
      } finally {
        this.isSearching = false;
      }
    },
    viewSeatZone() {
      if (this.employee) {
        this.$emit('view-seat-zone', this.employee);
      }
    },
  },
};
</script>
