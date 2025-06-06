<template>
  <v-container class="mt-10">
    <v-row justify="center" align="stretch" class="mb-6" dense>
      <!-- Location Selector Card -->
      <v-col cols="12" md="7">
        <v-card class="pa-6 d-flex flex-column" outlined>
          <v-card-title class="headline green--text pb-4">
            กรุณาเลือกข้อมูลที่ต้องการ
          </v-card-title>

          <LocationSelector
            :provinces="provinces"
            :buildings="buildings"
            :floors="floors"
            :selectedProvince="selectedProvince"
            :selectedBuilding="selectedBuilding"
            :selectedFloor="selectedFloor"
            :isLoading="isLoading"
            :canSubmit="canSubmit"
            @update:selectedProvince="onProvinceChange"
            @update:selectedBuilding="onBuildingChange"
            @update:selectedFloor="onFloorChange"
            @submit="onSubmit"
          />

          <div
            v-if="svgUrl"
            class="mt-6"
            style="flex-grow: 1; width: 100%; border: 1px solid #ccc; border-radius: 8px;"
          >
           <FloorMap
            :svgContent="svgUrl"
            :highlightedSeat="selectedSeatId" 
            @zone-click="onZoneClick"
          />

          </div>
        </v-card>
      </v-col>

      <!-- Employee Search Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-6 d-flex flex-column" outlined>
          <v-card-title class="headline green--text pb-4">
            ค้นหารหัสพนักงาน
          </v-card-title>

          <EmployeeSearch
            :isLoading="isLoading"
            @search-result="handleSearchResult"
            @view-seat-zone="highlightSeatZone"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LocationSelector from '@/components/homepage/LocationSelector.vue'
import FloorMap from '@/components/homepage/FloorMap.vue'
import EmployeeSearch from '@/components/homepage/EmployeeSearch.vue'

export default {
  components: {
    LocationSelector,
    FloorMap,
    EmployeeSearch,
  },
  data() {
    return {
      provinces: [
        { name: 'เชียงใหม่', key: 'cnx' },
        { name: 'กรุงเทพ', key: 'bkk' },
        { name: 'ขอนแก่น', key: 'kkc' },
        { name: 'หาดใหญ่', key: 'hdy' },
        { name: 'สระบุรี', key: 'sri' },
      ],
      selectedProvince: null,
      selectedBuilding: null,
      selectedFloor: null,

      buildings: [],
      floors: [],

      isLoading: false,
      svgUrl: null,
      selectedSeatId: null,
    }
  },
  computed: {
    canSubmit() {
      return this.selectedProvince && this.selectedBuilding && this.selectedFloor
    }
  },
  methods: {
    async onProvinceChange(newVal) {
      this.selectedProvince = newVal
      this.selectedBuilding = null
      this.selectedFloor = null
      this.buildings = []
      this.floors = []
      this.svgUrl = null
      if (newVal) {
        await this.loadBuildings()
      }
    },

    async onBuildingChange(newVal) {
      this.selectedBuilding = newVal
      this.selectedFloor = null
      this.floors = []
      this.svgUrl = null
      if (newVal) {
        await this.loadFloors()
      }
    },

    onFloorChange(newVal) {
      this.selectedFloor = newVal
      this.svgUrl = null
    },

    async loadBuildings() {
      this.isLoading = true
      try {
        const res = await fetch(`http://localhost:3000/branch/?building=${this.selectedProvince}`)
        const json = await res.json()
        if (json.success) {
          this.buildings = json.data
        } else {
          this.buildings = []
        }
      } catch (e) {
        console.error('โหลดตึกล้มเหลว:', e)
        this.buildings = []
      } finally {
        this.isLoading = false
      }
    },

    async loadFloors() {
      this.isLoading = true
      try {
        const res = await fetch(`http://localhost:3000/building/?floor=${this.selectedBuilding}`)
        const json = await res.json()
        if (json.success) {
          this.floors = json.data
        } else {
          this.floors = []
        }
      } catch (e) {
        console.error('โหลดชั้นล้มเหลว:', e)
        this.floors = []
      } finally {
        this.isLoading = false
      }
    },

    async onSubmit() {
      if (!this.canSubmit) return
      this.isLoading = true
      this.svgUrl = null

      try {
        const fileName = `${this.selectedProvince}_${this.selectedBuilding}_${this.selectedFloor}.svg`
        const res = await fetch(`/svg/${fileName}`)
        if (!res.ok) throw new Error('ไฟล์ SVG ไม่พบ')
        const svgText = await res.text()
        this.svgUrl = svgText
      } catch (e) {
        console.error('โหลด SVG ไม่ได้:', e)
        this.svgUrl = null
        alert('ไม่พบแผนผังที่เลือก')
      } finally {
        this.isLoading = false
      }
    },

    onZoneClick(zoneId) {
      this.$router.push({ name: 'ZoneDetail', params: { zoneId } })
    },

    handleSearchResult(employee) {
      console.log('ค้นหาเจอ:', employee)
    },

    highlightSeatZone(employee) {
      console.log('จะเน้นที่นั่งของ:', employee)
      this.selectedSeatId = employee.seatId || 'A1'
    },

    viewSeatZone() {
      if (this.employee) {
        console.log('viewSeatZone clicked', this.employee)
        this.$emit('view-seat-zone', this.employee)
      }
    }
  }
}
</script>
