<template>
    <title>Add Platform</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Add Platform</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                                </li>
                                <li class="breadcrumb-item active">
                                    <LazyNuxtLink to="/game/onlyplatform/list">Back to List</LazyNuxtLink>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
           
            <!-- <button @click="pageRedirect()">Pages</button> -->
            <section class="content">
                <div class="container-fluid">
                    <!-- Start -->
                    <div class="card border-top border-0 border-4 border-info">
                        <div class="border p-4 rounded">
                            <form @submit.prevent="saveData()" id="formrest" class="forms-sample"
                                enctype="multipart/form-data">
                                <div class="card card-primary card-outline card-tabs">
                                    <div class="card-header p-0 pt-1 border-bottom-0">
                                        <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="custom-tabs-three-home-tab"
                                                    data-toggle="pill" href="#custom-tabs-three-home" role="tab"
                                                    aria-controls="custom-tabs-three-home"
                                                    aria-selected="true">General</a>
                                            </li>

                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content" id="custom-tabs-three-tabContent">
                                            <div class="tab-pane fade active show" id="custom-tabs-three-home"
                                                role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                                                <!-- General  -->
                                                <div class="row mb-3 required">
                                                    <label for="input-name-1"
                                                        class="col-sm-2 col-form-label required-label">Name</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" name="name" placeholder="Name"
                                                            v-model="insertdata.name" class="form-control" />
                                                        <span class="text-danger"
                                                            v-if="errors.name">{{ errors . name[0] }}</span>
                                                    </div>
                                                </div>


                                                <div class="row mb-3 required">
                                                    <label for="input-name-1"
                                                        class="col-sm-2 col-form-label required-label">Images</label>
                                                    <div class="col-sm-10">

                                                        <input type="file" value class="form-control" id="fileInput"
                                                            accept="image/png,image/jpeg" ref="files"
                                                            @change="onFileSelected" />
                                                        <span class="text-danger"
                                                            v-if="errors.files">{{ errors . files[0] }}</span>
                                                        <img v-if="previewUrl" :src="previewUrl" alt="Preview"
                                                            class="img-fluids" />
                                                    </div>
                                                </div>




                                                <div class="row mb-3 required">
                                                    <label for="input-name-1"
                                                        class="col-sm-2 col-form-label required-label">Status</label>
                                                    <div class="col-sm-10">
                                                        <select v-model="insertdata.status" class="form-control">
                                                            <option value="" disabled>Selected</option>
                                                            <option value="1">Active</option>
                                                            <option value="0">Inactive</option>
                                                        </select>
                                                        <span class="text-danger"
                                                            v-if="errors.status">{{ errors . status[0] }}</span>
                                                    </div>
                                                </div>


                                                <button type="submit" class="btn btn-success px-5 w-100">
                                                    <i class="bx bx-check-circle mr-1"></i> Save
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- END -->
            </section>
        </div>
    </div>
</template>

<script setup>
    import {
        ref,
        reactive,
        onMounted
    } from 'vue';
    import axios from 'axios';
    import swal from 'sweetalert2';
    const router = useRouter()
    window.Swal = swal;
    const file = ref(null);
    const insertdata = reactive({
        id: '',
        name: '',
        code: '',
        game_type_id: '',
        game_code: '',
        status: 1,
    });

    // Define a ref to store the HTML content of the editor
    const errors = ref({});
    const selectedGameType = ref({});
    // Initialize Summernote editor

    definePageMeta({
        middleware: 'is-logged-out',
    })


    const getGameTypeData = async () => {
        try {
            const response = await axios.get(`/games/allGamesTypes`);
            selectedGameType.value = response.data;

        } catch (error) {
            console.log(error);
        }
    };



    const saveData = () => {

        const formData = new FormData();
        formData.append('files', file.value);
        formData.append('name', insertdata.name);
        formData.append('status', insertdata.status);

        axios.post('/games/addonlyGamepltform', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            $('#formrest')[0].reset();
            success_noti();
            router.push('/game/onlyplatform/list');

        }).catch(error => {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            } else {
                // Handle other types of errors here
                console.error("An error occurred:", error);
            }
        });
    };


    const previewUrl = ref(null);

    const previewImage = (event) => {
        const file = event.target.files[0];
        previewUrl.value = URL.createObjectURL(file);
        //  checkImageDimensionsThunbnail(file);
    };

    const onFileSelected = (event) => {
        previewImage(event)
        file.value = event.target.files[0];
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





    onMounted(() => {
        getGameTypeData();

    });
</script>

<style scoped>
    .required-label::after {
        content: "\2605";
        color: red;
        margin-right: 4px;
    }

    /* CSS */
    ol,
    ul {
        padding-left: 0rem;
    }

    ul {
        list-style: none;
    }

    .bgColor {
        background-color: #c8c8c8;
        padding: 1px;
        border-radius: 2px;
    }

    .img-fluid {
        width: 300px;
        height: 150px;
    }

    .img-fluids {
        margin-top: 10px;
        width: 300px;
        height: 300px;
    }

    /* for checkbox */
    .multiselect {
        position: relative;
        font-family: Arial, sans-serif;
        width: 100%;
    }

    .select-box {
        border: 1px solid #ccc;
        padding: 8px;
        cursor: pointer;
        background-color: #fff;
    }

    .dropdown {
        border: 1px solid #ccc;
        border-top: none;
        max-height: 400px;
        overflow-y: auto;
        position: absolute;
        top: 100%;
        width: 100%;
        background-color: #fff;
        z-index: 1;
    }

    label {
        display: block;
        padding: 5px;
    }

    input[type="checkbox"] {
        margin-right: 8px;
    }

    .widthtxtbox {
        width: 50px;
    }
</style>
