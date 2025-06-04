// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    seats: [],
    employees: [],
  },
  actions: {
    async fetchSeats({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/seats/seatings");
        const data = await response.json();
        // สมมติ API คืน array ของ object แบบนี้
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
  },
  mutations: {
    setSeats(state, seats) {
      state.seats = seats;
    },
    setEmployees(state, employees) {
      state.employees = employees;
    },
  },

  getters: {
    getSeats(state) {
      return state.seats;
    },
    getEmployees(state) {
      return state.employees;
    },
  },
});
