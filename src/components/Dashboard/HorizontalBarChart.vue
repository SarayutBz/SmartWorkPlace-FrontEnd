<template>
    <!-- Horizontal Bar Chart -->
    <div class="chart-card">
        <div class="chart-title">จำนวนพนักงานแยกตามแผนก</div>
        <div class="chart-container">
            <canvas ref="horizontalBarChart"></canvas>
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
            this.charts = new Chart(
                this.$refs.horizontalBarChart,
                {
                    type: "bar",
                    data: {
                        labels: [
                            "AI Engineer",
                            "Data Scientist",
                            "UX/UI Designer",
                            "Frontend",
                            "Backend",
                        ],
                        datasets: [
                            {
                                label: "จำนวนคน",
                                data: [15, 12, 18, 8, 10],
                                backgroundColor: [
                                    "#667eea",
                                    "#764ba2",
                                    "#f093fb",
                                    "#f5576c",
                                    "#4facfe",
                                ],
                                borderRadius: 8,
                            },
                        ],
                    },
                    options: {
                        indexAxis: "y",
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                                grid: {
                                    color: "rgba(0,0,0,0.1)",
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                            },
                        },
                    },
                }
            );
        }
    }

}





</script>