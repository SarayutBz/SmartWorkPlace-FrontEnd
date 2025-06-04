<template>

    <!-- Stacked Bar Chart -->
    <div class="chart-card">
        <div class="chart-title">เปรียบเทียบงานแยกตามโซน</div>
        <div class="chart-container">
            <canvas ref="stackedBarChart"></canvas>
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
            this.charts = new Chart(this.$refs.stackedBarChart, {
                type: "bar",
                data: {
                    labels: ["Zone A", "Zone B"],
                    datasets: [
                        {
                            label: "Zone A",
                            data: [45, 0],
                            backgroundColor: "#3B82F6",
                        },
                        {
                            label: "Zone B",
                            data: [35, 60],
                            backgroundColor: "#10B981",
                        },
                        {
                            label: "Zone C",
                            data: [20, 40],
                            backgroundColor: "#8B5CF6",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            grid: {
                                color: "rgba(0,0,0,0.1)",
                            },
                        },
                    },
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



        }
    }
}



</script>