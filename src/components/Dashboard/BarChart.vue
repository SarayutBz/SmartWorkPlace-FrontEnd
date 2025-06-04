<template>
    <div class="chart-card">
        <div class="chart-title">พนักงานเข้าออฟฟิศรายวัน</div>
        <div class="chart-container">
            <canvas ref="barChart"></canvas>
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
            this.chart = new Chart(this.$refs.barChart, {
                type: "bar",
                data: {
                    labels: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"],
                    datasets: [
                        {
                            label: "จำนวนคน",
                            data: [8, 3, 12, 5, 7],
                            backgroundColor: [
                                "#10B981",
                                "#EF4444",
                                "#8B5CF6",
                                "#F59E0B",
                                "#6B7280",
                            ],
                            borderRadius: 8,
                            borderSkipped: false,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: "rgba(0,0,0,0.1)",
                            },
                        },
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                    },
                },
            });
        },
    },
};
</script>
