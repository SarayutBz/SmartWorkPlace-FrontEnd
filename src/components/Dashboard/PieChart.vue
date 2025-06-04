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
export default {
    mounted() {
        this.renderChart();
    },
    beforeDestroy() {
        if (this.chart) this.chart.destroy();
    },

    methods: {
        renderChart() {
            // eslint-disable-next-line no-undef
            this.charts = new Chart(this.$refs.pieChart, {
                type: "doughnut",
                data: {
                    labels: ["ตรงเวลา", "ไม่ตรงเวลา"],
                    datasets: [
                        {
                            data: [70, 30],
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
