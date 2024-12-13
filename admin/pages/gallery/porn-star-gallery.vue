<template>
    <title>Fitler</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <p>Gallery ({{ totalCountAll }})</p>
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

            <center>
                <div class="loading-indicator" v-if="loading" style="text-align: center">
                    <Loader />
                </div>
            </center>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                        <select id="category" name="category" class="form-control" v-model="selectedCategory"
                            @change="handleCategoryChange($event.target.value)">
                            <option v-for="category in categoryList" :key="category" :value="category.name">
                                {{ category.name }}
                            </option>
                        </select>

                    </div>

                </div>

                <!-- Start -->
                <div class="row">
                    <div class="col-12 col-sm-12">
                        <div class="card card-primary card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill"
                                            href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home"
                                            aria-selected="true">Gallery ({{ totalCount }})</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill"
                                            href="#custom-tabs-one-profile" role="tab"
                                            aria-controls="custom-tabs-one-profile" aria-selected="false">Videos</a>
                                    </li>


                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel"
                                        aria-labelledby="custom-tabs-one-home-tab">

                                        <div class="container-fluid">


                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="checkbox" :checked="allSelected"
                                                        @change="toggleSelectAll"> Check All
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="d-flex justify-content-end mb-2">

                                                        <div class="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" class="btn btn-danger"
                                                                @click="storeSelectedIds"><i class="fa fa-trash"
                                                                    aria-hidden="true"></i>Bulk Delete</button>
                                                            <button type="button" class="btn btn-primary"
                                                                @click="storeSelectedIdsForGallery"><i
                                                                    class="fa fa-picture-o" aria-hidden="true"></i>For
                                                                Gallery</button>
                                                            <!-- <button type="button" class="btn btn-primary">Right</button> -->
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>




                                            <div class="row">
                                                <div class="col-6 col-md-1 mt-2" v-for="data in responseData"
                                                    :key="data.video_id">
                                                    <div class="thumbnail position-relative">
                                                        <!-- Conditionally render img element based on the alt attribute -->
                                                        <img v-if="data.alt !== 'Loading....'" :src="data.thumb_src"
                                                            :alt="'Loading... ' + data.video_id" class="rounded"
                                                            style="width:100%">

                                                        <center>
                                                            <input type="checkbox" :id="'checkbox-' + data.video_id"
                                                                v-model="selectedIds" :value="data.video_id">
                                                        </center>
                                                        <!-- <label :for="'checkbox-' + data.video_id">Checkbox</label> -->
                                                        <div class="caption d-none">
                                                            <p>Lorem ipsum...</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- A loader to show when loading more data -->
                                            <div v-if="loading" class="text-center my-3">
                                                <p>Loading more content...</p>
                                            </div>
                                            <!-- Empty div for the IntersectionObserver to watch -->
                                            <center>
                                                <!-- <button v-if="!loading && !noMoreData && page > 1" @click="previousPage" class="btn btn-secondary mt-5">
                <i class="fa fa-chevron-left" aria-hidden="true"></i> Previous
            </button> -->
                                                <button v-if="!loading && !noMoreData" @click="nextPage"
                                                    class="btn btn-primary mt-5">
                                                    <i class="fa fa-spinner" aria-hidden="true"></i>Load More...
                                                </button>
                                            </center>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel"
                                        aria-labelledby="custom-tabs-one-profile-tab">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-6 col-md-6 mt-2" v-for="data in responseVideoData"
                                                    :key="data.video_id">
                                                    <div class="thumbnail">
                                                        <a href="#">
                                                            <iframe :src="data.embed" class="rounded"
                                                                style="width:100%; height:400px;" frameborder="0"
                                                                allowfullscreen></iframe>
                                                            <div class="caption d-none">
                                                                <p>Lorem ipsum...</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div v-if="loading" class="text-center my-3">
                                                    <p>Loading more content...</p>
                                                </div>
                                                <!-- Empty div for the IntersectionObserver to watch -->

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- END -->

            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

import Swal from "sweetalert2";
definePageMeta({
    middleware: "is-logged-out",
    title: "Gallery", // Set your desired page title here
});
const router = useRouter();
const loading = ref(false);
const responseData = ref([]);
const responseVideoData = ref([]);
const categoryList = ref([]);
const selectedIds = ref([]);
const selectedCategory = ref("Anal"); // Add a ref for the search query
const page = ref(1);
const totalCountAll = ref(0);
const totalCount = ref(0);
const noMoreData = ref(false);
const itemsPerPage = 54; // This should match your backend limit


const allSelected = computed(() => {
    return selectedIds.value.length === responseData.value.length; // Check if all are selected
});

const toggleSelectAll = (event) => {
    if (event.target.checked) {
        // Select all video IDs
        selectedIds.value = responseData.value.map(data => data.video_id);
    } else {
        // Deselect all
        selectedIds.value = [];
    }
};

// Example: Fetch response data (you can replace this with your actual data fetching logic)
const fetchData = async () => {
    // Simulated fetch, replace with your API call
    responseData.value = await fetch('/api/videos').then(res => res.json());
};

// Fetch data when the component is mounted
onMounted(fetchData);



const remove404notfound = async () => {
    const { data } = await axios.get(`/removeFourZeroFourNotfound`);
    const response = data;
    console.log("==" + response);
}

const storeSelectedIdsForGallery = async () => {

    const idsString = selectedIds.value.join(',');
    console.log('Selected IDs:', idsString);
    // Check if the number of selected IDs exceeds 100
    if (selectedIds.value.length > 100) {
        Swal.fire({
            icon: 'error',
            title: 'Limit Exceeded',
            text: 'Please select a maximum of 100 pictures.',
            confirmButtonText: 'OK',
        });
        return; // Exit the function if the limit is exceeded
    }

    // Show confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'Cancel',
    });

    // If the user confirmed, proceed with the deletion
    if (result.isConfirmed) {
        try {
            loading.value = true; // Start loading
            const { data } = await axios.get(`/insertForGalleryVideo`, {
                params: {
                    id: idsString,
                },
            });
            if (data.success) {
                // Show success message
                Swal.fire(
                    'Success!',
                    'Your picture has been downloaded for the gallery.',
                    'success'
                );
                // filterData(); // Run filterData() only on success
            }
            router.push({ path: '/gallery/fgGallery' });
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false; // Stop loading
        }
    }




}
const storeSelectedIds = async () => {
    // Combine selectedIds into a comma-separated string
    const idsString = selectedIds.value.join(',');
    console.log('Selected IDs:', idsString);

    // Show confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });

    // If the user confirmed, proceed with the deletion
    if (result.isConfirmed) {
        try {
            loading.value = true; // Start loading
            const { data } = await axios.get(`/deleteVideoId`, {
                params: {
                    id: idsString,
                },
            });
            if (data.success) {
                // Show success message
                Swal.fire(
                    'Deleted!',
                    'Your picture has been deleted.',
                    'success'
                );
                router.push({ path: '/gallery/messages' });
                // filterData(); // Run filterData() only on success
            } else {
                console.error('Delete operation was not successful', data);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the picture.',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error fetching data', error);
            Swal.fire(
                'Error!',
                'An error occurred while deleting the video.',
                'error'
            );
        } finally {
            loading.value = false; // Stop loading
        }
    } else {
        // Optional: Show a message if the user cancels
        Swal.fire(
            'Cancelled',
            'Your video is safe :)',
            'error'
        );
    }
};

const deleteImage = async (videoId) => {
    try {
        loading.value = true;
        const { data } = await axios.get(`/deleteVideoId`, {
            params: {
                id: videoId,
            },
        });
        filterData();

    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
}

const filterDataVideo = async () => {
    try {
        loading.value = true;
        const { data } = await axios.get(`/filterCategoryWiseVideoGallery`, {
            params: {
                selectedCategory: selectedCategory.value,
                page: page.value,
            },
        });
        responseVideoData.value = [];
        if (data.data.length === 0) {
            noMoreData.value = true;
            responseVideoData.value = [];
            totalCount.value = 0;
        } else {
            responseVideoData.value = [...responseVideoData.value, ...data.data]; // Append new data
            totalCount.value = data.totalCount;
            page.value++; // Increment the page for the next fetch
        }
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
};

// Function to fetch data
const filterData = async () => {
    try {
        loading.value = true;
        const { data } = await axios.get(`/filterCategoryWiseGallery`, {
            params: {
                selectedCategory: selectedCategory.value,
                page: page.value,
            },
        });

        if (data.data.length === 0) {
            noMoreData.value = true;
        } else {
            responseData.value = page.value === 1 ? data.data : [...responseData.value, ...data.data];
            totalCount.value = data.totalCount;
            totalCountAll.value = data.totalCountAll;
            noMoreData.value = (page.value - 1) * itemsPerPage + data.data.length >= totalCount.value;
        }
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
};

// Function to handle page changes
const nextPage = () => {
    if (!noMoreData.value) {
        page.value++;
        filterData();
    }
};

const previousPage = () => {
    if (page.value > 1) {
        page.value--;
        filterData();
    }
};

// Handle category change
const handleCategoryChange = async (newCategory) => {
    responseData.value = [];
    noMoreData.value = false;
    page.value = 1;
    selectedCategory.value = newCategory;
    await filterData();
};

// Initialize data fetching and observer on component mount
onMounted(() => {
    defaultFilterCategory();
    filterData(); // Initial data load
    //  setupObserver(); // Set up observer for infinite scrolling
    filterDataVideo();
});

const defaultFilterCategory = async () => {
    try {
        // loading.value = true;
        const response = await axios.get(`/getPornCategory`);
        categoryList.value = response.data;

    } catch (error) {
        // Handle error
    }
};

</script>

<style>
.observer {
    height: 1px;
    margin-bottom: 10px;
}

.gallery-img {
    cursor: pointer;
    height: 150px;
    object-fit: cover;
}

.carousel-item img {
    width: 100%;
    height: 500px;
    object-fit: cover;
}
</style>