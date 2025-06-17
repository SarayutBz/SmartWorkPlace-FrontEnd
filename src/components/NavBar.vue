<template>
  <div class="main-content">
    <!-- Header -->
    <header class="header">
      <div class="logo-container">
        <router-link to="/dashboard" class="logo">
          <h1>Smart WorkPlace</h1>
        </router-link>
      </div>

      <nav class="nav-links">
        <router-link to="/dashboard" class="nav-item" :class="{ active: currentRouteName === 'dashboard' }">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/center" class="nav-item" :class="{ active: currentRouteName === 'center' }">
          <i class="fa-solid fa-building"></i>
          <span>Seating Map</span>
        </router-link>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped>
.main-content {
  background-color: #f4f6f8;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0 40px;
  height: 80px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e0e0e0;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo h1 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #4a5568;
  padding: 10px 16px;
  border-radius: 10px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-item i {
  font-size: 1.2rem;
}

.nav-item span {
  font-weight: 500;
}

.nav-item.active {
  background-color: #e6f4ff;
  color: #007acc;
  font-weight: 600;
}

.nav-item:hover {
  background-color: #f0f8ff;
  color: #007acc;
}
</style>
