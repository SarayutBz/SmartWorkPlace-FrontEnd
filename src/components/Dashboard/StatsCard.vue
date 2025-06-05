<template>
  <!-- Stats Row -->
  <div class="stats-row">
    <router-link to="/table">

      <div class="stat-card">
        <div class="stat-number">{{ allDashboard.totalEmployees }}</div>
        <div class="stat-label">จำนวนพนักงานทั้งหมด</div>
        <div class="stat-icon"><i class="fas fa-user"></i></div>
      </div>
    </router-link>
    <div class="stat-card">
      <div class="stat-number">{{ allDashboard.totalSeats }}</div>
      <div class="stat-label">จำนวนโต๊ะทั้งหมด</div>
      <div class="stat-icon"><i class="fas fa-chair"></i></div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ allDashboard.occupiedSeats }}</div>
      <div class="stat-label">ที่นั่งที่ใช้งาน</div>
      <div class="stat-icon"><i class="fas fa-user"></i></div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ allDashboard.availableSeats }}</div>
      <div class="stat-label">ที่นั่งว่าง</div>
      <div class="stat-icon"><i class="fas fa-check"></i></div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ allSeats[0].floor }}</div>
      <div class="stat-label">ชั้น</div>
      <div class="stat-icon"><i class="fas fa-check"></i></div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getDashboard', 'getSeats']),

    allDashboard() {
      return this.getDashboard
    },
    allSeats() {
      return this.getSeats
    }
  },
  created() {
    this.fetchDashboard()
    this.fetchSeats()
  },
  methods: {
    ...mapActions(['fetchDashboard', 'fetchSeats'])
  }
}
</script>



<style>
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
}

.stat-icon {
  font-size: 1.5rem;
  color: #007acc;
}
</style>
