<template>
    <title>Affiliate Report</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header" style="margin-bottom: -25px;">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Affiliate Report</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Dashboard</LazyNuxtLink>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content">
                <div class="container-fluid">
                    <div class="page_top my-2">
                        <div class="row justify-content-between align-items-center my-2">
                            <div class="col-md-11">
                                <div class="row">
                                    <div class="col-lg-6 col-md-8 col-sm-12 mb-2">
                                        <input type="text" v-model="searchQuery" class="form-control"
                                            placeholder="Search by email..." />
                                    </div>


                                    <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                        <button @click="filterData()" class="btn btn-primary w-100">
                                            Filter
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- table section start here  -->
                    <div class="card">
                        <!-- /.card-header -->
                        <div class="card-body table-responsive p-0">
                            <div class="filter_options">
                                <div class="loading-indicator" v-if="loading" style="text-align: center">
                                    <Loader />
                                </div>
                            </div>

                            <center v-if="resonseDataOne.length > 0"><span><b>Total Number of Users ({{ total }})<br/>Leve-1 ({{ level_1_count }})</b></span></center>
                            <table class="table table-bordered w-100 table-striped table-hover able-wrapper" v-if="resonseDataOne.length > 0">
                                <thead>
                                    <tr>
                                        <th>Register Date</th>
                                        <th>Name</th>
                                        <th>Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="level in resonseDataOne" :key="level.id">
                                        <td>{{ formatDate(level.created_at) }}</td>
                                        <td>{{ level.name }}</td>
                                        <!-- <td>{{ level.email }}</td> -->
                                        <td>{{ level.level_commision }} UIC</td>

                                    </tr>
                                    <!-- Add more rows as needed -->
                                </tbody>
                            </table>
                            <center v-if="resonseDataTwo.length > 0"><span><b>Leve-2 ({{ level_2_count }})</b></span></center>
                            <table class="table table-bordered w-100 table-striped table-hover able-wrapper" v-if="resonseDataTwo.length > 0">
                                <thead>
                                    <tr>
                                        <th>Register Date</th>
                                        <th>Name</th>
                                        <th>Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="level in resonseDataTwo" :key="level.id">
                                        <td>{{ formatDate(level.created_at) }}</td>
                                        <td>{{ level.name }}</td>
                                        <!-- <td>{{ level.email }}</td> -->
                                        <td>{{ level.level_commision }} UIC</td>

                                    </tr>
                                    <!-- Add more rows as needed -->
                                </tbody>
                            </table>
                            <center v-if="resonseDataThree.length > 0"><span><b>Leve-3 ({{ level_3_count }})</b></span></center>
                            <table class="table table-bordered w-100 table-striped table-hover able-wrapper" v-if="resonseDataThree.length > 0">
                                <thead>
                                    <tr>
                                        <th>Register Date</th>
                                        <th>Name</th>
                                        <th>Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="level in resonseDataThree" :key="level.id">
                                        <td>{{ formatDate(level.created_at) }}</td>
                                        <td>{{ level.name }}</td>
                                        <!-- <td>{{ level.email }}</td> -->
                                        <td>{{ level.level_commision }} UIC</td>

                                    </tr>
                                    <!-- Add more rows as needed -->
                                </tbody>
                            </table>

                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- table section end here  -->
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

import Swal from "sweetalert2";

definePageMeta({
    middleware: "is-logged-out",
});

const router = useRouter();
const loading = ref(false);
const searchQuery = ref(""); 
const level_1_count = ref(0); 
const level_2_count = ref(0); 
const level_3_count = ref(0); 
const total = ref(0); 

// Define a method to handle editing
const resonseDataOne = ref([]);
const resonseDataTwo = ref([]);
const resonseDataThree = ref([]);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        // hour: '2-digit',
        // minute: '2-digit',
        // second: '2-digit',
        hour12: false
    });
}


const filterData = async () => {

    const email = searchQuery.value; 
    try {
        loading.value = true;
        const response = await axios.get(`/user/checkLevelHistorys`, {
        params: {
            email: email,
        }
    });
        resonseDataOne.value = response.data.level_1;
        resonseDataTwo.value = response.data.level_2;
        resonseDataThree.value = response.data.level_2;
        level_1_count.value = response.data.level_1_count;
        level_2_count.value = response.data.level_2_count;
        level_3_count.value = response.data.level_3_count;
        total.value = response.data.total;
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading.value = false;
    }
};


</script>


<style>
.pagination {
    display: inline-block;
    text-align: center;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #2f2f2f;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination button:hover {
    background-color: #0056b3;
}

.pagination button[disabled] {
    background-color: #6c757d;
    cursor: not-allowed;
}

.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 0.5rem;
}

.btnSize {
    font-size: 12px;
    padding: 3px;
}

/* Table */
.table-wrapper {
    width: 100%;
    /* max-width: 500px; */
    overflow-x: auto;
}

.table td,
.table th {
    padding: 0.2rem;
    vertical-align: top;
    border-top: 1px solid #dae2ea;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 1px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr:hover {
    background-color: rgb(221, 221, 221);
}
</style>