<template>
  <div>
    <!-- ส่วนที่ 1: Dropdown เลือกจังหวัด ตึก ชั้น -->
    <v-card class="pa-4 mb-4" outlined>
      <v-row dense align="center" justify="space-between">
        <v-col cols="12" md="3">
          <v-select
            v-model="localSelectedProvince"
            :items="provinces"
            label="จังหวัด"
            item-text="name"
            item-value="key"
            outlined
            dense
            :disabled="isLoading"
            clearable
            :search-input.sync="provinceSearch"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="localSelectedBuilding"
            :items="buildings"
            label="ตึก"
            item-text="name"
            item-value="slug"
            outlined
            dense
            :disabled="!buildings.length || isLoading"
            clearable
            :search-input.sync="buildingSearch"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="localSelectedFloor"
            :items="floors"
            label="ชั้น"
            item-text="name"
            item-value="slug"
            outlined
            dense
            :disabled="!floors.length || isLoading"
            clearable
            :search-input.sync="floorSearch"
          />
        </v-col>

        <v-col cols="12" md="2" class="d-flex align-center">
          <v-btn
            color="green"
            class="white--text"
            :disabled="!canSubmit || isLoading"
            @click="$emit('submit')"
            block
            height="56px"
          >
            ตกลง
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    provinces: Array,
    buildings: Array,
    floors: Array,
    selectedProvince: String,
    selectedBuilding: String,
    selectedFloor: String,
    isLoading: Boolean,
    canSubmit: Boolean,
  },
  emits: [
    'update:selectedProvince',
    'update:selectedBuilding',
    'update:selectedFloor',
    'submit',
  ],
  data() {
    return {
      localSelectedProvince: this.selectedProvince,
      localSelectedBuilding: this.selectedBuilding,
      localSelectedFloor: this.selectedFloor,

      provinceSearch: '',
      buildingSearch: '',
      floorSearch: '',
    }
  },
  watch: {
    localSelectedProvince(newVal) {
      this.$emit('update:selectedProvince', newVal)
    },
    localSelectedBuilding(newVal) {
      this.$emit('update:selectedBuilding', newVal)
    },
    localSelectedFloor(newVal) {
      this.$emit('update:selectedFloor', newVal)
    },
    selectedProvince(newVal) {
      this.localSelectedProvince = newVal
    },
    selectedBuilding(newVal) {
      this.localSelectedBuilding = newVal
    },
    selectedFloor(newVal) {
      this.localSelectedFloor = newVal
    },
  }
}
</script>
