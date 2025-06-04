<template>
  <div>
    <NavBar />
    <div class="m-5">
     <h3>Hello world</h3>
    </div>
  </div>
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
// import tableView from "@/components/tableView.vue";
// import { EventBus } from "../EventBus";
export default {
  // components: {
  //   tableView,
  //   NavBar,
  // },
  data() {
    return {
   
    };
  },
  // methods: {
  //   sendArray() {
  //     EventBus.$emit("array-sent", this.userList);
  //   },
  // },
  mounted() {
    this.sendArray();
  },
};
</script>

<style></style>
