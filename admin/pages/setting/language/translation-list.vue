<template>
    <title>Translation List</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Translation List</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Dashboard</LazyNuxtLink>
                                </li>
                                <li class="breadcrumb-item active">
                                    <LazyNuxtLink to="/setting/language/add">New Language</LazyNuxtLink>
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
                            <div class="card">
                                <div class="loading-indicator" v-if="loading" style="text-align: center;">
                                    <Loader />
                                </div>
                                <div class="card-body">
                                    <!-- Start -->
                                    <!-- ./row -->

                                    <!-- =={{ translationData }}== -->

                                    <div class="row">
                                        <div class="card-header p-0 pt-1">
                                            <select id="languageSelect" class="form-select form-control"
                                                v-model="selectedLanguage" @change="getContentForLanguage">
                                                <option value="">Select Langauge</option>
                                                <option v-for="(language, index) in languageData" :key="language.code"
                                                    :value="language.code"> {{ language.name }} </option>
                                            </select>
                                        </div>

                                        <div class="card-body">
                                            <!-- Table to display translation_key and translated_value -->
                                            <table class="table table-bordered" v-if="!loading">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">SL</th>
                                                        <th class="text-left">Translation Key</th>
                                                        <th class="text-left">Translated Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in translationData" :key="item.id">
                                                        <td class="text-center">{{ index + 1 }}</td>
                                                        <td class="text-left">{{ item.translation_key }}</td>
                                                        <td class="text-left">
                                                            <input type="text" v-model="item.translated_value"
                                                                @keyup="updateTranslation(item.id)"
                                                                class="form-control" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!-- Loading or empty data message -->

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
definePageMeta({
    middleware: 'is-logged-out',
    title: 'Profile' // Set your desired page title here

})
const router = useRouter();
const loading = ref(false);
const languageData = ref([]);
const translationData = ref([]);
const selectedFilter = ref(1); // Add a ref for the search query

const selectedLanguage = ref('en'); // Store the selected language


const updateTranslation = async (id) => {
    const updatedItem = translationData.value.find(item => item.id === id); // Find the item by id
    if (updatedItem) {
        const updatedValue = updatedItem.translated_value; // Get the updated value
        console.log(`Updated ID ${id}: ${updatedValue}`);
       
        const response = await axios.get(`/setting/updateTransationRow`, {
            params: {
                id: id, 
                translated_value: updatedValue, 
            },
        });
        fetchData();
        languageData.value = response.data.data;


    } else {
        console.error(`Item with ID ${id} not found`);
    }
}


const fetchData = async () => {
    try {
        loading.value = true;
        const response = await axios.get(`/public/language`, {
            params: {
                selectedFilter: selectedFilter.value, // Pass the search query parameter
            },
        });
        languageData.value = response.data.languages;

    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};


const getContentForLanguage = async () => {

    try {
        loading.value = true;
        const response = await axios.get(`/setting/getTranslationList`, {
            params: {
                code: selectedLanguage.value, // Pass the search query parameter
            },
        });
        translationData.value = response.data;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }


}

onMounted(() => {
    getContentForLanguage();
    fetchData();
});

</script>

<style>
.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 0.5rem;
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

.nav-tabs .nav-link.active {
    background-color: #292d2e;
    color: white;
}
</style>
