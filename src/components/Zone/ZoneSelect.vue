<template>
    <v-app>
        <div class="flex">
            <SideBar />
            <div class="box">
                <NavBar />

                <p class="text-center">
                    {{ SvgName }}
                </p>

                <div id="svg-container" v-html="svgContent" @click="onZoneClick" class="max-w-[150px] flex justify-center"></div>

                <p v-if="selectedTable">คุณคลิกที่โต๊ะ: {{ selectedTable }}</p>


            </div>
        </div>
    </v-app>
</template>

<script>
import NavBar from '../NavBar.vue'
import SideBar from '../SideBar.vue'


export default {
    data: () => ({
        SvgName: '',
        svgContent: '',
        selectedZone: '',
        selectedTable: null,
        isShowSvg: false,
    }),
    components: { NavBar, SideBar },

    watch: {
        '$route.path': {
            immediate: true,
            handler(newPath) {
                this.loadSvgFromRoute(newPath)
            }
        }
    },
    methods: {
        async loadSvgFromRoute(path) {
            // ดึงชื่อ SVG จาก path เช่น '/zone/cnx-1-1-zoneA0' -> 'cnx-1-1-zoneA0.svg'
            const parts = path.split('/');
            const fileName = parts[parts.length - 1] + '.svg';
            this.SvgName = fileName;

            try {
                // ใช้ fetch โหลดไฟล์ SVG จาก public folder
                const response = await fetch(`/svg/zone-svg/${fileName}`);
                if (!response.ok) {
                    throw new Error('ไม่พบไฟล์ SVG');
                }
                const svgText = await response.text();
                this.svgContent = svgText;
                this.isShowSvg = true;
            } catch (error) {
                console.error('โหลด SVG ไม่สำเร็จ:', error);
                this.svgContent = '<p class="text-red-500">ไม่พบไฟล์ SVG</p>';
                this.isShowSvg = false;
            }
        },

        onZoneClick(event) {
            const table = event.target.closest('[data-table]')?.getAttribute('data-table');
            if (table) {
                this.selectedTable = table;
                console.log('คลิกโต๊ะ:', table);
            }
        },
    }
}

</script>

<style>
.box {
    width: 100%;
}

#svg-container svg [data-table] {
    cursor: pointer;
    transition: fill 0.3s;
}

#svg-container svg [data-table]:hover {
    fill: #90caf9;
}
</style>
