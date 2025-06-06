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

          // 👉 hover effect เฉพาะโต๊ะที่ว่าง
          group.onmouseenter = () => {
            if (!this.occupiedTables.includes(group.id)) {
              group.querySelectorAll('rect').forEach(rect => {
                rect.style.fill = '#ADD8E6' // สีฟ้าอ่อนตอน hover
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

        // set สีและ opacity ให้ rect ทุกอันใน group
        group.querySelectorAll('rect').forEach(rect => {
        rect.style.fill = fillColor
        rect.style.opacity = opacity
        })

        // หา rect ตัวแรกเพื่อใช้คำนวณตำแหน่งติ้กถูก
        const firstRect = group.querySelector('rect')
        if (!firstRect) return

        // คำนวณตำแหน่งติ้กถูก ให้อยู่กลาง rect
        const x = parseFloat(firstRect.getAttribute('x')) || 0
        const y = parseFloat(firstRect.getAttribute('y')) || 0
        const width = parseFloat(firstRect.getAttribute('width')) || 0
        const height = parseFloat(firstRect.getAttribute('height')) || 0

        const checkmarkX = x + width / 2
        const checkmarkY = y + height / 2 + 5 // +5 เพื่อปรับแนวตั้งให้อยู่กึ่งกลางพอดี

        // เพิ่มหรือลบติ้กถูก
        let checkmark = group.querySelector('.checkmark')
        if (isSelected) {
        if (!checkmark) {
            checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            checkmark.classList.add('checkmark')
            checkmark.setAttribute('text-anchor', 'middle') // ให้อยู่กึ่งกลางแนวนอน
            checkmark.setAttribute('x', checkmarkX)
            checkmark.setAttribute('y', checkmarkY)
            checkmark.setAttribute('fill', '#000') // สีดำ
            checkmark.setAttribute('font-size', '16')
            checkmark.style.pointerEvents = 'none'

            checkmark.textContent = '✔'

            group.appendChild(checkmark)
        } else {
            // ถ้ามีอยู่แล้วก็อัพเดตตำแหน่ง (กรณี svg เปลี่ยน)
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
