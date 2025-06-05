<template>
    
    <div class="flex">
    
        <SideBar />
        <div class="box">
            <NavBar />

            <TableEmployees />


        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import NavBar from '@/components/NavBar.vue';
// import TableEmployees from '@/components/TableEmployees.vue';
import TableEmployees from '@/components/Dashboard/TableEmployees.vue';
export default {
    components: {
        TableEmployees,
        SideBar,
        NavBar
    }
}
</script>

<style scoped>
.box {
    width: 100%;
}
</style>