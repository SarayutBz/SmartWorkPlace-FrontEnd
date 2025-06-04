<template>
        <!-- Sidebar -->
    <div class="sidebar">
      <div class="profile-section">
        <div class="profile-img">A</div>
      </div>
      <div class="sidebar-icon">
        <i class="fas fa-th-large"></i>
      </div>
      <div class="sidebar-icon">
        <i class="fas fa-table"></i>
      </div>
      <div class="sidebar-icon">
        <i class="fas fa-clipboard-list"></i>
      </div>
    </div>

</template>

<style>
.sidebar {
  width: 60px;
  background-color: #ebfaf4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.profile-section {
  margin-bottom: 30px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007acc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.sidebar-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.sidebar-icon:hover {
  background-color: rgba(0, 122, 204, 0.1);
}

.sidebar-icon i {
  color: #666;
  font-size: 18px;
}



</style>