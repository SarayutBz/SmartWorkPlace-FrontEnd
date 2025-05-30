import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/DashboardView.vue";
import EmployeeTable from "@/views/HomeView.vue"; // ← หน้าเก่าที่มีตาราง

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "Dashboard", component: Dashboard },
    { path: "/employees", name: "Employees", component: EmployeeTable }
  ]
});
