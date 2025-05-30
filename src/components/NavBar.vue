<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/">
        
        <div class="logo">Smart workplace</div>
      </router-link>

      <div class="nav-tabs">
        <router-link :to="{ name: 'dashboard' }">
          <div class="nav-tab" :class="{ active: $route.name === 'dashboard' }">
            <i class="fas fa-chart-bar"></i>
            Dashboard
          </div>
        </router-link>

        <router-link :to="{ name: 'center' }">
          <div class="nav-tab" :class="{ active: $route.name === 'center' }">
            <i class="fas fa-users"></i>
            ศูนย์
          </div>
        </router-link>
        <div class="nav-tab">
          <i class="fas fa-calendar"></i>
          จัดการที่นั่ง
        </div>
      </div>
    </div>

    <div class="search">
      <i class="fa-solid fa-magnifying-glass" ></i>
      <input
        type="text"
        class="search-box"
        placeholder="ค้นหาพนักงาน, ที่ตั้ง, แผนก..."
      />
    </div>

    <div class="header-right">
      <div class="notification-badge">
        <i class="fas fa-bell"></i>
        <div class="badge">1</div>
      </div>
      <i class="fas fa-user-circle" style="font-size: 24px"></i>
      <i class="fas fa-cog" style="font-size: 20px"></i>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fa-magnifying-glass{
  color: rgb(233, 233, 233);
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  color: #333;
}

.header {
  background: linear-gradient(135deg, #4f7fff 0%, #6a5aff 100%);
  color: white;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(79, 127, 255, 0.2);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 30px;
}

.logo {
  font-weight: bold;
  font-size: 18px;
}

.nav-tabs {
  display: flex;

  gap: 20px;
}

.nav-tab {
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-tab.active {
  background: rgba(255, 255, 255, 0.2);
}

.nav-tab:hover {
  background: rgba(255, 255, 255, 0.1);
}

.search .fa-solid {
  position: absolute;
  padding: 15px;
  min-width: 30px;
}
.search-box {
  background: rgb(255, 255, 255);
  border: 1px solid rgba(255, 255, 255, 0.762);
  border-radius: 10px;
  padding: 8px 16px;
  color: rgb(61, 61, 61);
  width: 500px;
  padding: 10px;
  text-align: center;
}

.search-box::placeholder {
  color: rgba(124, 124, 124, 0.7);
}
.search-box:focus-visible {
  /* background-color: lightblue; */
  /* border: 0.5px solid white; */
  outline: 2px solid rgb(231, 231, 231);
}

.header-right {
  display: flex;
  align-items: center;
  /* justify-content: left; */
  gap: 40px;
  margin-right: 45px;
}

.notification-badge {
  position: relative;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -8px;
  right: -15px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
</style>
