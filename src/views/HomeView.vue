<template>
    <div>
        <NavBar />
        <div class="m-5">
            <tableView :users="userList" />
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import tableView from "@/components/tableView.vue";

export default {
    components: {
        tableView,
        NavBar,
    },
    data() {
        return {
            userList: [
                {
                    createdAt: "2025-05-29T09:54:42.188Z",
                    fname: "Anastasia",
                    lname: "Stokes",
                    age: 93,
                    phone: "phone 1",
                    position: "9060",
                    department: "Toys",
                    salary: 13,
                    imageUrl: "https://picsum.photos/seed/ZFLvDM/1786/496",
                    id: "1",
                },
                {
                    createdAt: "2025-05-29T17:32:42.227Z",
                    fname: "Christa",
                    lname: "Zboncak",
                    age: 99,
                    phone: "phone 2",
                    position: "411",
                    department: "Health",
                    salary: 4,
                    imageUrl: "https://picsum.photos/seed/8cxav/1557/3321",
                    id: "2",
                },
                {
                    createdAt: "2025-05-29T21:58:36.237Z",
                    fname: "Adelle",
                    lname: "Bernhard",
                    age: 57,
                    phone: "phone 3",
                    position: "8074",
                    department: "Beauty",
                    salary: 94,
                    imageUrl: "https://picsum.photos/seed/QGFb6x/3400/2645",
                    id: "3",
                },
                {
                    createdAt: "2025-05-29T14:07:25.691Z",
                    fname: "Nelle",
                    lname: "Steuber",
                    age: 4,
                    phone: "phone 4",
                    position: "70616",
                    department: "Sports",
                    salary: 38,
                    imageUrl: "https://picsum.photos/seed/Dr77nuN/1359/2397",
                    id: "4",
                },
                {
                    createdAt: "2025-05-29T08:50:04.765Z",
                    fname: "Eileen",
                    lname: "Ward-Johnson",
                    age: 4,
                    phone: "phone 5",
                    position: "10737",
                    department: "Jewelry",
                    salary: 44,
                    imageUrl: "https://loremflickr.com/2243/2203?lock=1193403555963259",
                    id: "5",
                },
                {
                    createdAt: "2025-05-29T18:33:35.978Z",
                    fname: "Ocie",
                    lname: "Koch",
                    age: 50,
                    phone: "phone 6",
                    position: "385",
                    department: "Jewelry",
                    salary: 65,
                    imageUrl: "https://picsum.photos/seed/bAb04J/1056/3708",
                    id: "6",
                },
                {
                    createdAt: "2025-05-29T16:16:07.858Z",
                    fname: "Jaylon",
                    lname: "Stoltenberg",
                    age: 70,
                    phone: "phone 7",
                    position: "450",
                    department: "Beauty",
                    salary: 5,
                    imageUrl: "https://picsum.photos/seed/SefSlXqA/1677/3598",
                    id: "7",
                },
                {
                    createdAt: "2025-05-29T23:33:04.315Z",
                    fname: "Jaleel",
                    lname: "Koch",
                    age: 34,
                    phone: "phone 8",
                    position: "88189",
                    department: "Movies",
                    salary: 31,
                    imageUrl: "https://picsum.photos/seed/RIm11IMPj/3842/1709",
                    id: "8",
                },
                {
                    createdAt: "2025-05-29T11:42:27.400Z",
                    fname: "Odell",
                    lname: "Waelchi",
                    age: 33,
                    phone: "phone 9",
                    position: "8726",
                    department: "Toys",
                    salary: 35,
                    imageUrl: "https://picsum.photos/seed/s7Xju/484/2755",
                    id: "9",
                },
                {
                    createdAt: "2025-05-29T09:14:50.848Z",
                    fname: "Kristy",
                    lname: "Macejkovic",
                    age: 10,
                    phone: "phone 10",
                    position: "266",
                    department: "Clothing",
                    salary: 31,
                    imageUrl: "https://picsum.photos/seed/RJAvgRgcsq/818/333",
                    id: "10",
                },
            ],
        };
    },
};
</script>

<style></style>
