<template>
  <div>
    <div class="container text-center">
      <div class="dashboard-user">
        <h3 class="text-3xl text-center p-5 font-bold">จำนวนพนักงานทั้งหมด</h3>
        <h2 class="text-6xl text-center p-5 font-bold">10</h2>
        <div class="btn">
          <div class="btn flex justify-center">
            <router-link
              to="/table"
              type="button"
              class="text-white text-xl bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-600"
            >
              ดูข้อมูล
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style></style>
