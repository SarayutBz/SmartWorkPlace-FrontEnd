<template>
  <div class="main-content">
    <!-- Header -->
    <div class="header2">
      <div class="menu-icon">
        <i class="fas fa-bars"></i>
      </div>
      <router-link to="/dashboard">
        
        <h1>Smart WorkPlace</h1>
      </router-link>
    </div>
  </div>
</template>

<style>
.main-content {
  flex: 1;
  /* padding: 20px; */
}

.header2 {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  height: 80px;
}

.menu-icon {
  margin-right: 15px;
  font-size: 20px;
  color: #666;
}

.header2 h1 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
