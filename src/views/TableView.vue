<template>
    
    <div class="flex">
    
       
        <div class="box">
            <NavBar />

            <TableEmployees />


        </div>
    </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue';
// import TableEmployees from '@/components/TableEmployees.vue';
import TableEmployees from '@/components/Dashboard/TableEmployees.vue';
export default {
    components: {
        TableEmployees,

        NavBar
    }
}
</script>

<style scoped>
.box {
    width: 100%;
}
</style>