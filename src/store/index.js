// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seats: [],
    employees: [],
    dashboard:[]
  },
  actions: {
    async fetchSeats({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/seats");
        const data = await response.json();
        commit("setSeats", data);
      } catch (error) {
        console.error("Failed to fetch seats:", error);
      }
    },

    async fetchEmployees({ commit }) {
      try {
        const res = await fetch("http://localhost:3000/employee");
        const json = await res.json();
        commit("setEmployees", json.data); // ✅ ต้องเป็น json.data
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    },
    async fetchDashboard({ commit }) {
      try {
        const res = await fetch("http://localhost:3000/dashboard");
        const json = await res.json();
        commit("setDashboard", json); 
        // console.log(json)
      } catch (error) {
        console.error("Failed to fetch Dashboard:", error);
      }
    },

  },
  mutations: {
    setSeats(state, seats) {
      state.seats = seats;
    },
    setEmployees(state, employees) {
      state.employees = employees;
    },
    setDashboard(state, dashboard) {
      state.dashboard = dashboard;
    },
  },

  getters: {
    getSeats(state) {
      return state.seats;
    },
    getEmployees(state) {
      return state.employees;
    },
  
    getDashboard(state) {
      return state.dashboard;
    },
  },
}
);
