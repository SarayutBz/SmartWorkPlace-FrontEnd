<template>
    <v-app>
        <div class="flex">
            <SideBar />
            <div class="box">
                <NavBar />
                <p class="text-center">
                    {{ SvgName }}
                </p>
                <v-row class="m-2 justify-center">
                    <v-col cols="5" sm="2">
                        <v-select :items="province" label="จังหวัด" outlined v-model="selectedProvince"
                            @change="onProvinceSelect"></v-select>
                    </v-col>

                    <v-col cols="5" sm="2">
                        <!-- <v-select :items="building" label="ตึก" outlined
                            :disabled="!isBuildingEnabled || isBuildingLoading" :loading="isBuildingLoading"
                            v-model="selectedBuilding" @change="onProvinceSelect2"></v-select> -->
                        <v-select :items="building" label="ตึก" outlined
                            :disabled="!isBuildingEnabled || isBuildingLoading" :loading="isBuildingLoading"
                            v-model="selectedBuilding" @change="onProvinceSelect2" item-text="text"
                            item-value="value" />
                    </v-col>

                    <v-col cols="5" sm="2">
                        <v-select :items="floor" label="ชั้น" outlined :disabled="!isFloorEnabled || isFloorLoading"
                            :loading="isFloorLoading" item-text="text" item-value="value" v-model="selectedFloor" />
                    </v-col>
                </v-row>

                <div v-if="isShowSvg">
                    <div v-show="isShowSvg" class="box-svg flex justify-center">
                        <!-- Render SVG ด้วย v-html -->
                        <div id="svg-container" class="max-w-[750px]" v-html="svgContent" @click="onZoneClick"></div>
                    </div>
                </div>
                <div v-else class="flex justify-center items-center h-64">
                    <div class="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-lg">
                        <h1 class="text-lg font-semibold">กรุณาเลือกฟอร์มก่อน</h1>
                    </div>
                </div>



                <p class="text-center mt-4" v-if="selectedZone">
                    ✅ คุณเลือกโซน: <strong>{{ selectedZone }}</strong>
                </p>
            </div>
        </div>
    </v-app>
</template>

<script>
import axios from 'axios'
import NavBar from '../NavBar.vue'
import SideBar from '../SideBar.vue'
import router from '@/router'

export default {
    data: () => ({
        province: ['กรุงเทพ', 'เชียงใหม่', 'หาดใหญ่', 'สงขลา', 'สระบุรี'],
        building: [],
        floor: [],
        selectedProvince: '',
        selectedBuilding: '',
        selectedFloor: '',
        isBuildingLoading: false,
        isBuildingEnabled: false,
        isFloorLoading: false,
        isFloorEnabled: false,
        isShowSvg: false,
        SvgName: '',
        svgContent: '', // เก็บเนื้อหา SVG
        selectedZone: '', // โซนที่ถูกคลิก
    }),
    components: { NavBar, SideBar },
    watch: {
        selectedBuilding() {
            this.updateSvgName()
        },
        selectedFloor() {
            this.updateSvgName()
        },
    },
    methods: {
        async updateSvgName() {
            if (this.selectedBuilding && this.selectedFloor) {
                this.SvgName = `${this.selectedBuilding}-${this.selectedFloor}`
                this.isShowSvg = true

                try {
                    const res = await fetch(`/svg/center-svg/${this.SvgName}.svg`)
                    this.svgContent = await res.text()
                } catch (err) {
                    console.error('โหลด SVG ไม่สำเร็จ:', err)
                    this.svgContent = '<p>ไม่พบแผนผัง</p>'
                }
            } else {
                this.isShowSvg = false
                this.svgContent = ''
            }
        },
        onZoneClick(event) {
            const zone = event.target.closest('[data-zone]')?.getAttribute('data-zone')
            if (zone) {
                this.selectedZone = zone
                console.log('คุณคลิกโซน: ', zone)

                const zoneRoutes = {
                    zoneA0: { name: 'zone/cnx-1-1-zoneA0', id: 'cnx-1-1-zoneA0' },
                    zoneA1: { name: 'zone/cnx-1-1-zoneA1', id: 'cnx-1-1-zoneA1' },
                    zoneA2: { name: 'zone/cnx-1-1-zoneA2', id: 'cnx-1-1-zoneA2' },
                    zoneA3: { name: 'zone/cnx-1-1-zoneA3', id: 'cnx-1-1-zoneA3' },
                    zoneA4: { name: 'zone/cnx-1-1-zoneA4', id: 'cnx-1-1-zoneA4' },
                }

                const route = zoneRoutes[this.selectedZone]
                if (route) {
                    router.push({
                        path: route.name,
                        // query: {
                        //     zone: route.id
                        // }
                    })
                }
            }
        },


        onProvinceSelect(province) {
            const provinceSlug = this.slugify(province)
            this.isBuildingEnabled = false
            this.isBuildingLoading = true
            this.building = []
            this.selectedBuilding = ''

            axios
                .get(`http://localhost:3000/branch/?building=${provinceSlug}`)
                .then((res) => {
                    this.building = res.data.data.map(item => ({
                        text: item.name,
                        value: item.slug
                    }))
                    this.isBuildingEnabled = true
                })
                .catch((err) => {
                    console.error('Error:', err)
                    this.building = []
                    this.isBuildingEnabled = false
                })
                .finally(() => {
                    this.isBuildingLoading = false
                })
        },
        onProvinceSelect2() {
            const buildingSlug = this.selectedBuilding
            axios
                .get(`http://localhost:3000/building/?floor=${buildingSlug}`)
                .then((res) => {
                    this.floor = res.data.data.map(item => ({
                        text: item.name,
                        value: item.slug,
                    }))
                    this.isFloorEnabled = true
                })
                .catch((err) => {
                    console.error('โหลดชั้นไม่สำเร็จ:', err)
                    this.floor = []
                    this.isFloorEnabled = false
                })
                .finally(() => {
                    this.isFloorLoading = false
                })
        },
        slugify(name) {
            if (name === 'เชียงใหม่') return 'cnx'
            if (name === 'กรุงเทพ') return 'bkk'
            if (name === 'ขอนแก่น') return 'kkc'
            if (name === 'สงขลา') return 'hdy'
            if (name === 'สระบุรี') return 'sri'
            return name
        }
    }
}
</script>

<style>
.box {
    width: 100%;
}

#svg-container svg [data-zone] {
    cursor: pointer;
    transition: fill 0.3s;
}

#svg-container svg [data-zone]:hover {
    fill: #90caf9;
}
</style>
