<template>
  <div>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Chart",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      options: {},
      series: [44, 55, 41, 17, 15],
    };
  },
};
</script>
