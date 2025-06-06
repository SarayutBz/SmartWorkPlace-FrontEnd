<template>
  <div class="svg-wrapper" v-html="svgContent" @click="onSvgClick"></div>
</template>

<script>
export default {
  props: {
    svgContent: String
  },
  methods: {
    onSvgClick(event) {
      const target = event.target
      if (target && target.id && target.id.startsWith('zone')) {
        this.$emit('zone-click', target.id)
      }
    }
  }
}
</script>

<style>
.svg-wrapper {
  max-width: 100%;
  max-height: 600px;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow: hidden;
  display: block;
}

.svg-wrapper svg {
  width: 100%;
  height: auto;
  max-height: 600px;
  display: block;
}

/* ทำงานเฉพาะ rect ที่ id เริ่มต้นด้วย "zone" */
.svg-wrapper rect[id^="zone"]:hover {
  cursor: pointer;
  opacity: 0.8;
  stroke-width: 3;
  stroke: #333;
}
</style>

