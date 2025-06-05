<template>
  <v-card>
    <v-card-title>รายการที่นั่งทั้งหมด</v-card-title>

    <v-data-table
      :headers="headers"
      :items="seats"
      :loading="loading"
      loading-text="กำลังโหลดข้อมูล..."
      class="elevation-1"
    >
      <template #item.status="{ item }">
        <v-chip :color="item.status === 'available' ? 'green' : 'red'" dark>
          {{ item.status === 'available' ? 'ว่าง' : 'ไม่ว่าง' }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'SeatTable',
  props: {
    seats: Array,
    loading: Boolean,
  },
  data() {
    return {
      headers: [
        { text: 'เลขที่นั่ง', value: 'seat_number' },
        { text: 'โซน', value: 'zone' },
        { text: 'สถานะ', value: 'status' },
        { text: 'ชื่อผู้ใช้งาน', value: 'occupant_name' },
      ],
    };
  },
};
</script>
