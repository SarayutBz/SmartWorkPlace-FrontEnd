import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/DashboardView.vue";
import EmployeeTable from "@/views/EmployeeView.vue";
import SeatTable from "@/views/SeatTableView.vue";
import SelectProvince from "@/components/homepage/SelectProvince.vue"; // ✅ เลือกจังหวัด
import ZoneDetail from "@/components/zone/ZoneDetail.vue"; // ✅ เพิ่มหน้านี้

Vue.use(Router);

export default new Router({
  mode: "history", // ✅ ใช้ URL แบบไม่มี #
  routes: [
    { path: "/", name: "SelectProvince", component: SelectProvince },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/employees", name: "Employees", component: EmployeeTable },
    { path: "/seats", name: "SeatTable", component: SeatTable },
    { path: "/zone/:zoneId", name: "ZoneDetail", component: ZoneDetail }, // ✅ เพิ่มเส้นทางใหม่
  ],
});
