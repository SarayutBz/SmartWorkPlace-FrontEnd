<template>
    <v-app>
        <div class="flex">
            <SideBar />
            <div class="box">
                <NavBar />

                <v-row class="m-2">
                    <v-col cols="12" sm="6">
                        <v-select :items="province" label="จังหวัด" outlined v-model="selectedProvince"
                            @change="onProvinceSelect"></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                        <!-- <v-select :items="building" label="ตึก" outlined
                            :disabled="!isBuildingEnabled || isBuildingLoading" :loading="isBuildingLoading"
                            v-model="selectedBuilding" @change="onProvinceSelect2"></v-select> -->
                        <v-select :items="building" label="ตึก" outlined
                            :disabled="!isBuildingEnabled || isBuildingLoading" :loading="isBuildingLoading"
                            v-model="selectedBuilding" @change="onProvinceSelect2" item-text="text"
                            item-value="value" />

                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-select :items="floor" label="ชั้น" outlined :disabled="!isFloorEnabled || isFloorLoading"
                            :loading="isFloorLoading"></v-select>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-app>
</template>

<script>
import axios from 'axios'
import NavBar from '../NavBar.vue'
import SideBar from '../SideBar.vue'

export default {
    data: () => ({
        province: ['กรุงเทพ', 'เชียงใหม่', 'หาดใหญ่', 'สงขลา', 'สระบุรี'],
        building: [],
        floor: [],
        selectedProvince: '',
        selectedBuilding: '',
        isBuildingLoading: false,
        isBuildingEnabled: false,
        isFloorLoading: false,
        isFloorEnabled: false,
    }),
    components: {
        NavBar,
        SideBar,
    },
    methods: {
        onProvinceSelect(province) {
            const provinceSlug = this.slugify(province)

            this.isBuildingEnabled = false
            this.isBuildingLoading = true
            this.building = []
            this.selectedBuilding = ''

            axios
                .get(`http://localhost:3000/branch/?building=${provinceSlug}`)
                .then((res) => {

                    // this.building = res.data.data
                    this.building = res.data.data.map(item => ({
                        text: item.name,
                        value: item.slug
                    }))

                    this.isBuildingEnabled = true
                    // console.log(res.data)

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
            // console.log(buildingSlug)
            axios
                .get(`http://localhost:3000/building/?floor=${buildingSlug}`)
                .then((res) => {
                    this.floor = res.data.data || []
                    this.isFloorEnabled = true
                })
                .catch((err) => {
                    console.error('โหลดชั้นไม่สำเร็จ:', err)
                    this.floor = []
                    this.isFloorEnabled = true
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
        },

    },
}
</script>

<style>
.box {
    width: 100%;
}
</style>
