<template>
  <div
    class="svg-wrapper"
    ref="svgContainer"
    v-html="svgContent"
    @click="onSvgClick"
  ></div>
</template>

<script>
export default {
  props: {
    svgContent: String,
    highlightedSeat: String // 👈 รับค่า seat ที่จะเน้น
  },
  watch: {
    svgContent() {
      this.$nextTick(() => {
        this.highlightSeat(this.highlightedSeat)
      })
    },
    highlightedSeat(newSeatId) {
      this.highlightSeat(newSeatId)
    }
  },
  methods: {
    onSvgClick(event) {
      const target = event.target
      if (target && target.id && target.id.startsWith('zone')) {
        this.$emit('zone-click', target.id)
      }
    },
    highlightSeat(seatId) {
      const container = this.$refs.svgContainer
      if (!container || !seatId) return

      // ลบไฮไลต์เก่าทั้งหมดก่อน
      container.querySelectorAll('rect').forEach(el => {
        el.style.stroke = ''
        el.style.strokeWidth = ''
      })

      // หา element แล้วไฮไลต์
      const seatEl = container.querySelector(`#${seatId}`)
      if (seatEl) {
        seatEl.style.stroke = 'red'
        seatEl.style.strokeWidth = '4'
        seatEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
  overflow: auto;
  display: block;
}

.svg-wrapper svg {
  width: 100%;
  height: auto;
  max-height: 600px;
  display: block;
}

/* Hover effect สำหรับที่นั่งที่มี id เริ่มด้วย "zone" */
.svg-wrapper rect[id^="zone"]:hover {
  cursor: pointer;
  opacity: 0.8;
  stroke-width: 3;
  stroke: #333;
}
</style>
