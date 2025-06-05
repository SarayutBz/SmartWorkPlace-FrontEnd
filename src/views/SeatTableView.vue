<template>
  <v-container>
    <SeatsList :seats="seats" :loading="loading" />
  </v-container>
</template>

<script>
import SeatsList from '@/components/employees/SeatsList.vue';
import axios from 'axios';

export default {
  name: 'SeatsListView',
  components: {
    SeatsList,
  },
  data() {
    return {
      seats: [],
      loading: true,
    };
  },
  created() {
    this.fetchSeats();
  },
  methods: {
  async fetchSeats() {
    try {
      const response = await axios.get('http://localhost:3000/seats');
      const rawData = response.data;

      // 🌟 แปลงให้ flat
      const flatSeats = [];

      rawData.forEach(floor => {
        floor.zones.forEach(zone => {
          zone.rows.forEach(row => {
            row.seats.forEach((seat, index) => {
              flatSeats.push({
                seat_number: `${zone.name}-${row.name}-${index + 1}`, // เช่น ZonA-1-1
                zone: zone.name,
                status: seat.status,
                occupant_name: seat.employee
                  ? `${seat.employee.firstname} ${seat.employee.lastname}`
                  : '-',
              });
            });
          });
        });
      });

      this.seats = flatSeats;
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลที่นั่ง:', error);
    } finally {
      this.loading = false;
    }
  },
}

};
</script>
