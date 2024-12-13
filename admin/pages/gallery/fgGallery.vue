<template>
    <title>FG Gallery</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <p>FG Gallery</p>
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
                <!-- Start -->
                <div class="row">
                    <div class="col-12 col-sm-12">
                        <div class="card card-primary card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill"
                                            href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home"
                                            aria-selected="true">Gallery ({{ countGallary }})</a>
                                    </li>


                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel"
                                        aria-labelledby="custom-tabs-one-home-tab">
                                        <div class="container-fluid">
                                            <center>This Gallery Use only Frontend <br /><nuxt-link
                                                    to="/gallery/porn-star-gallery">Add More Images...</nuxt-link>
                                            </center>
                                            <div class="row">
                                                <div class="col-2 col-md-2 mt-2" v-for="data in gallaryData"
                                                    :key="data.id">

                                                    <div class="thumbnail position-relative">
                                                        <!-- Remove the icon from here -->


                                                        <!-- Conditionally render img element based on the alt attribute -->
                                                        <img v-if="data.alt !== 'Loading....'" :src="data.imagepath"
                                                            :alt="'Loading... ' + data.id" class="rounded"
                                                            style="width:100%">

                                                    </div>
                                                    <center><i class="fa fa-trash" aria-hidden="true"
                                                            @click="removeGalleryPicture(data.id)"></i></center>
                                                </div>
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
const countGallary = ref(0);
const gallaryData = ref([]);


const removeGalleryPicture = async (deleteid) => {
    // Show confirmation alert
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    // Check if the user confirmed
    if (result.isConfirmed) {
        try {
            loading.value = true;
            const { data } = await axios.get(`/deleteGalleryId`, {
                params: {
                    id: deleteid,
                },
            });

            // Optionally show success message
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

            // Refresh the gallery data
            filterData();
        } catch (error) {
            console.error('Error fetching data', error);
            Swal.fire('Error!', 'There was an error deleting your file.', 'error');
        } finally {
            loading.value = false;
        }
    } else {
        // Optionally show a message when the action is canceled
        Swal.fire('Cancelled', 'Your file is safe :)', 'error');
    }
};


// Function to fetch data
const filterData = async () => {
    try {
        loading.value = true;
        const response = await axios.get(`/galleryData`);
        gallaryData.value = response.data;
        countGallary.value = gallaryData.value.length;


    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    filterData(); // Initial data load
});


</script>

<style>
.thumbnail {
    position: relative;
    /* Remove any padding/margin that might affect layout */
    padding: 0;
    margin: 0;
}

.thumbnail img {
    display: block;
    /* Ensures no space at the bottom */
    margin: 0;
    /* Remove any default margin */
    border: none;
    /* Remove any border if present */
}

.thumbnail:before,
.thumbnail:after {
    display: none;
    /* Hide any pseudo-elements if they exist */
}

.thumbnail .fa-picture-o {
    display: none;
    /* Hides the icon */
}
</style>