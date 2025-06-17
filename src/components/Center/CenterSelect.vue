<template>
  <v-app>
   
      <div class="d-flex">
        <div class="flex-1 min-h-screen bg-gray-50 ">
          <NavBar />

          <!-- แสดงชื่อ SVG -->
          <h2 class="text-center text-xl font-semibold text-gray-700 my-4">
            {{ SvgName }}
          </h2>

          <!-- แถว dropdown จังหวัด / ตึก / ชั้น -->
          <v-row class="justify-center gap-4 mb-6">
            <v-col cols="12" sm="3">
              <v-select
                :items="province"
                label="จังหวัด"
                outlined
                v-model="selectedProvince"
                @change="onProvinceSelect"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <v-select
                :items="building"
                label="ตึก"
                outlined
                v-model="selectedBuilding"
                :disabled="!isBuildingEnabled || isBuildingLoading"
                :loading="isBuildingLoading"
                item-text="text"
                item-value="value"
                @change="onProvinceSelect2"
              />
            </v-col>

            <v-col cols="12" sm="3">
              <v-select
                :items="floor"
                label="ชั้น"
                outlined
                v-model="selectedFloor"
                :disabled="!isFloorEnabled || isFloorLoading"
                :loading="isFloorLoading"
                item-text="text"
                item-value="value"
              />
            </v-col>
          </v-row>

          <!-- ช่องค้นหา -->
          <v-row justify="center" class="mb-6">
            <v-col cols="12" sm="6">
              <v-card class="p-4">
                <v-text-field label="Search Employee ID" outlined dense />
                <v-row justify="center" class="mt-2">
                  <v-btn color="primary" tile>
                    <v-icon left>fas fa-search</v-icon>
                    Search
                  </v-btn>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- แสดง SVG หรือแจ้งเตือน -->
          <div class="flex justify-center">
            <div v-if="isShowSvg" class="box-svg max-w-4xl p-4 bg-white rounded-lg shadow-md">
              <div id="svg-container" v-html="svgContent" @click="onZoneClick"></div>
            </div>

            <div v-else class="flex items-center justify-center h-64 bg-red-100 text-red-800 px-6 py-4 rounded-xl shadow-md">
              <h1 class="text-lg font-semibold">กรุณาเลือกฟอร์มก่อน</h1>
            </div>
          </div>

          <!-- แสดงโซนที่เลือก -->
          <p class="text-center mt-6 text-green-600 font-medium" v-if="selectedZone">
            ✅ คุณเลือกโซน: <strong>{{ selectedZone }}</strong>
          </p>
        </div>
      </div>
   
  </v-app>
</template>



<script>
import axios from 'axios'
import NavBar from '../NavBar.vue'

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
    components: { NavBar,  },
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
            console.log("buildingSlug : ",buildingSlug)
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

.box-svg {
  max-width: 750px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}


#svg-container svg [data-zone] {
    cursor: pointer;
    transition: fill 0.3s;
}

#svg-container svg [data-zone]:hover {
    fill: #90caf9;
}
</style>
