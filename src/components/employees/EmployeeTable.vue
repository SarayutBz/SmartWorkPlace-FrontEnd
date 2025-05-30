<template>
  <v-container>
    <!-- หัวข้อของหน้า -->
    <h2 class="mb-4">ตารางรายชื่อพนักงาน</h2>

    <!-- ตารางแสดงข้อมูลพนักงาน -->
    <v-data-table
      :headers="headers"      
      :items="employees"        
      class="elevation-1"       
      item-value="id"            
      @click:row="showPopup"    
    >
      <!-- คอลัมน์รูปภาพ: แสดงเป็น Avatar -->
      <template slot="item.image" slot-scope="{ item }">
        <v-avatar size="48">
          <v-img :src="item.image"></v-img>
        </v-avatar>
      </template>
    </v-data-table>

    <!-- Pop-up dialog แสดงข้อมูลพนักงานเมื่อคลิก -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          ข้อมูลพนักงาน
        </v-card-title>
              <v-card-text>
          <v-row align="center">
            <!-- รูปภาพพนักงานทางซ้าย -->
             <!-- ใช้ระบบ grid ของ vuetify -->
            <v-col cols="4"> 
              <v-avatar size="100">
                <v-img :src="selected.image"></v-img>
              </v-avatar>
            </v-col>

            <!-- ข้อมูลพนักงานทางขวา -->
            <v-col cols="8">
              <div><strong>ชื่อ:</strong> {{ selected.name }}</div>
              <div><strong>อายุ:</strong> {{ selected.age }}</div>
              <div><strong>เพศ:</strong> {{ selected.gender }}</div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <!-- ปุ่มปิด popup -->
          <v-btn color="green" text @click="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// ดึงข้อมูล mock พนักงานจากไฟล์ JSON
import data from "@/assets/mock/mock-data.json";

export default {
  name: "HelloWorld",
  data() {
    return {
      // เก็บข้อมูลพนักงาน (จะนำมาใส่จาก mock data)
      employees: [],
      // กำหนดหัวตารางสำหรับ v-data-table
      headers: [
        { text: "รูป", value: "image", sortable: false },
        { text: "ชื่อ", value: "name" },
        { text: "อายุ", value: "age" },
        { text: "เพศ", value: "gender" }
      ],
      // ใช้ควบคุมการเปิด/ปิด popup dialog
      dialog: false,
      // เก็บข้อมูลพนักงานที่ถูกคลิกเพื่อแสดงใน popup
      selected: {}
    };
  },
  created() {
    // เมื่อตัว component ถูกสร้าง ให้โหลดข้อมูลพนักงานเข้ามา
    this.employees = data;
  },
  methods: {
    // เมื่อคลิกที่แถวในตาราง ให้เปิด dialog พร้อมกำหนดข้อมูลที่เลือกไว้
    showPopup(item) {
      this.selected = item;
      this.dialog = true;
    }
  }
};
</script>
