<template>
  <div ref="svgContainer" v-html="svgContent"></div>
</template>

<script>
export default {
  props: ['svgContent', 'occupiedTables'],
  data() {
    return {
      selectedTableId: null,
    }
  },
  watch: {
    svgContent: {
      immediate: true,
      handler() {
        this.attachClickHandlers()
      }
    },
    occupiedTables() {
      this.updateHighlight()
    }
  },
 methods: {
  attachClickHandlers() {
    this.$nextTick(() => {
      const container = this.$refs.svgContainer
      if (!container) return

      const tableGroups = container.querySelectorAll('[id^="table"]')

      tableGroups.forEach(group => {
        group.style.cursor = 'pointer'

        group.onclick = () => {
          this.selectedTableId = group.id
          this.updateHighlight()
          this.$emit('table-click', group.id)
        }

        group.onmouseenter = () => {
          if (!this.occupiedTables || !this.occupiedTables.includes(group.id)) {
            group.querySelectorAll('rect').forEach(rect => {
              rect.style.fill = '#ADD8E6' // ฟ้าอ่อนตอน hover
            })
          }
        }

        group.onmouseleave = () => {
          this.updateHighlight()
        }
      })

      this.updateHighlight()
    })
  },

  updateHighlight() {
    const container = this.$refs.svgContainer
    if (!container) return

    const tableGroups = container.querySelectorAll('[id^="table"]')

    tableGroups.forEach(group => {
      const isOccupied = this.occupiedTables?.includes(group.id)
      const isSelected = group.id === this.selectedTableId

      let fillColor = '#D9D9D9' // default = ว่าง
      let opacity = '1'

      if (isOccupied) {
        fillColor = '#88CC88' // จองแล้ว
      }

      if (isSelected) {
        opacity = '0.85' // ทึบแสง
      }

      group.querySelectorAll('rect').forEach(rect => {
        rect.style.fill = fillColor
        rect.style.opacity = opacity
      })

      // ตำแหน่งติ๊กถูก
      const firstRect = group.querySelector('rect')
      if (!firstRect) return

      const x = parseFloat(firstRect.getAttribute('x')) || 0
      const y = parseFloat(firstRect.getAttribute('y')) || 0
      const width = parseFloat(firstRect.getAttribute('width')) || 0
      const height = parseFloat(firstRect.getAttribute('height')) || 0

      const checkmarkX = x + width / 2
      const checkmarkY = y + height / 2 + 5

      let checkmark = group.querySelector('.checkmark')
      if (isSelected) {
        if (!checkmark) {
          checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'text')
          checkmark.classList.add('checkmark')
          checkmark.setAttribute('text-anchor', 'middle')
          checkmark.setAttribute('x', checkmarkX)
          checkmark.setAttribute('y', checkmarkY)
          checkmark.setAttribute('fill', '#000')
          checkmark.setAttribute('font-size', '16')
          checkmark.style.pointerEvents = 'none'
          checkmark.textContent = '✔'
          group.appendChild(checkmark)
        } else {
          checkmark.setAttribute('x', checkmarkX)
          checkmark.setAttribute('y', checkmarkY)
        }
      } else {
        if (checkmark) {
          checkmark.remove()
        }
      }
    })
  }
}

}
</script>
