<template>
    <v-app>
        <div class="flex">
          
            <div class="box">
                <NavBar />

                <p class="text-center">
                    {{ SvgName }}
                </p>
               

                <div id="svg-container" v-html="svgContent" @click="onZoneClick"
                    class="max-w-[150px] flex justify-center"></div>

                <!-- <p v-if="selectedTable">คุณคลิกที่โต๊ะ: {{ selectedTable }}</p> -->

                <v-dialog v-model="dialog" class="justify-center" persistent max-width="400">
                    <v-card>
                        <v-card-title class="text-h5">
                            โต๊ะที่คุณเลือก
                        </v-card-title>
                        <v-card-text v-if="tableData">
                            <p>โต๊ะหมายเลข: <strong>{{ tableData.tableNumber }}</strong></p>
                            <p>รหัสพนักงาน: {{ tableData.emp_id }}</p>
                            <p>สถานะ: {{ tableData.status }}</p>
                        </v-card-text>
                        <v-card-text v-else>
                            <p class="text-red-500">ไม่พบข้อมูลโต๊ะนี้ในระบบ</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="orange" text @click="dialog = false">
                               แก้ไขที่นั่ง
                            </v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false">
                                ปิด
                            </v-btn>
                            

                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </div>
        </div>
    </v-app>
</template>

<script>
import NavBar from '../NavBar.vue'

import axios from 'axios'

export default {
    data: () => ({
        SvgName: '',
        svgContent: '',
        selectedZone: '',
        selectedTable: null,
        isShowSvg: false,
        dialog: false,
        clickedTable: null,
        tableData: null,
    }),
    components: { NavBar, },

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
            const parts = path.split('/');
            console.log("parts : ",parts)
            const fileName = parts[parts.length - 1] + '.svg';
            console.log("fileName : ",fileName)
            this.SvgName = fileName;

            try {
                const response = await fetch(`/svg/zone-svg/${fileName}`);
                if (!response.ok) throw new Error('ไม่พบไฟล์ SVG');
                const svgText = await response.text();
                this.svgContent = svgText;
                this.isShowSvg = true;

                // รอให้ Vue อัปเดต DOM svg-container ก่อน
                this.$nextTick(() => {
                    this.applyTableColors();
                });

            } catch (error) {
                console.error('โหลด SVG ไม่สำเร็จ:', error);
                this.svgContent = '<p class="text-red-500">ไม่พบไฟล์ SVG</p>';
                this.isShowSvg = false;
            }
        },

        async applyTableColors() {
            try {
                const allResponse = await this.getTable();
                const allTables = allResponse.data;

                // เข้าถึง div svg-container ที่มี svg ภายใน
                const svgContainer = this.$el.querySelector('#svg-container');
                if (!svgContainer) return;

                allTables.forEach(table => {
                    // หา element ที่มี attribute data-table เท่ากับเลขโต๊ะ
                    const el = svgContainer.querySelector(`[data-table="${table.tableNumber}"]`);
                    if (el) {
                        if (table.status === 'active') {
                            el.style.fill = 'red';  // active = แดง
                        } else if (table.status === 'inactive') {
                            el.style.fill = '#51B24A';  // inactive = เขียว
                        } else {
                            el.style.fill = '#ffff'; // default
                        }
                    }
                });
            } catch (e) {
                console.error('ไม่สามารถเปลี่ยนสีโต๊ะ:', e);
            }
        },


        async onZoneClick(event) {
            const table = event.target.closest('[data-table]')?.getAttribute('data-table');
            if (table) {
                this.selectedTable = table;
                this.clickedTable = table;

                try {
                    const allResponse = await this.getTable();
                    const allTables = allResponse.data; 
                    const match = allTables.find(item => item.tableNumber === table);
                    this.tableData = match || null;
                    console.log('ข้อมูลโต๊ะที่คลิก:', this.tableData);
                } catch (e) {
                    console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลโต๊ะ:', e);
                    this.tableData = null;
                }

                this.dialog = true;
            }
        },

        async getTable() {
            const res = await axios.get(`http://localhost:3000/seats/table/`);
            return res.data;
        }
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
