<template>
    <title>Games Translate</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Game List Translate</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                                </li>

                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-sm-12 mb-2">
                                    <input type="text" v-model="searchQuery" class="form-control"
                                        placeholder="Search By Name" />
                                </div>


                                <div class="col-lg-2">
                                    <input type="text" v-model="searchGameCode" class="form-control"
                                        placeholder="Search By Game Code" />
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                    <select v-model="filter_language" class="form-control" @change="filterData">
                                        <option value="">All</option>
                                        <option v-for="gtype in selectedLanguages" :key="gtype.id" :value="gtype.code">
                                            {{ gtype.name }}
                                        </option>
                                    </select>
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                    <select v-model="selectedFilter" class="form-control" @change="filterData">
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>

                                <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                                    <button @click="filterData()" class="btn btn-primary w-100">Filter</button>
                                </div>
                            </div>

                            <br />

                            <div class="card">
                                <div class="loading-indicator" v-if="loading" style="text-align: center;">
                                    <Loader />
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">

                                            Total Records:: {{ totalRecords }}
                                              
                                            <table class="table w-100 table-wrapper">
                                                <thead>
                                                    <tr>
                                                        <th class="text-left">Name</th>
                                                        <th class="text-center">Language Code</th>
                                                        <th class="text-center">Status</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in productdata" :key="item.id" @click="edit(item)">
                                                        <td class="text-left">{{ item.name }}  <span class="badge bg-dark">[{{ item.game_code }}]</span></td>
                                                        <td class="text-center">{{ item.language }}</td>
                                                        <td class="text-center">{{ item.status }} </td>
                                                        <td class="text-center">
                                                            <button type="button"><i class="fas fa-edit"
                                                                    @click="edit(item)"></i></button>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th class="text-left">Name</th>
                                                        <th class="text-center">Language Code</th>
                                                        <th class="text-center">Status</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </tfoot>
                                            </table>

                                            <center>
                                                <div class="pagination" style="text-align: center">
                                                    <button :disabled="currentPage === 1"
                                                        @click="fetchData(currentPage - 1)">
                                                        Previous
                                                    </button>
                                                    <template v-for="pageNumber in displayedPages" :key="pageNumber">
                                                        <button @click="fetchData(pageNumber)">
                                                            {{ pageNumber }}
                                                        </button>
                                                    </template>
                                                    <button :disabled="currentPage === totalPages"
                                                        @click="fetchData(currentPage + 1)">
                                                        Next
                                                    </button>
                                                </div>
                                            </center>

                                        </div>


                                        <div class="col-md-4">
                                            <div class="card">
                                                <h5 class="card-header">Add Language</h5>
                                                <div class="card-body">
                                                    <!-- Start -->
                                                    <form @submit.prevent="saveData()" id="formrest"
                                                        class="forms-sample" enctype="multipart/form-data">

                                                        <div class="row mb-3 required">
                                                            <label for="input-name-1"
                                                                class="col-sm-2 col-form-label required-label">Language</label>
                                                            <div class="col-sm-10">
                                                                <select v-model="insertdata.langauge"
                                                                    class="form-control">
                                                                    <option value="">Select</option>
                                                                    <option v-for="gtype in selectedLanguages"
                                                                        :key="gtype.id" :value="gtype.code">
                                                                        {{ gtype.name }}
                                                                    </option>
                                                                </select>
                                                                <span class="text-danger" v-if="errors.langauge">{{
                                                                    errors.langauge[0] }}</span>
                                                            </div>
                                                        </div>



                                                        <div class="row mb-3 required">
                                                            <label for="input-name-1"
                                                                class="col-sm-2 col-form-label required-label">Name</label>
                                                            <div class="col-sm-10">
                                                                <input type="text" name="name" placeholder="Name"
                                                                    v-model="insertdata.name" class="form-control" />
                                                                <input type="hidden" name="id" id="id"  v-model="insertdata.id" class="form-control" />
                                                                <span class="text-danger" v-if="errors.name">{{
                                                                    errors.name[0] }}</span>
                                                            </div>
                                                        </div>

                                                        <button type="submit" class="btn btn-success px-5 w-100">
                                                            <i class="bx bx-check-circle mr-1"></i> Save
                                                        </button>

                                                     


                                                    </form>
                                                    <!-- END -->
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>

import { ref, watch, onMounted } from "vue";
import axios from "axios";

import swal from 'sweetalert2';
window.Swal = swal;
definePageMeta({
    middleware: 'is-logged-out',
    title: 'Profile' // Set your desired page title here

})
const router = useRouter();
const loading = ref(false);
const currentPage = ref(1);
const pageSize = 15;
const totalRecords = ref(0);
const totalPages = ref(0);
const filter_language = ref('');
const errors = ref({});
const selectedLanguages = ref([]);
const productdata = ref([]);
const searchGameCode = ref("");
const searchQuery = ref(""); // Add a ref for the search query
const selectedFilter = ref(1); // Add a ref for the search query
const langauge = ref(""); // Add a ref for the search query

const insertdata = reactive({
    id: '',
    name: '',
    langauge: '',
    status: 1,
});

const saveData = () => {
    const formData = new FormData();
    formData.append('id', insertdata.id);
    formData.append('name', insertdata.name);
    formData.append('langauge', insertdata.langauge);
    formData.append('status', insertdata.status);

    axios.post('/games/addGameLangauges', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        $('#formrest')[0].reset();
        success_noti();
        fetchData();
        insertdata.id="";
        insertdata.name="";
        insertdata.langauge="";
        insertdata.status=1;
        router.push('/game/allgames/list-translate');

    }).catch(error => {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            // Handle other types of errors here
            console.error("An error occurred:", error);
        }
    });
};


const success_noti = () => {
    //alert("Your data has been successfully inserted.");
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Your data has been successfully inserted."
    });
};
const fetchData = async (page) => {
    try {
        loading.value = true;
        const response = await axios.get(`/games/allGamesListTranslate`, {
            params: {
                page: page,
                pageSize: pageSize,
                searchQuery: searchQuery.value, // Pass the search query parameter
                selectedFilter: selectedFilter.value,
                searchGameCode: searchGameCode.value,
                filter_language: filter_language.value,
            },
        });
        productdata.value = response.data.data;
        totalRecords.value = response.data.total_records;

        totalPages.value = response.data.total_pages;
        currentPage.value = response.data.current_page;
    } catch (error) {
        // Handle error
    } finally {
        loading.value = false;
    }
};

const getActiveLanguage = async () => {
    try {
        const response = await axios.get(`/setting/getLanguageActiveList`);
        selectedLanguages.value = response.data;

    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    getActiveLanguage();
    fetchData(currentPage.value);
});

// Watch for changes in current page and fetch data accordingly
watch(currentPage, (newPage) => {
    fetchData(newPage);
});

// Define a method to handle editing
const edit = (item) => {

    console.log("===" + item.language);
    // formData.append('name', insertdata.name);
    // formData.append('langauge', insertdata.langauge);
    // formData.append('status', insertdata.status);

    insertdata.name = item.name;
    insertdata.id = item.id;
    insertdata.langauge = item.language;


};

// Compute the range of displayed pages
const displayedPages = computed(() => {
    const maxDisplayedPages = 10; // Maximum number of displayed pages
    const startPage = Math.max(
        1,
        currentPage.value - Math.floor(maxDisplayedPages / 2)
    );
    const endPage = Math.min(
        totalPages.value,
        startPage + maxDisplayedPages - 1
    );
    return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );
});

const filterData = () => {
    fetchData(1); // Reset to first page when search query changes
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
    padding: .2rem;
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
