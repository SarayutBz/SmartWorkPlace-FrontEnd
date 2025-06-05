<template>
    <!-- Pie Chart -->
    <div class="chart-card">
        <div class="chart-title">สถานะที่นั่ง</div>
        
        <div class="chart-container small">
            <canvas ref="pieChart"></canvas>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    mounted() {

        this.renderChart()

    },
    computed: {
        ...mapGetters(['getDashboard']),

        allDashboard() {
            return this.getDashboard
        }
    },

    created() {
        this.fetchDashboard()
    },
    beforeDestroy() {
        if (this.chart) this.chart.destroy();
    },


    methods: {
        ...mapActions(['fetchDashboard']),
        renderChart() {
            // eslint-disable-next-line no-undef
            this.charts = new Chart(this.$refs.pieChart, {
                type: "doughnut",
                data: {
                    labels: ["ว่าง", "ไม่ว่าง"],
                    datasets: [
                        {
                            data: [this.allDashboard.availableSeats, this.allDashboard.occupiedSeats],
                            backgroundColor: ["#10B981", "#EF4444"],
                            borderWidth: 0,

                            cutout: "60%",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>
