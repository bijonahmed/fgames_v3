<template>
    <title>
        Edit Platformy</title>
    <div>
        <div class="content-wrapper">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <p>Edit Platform</p>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                                </li>
                                <li class="breadcrumb-item active">
                                    <LazyNuxtLink to="/game/platform/list">Back to List</LazyNuxtLink>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
    
            <section class="content">
                <div class="container-fluid">
                    <!-- Start -->
                    <div class="card border-top border-0 border-4 border-info">
                        <div class="border p-4 rounded">
                            <form @submit.prevent="saveData()" id="formrest" class="forms-sample" enctype="multipart/form-data">
                                <div class="card card-primary card-outline card-tabs">
                                    <div class="card-header p-0 pt-1 border-bottom-0">
                                        <ul class="nav nav-tabs" id="custom-tabs-three-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill" href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home" aria-selected="true">General</a>
                                            </li>
    
                                        </ul>
                                    </div>
                                    <div class="card-body">
                                        <div class="tab-content" id="custom-tabs-three-tabContent">
                                            <div class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel" aria-labelledby="custom-tabs-three-home-tab">
                                                <!-- General  -->
    
    
    
                                                <div class="row mb-3 required">
                                                    <label for="input-name-1" class="col-sm-2 col-form-label required-label">Game Type</label>
                                                    <div class="col-sm-10">
                                                        <select v-model="insertdata.game_type_id" class="form-control">
                                                                  <option selected value="">Select Game Type</option>
                                                                    <option v-for="(gameType, index) in selectedGameType"
                                                                        :key="gameType.id" :value="gameType.id">{{ gameType.name }}
                                                                    </option>
                                                                </select>
                                                        <span class="text-danger" v-if="errors.game_type_id">{{ errors . game_type_id[0] }}</span>
                                                    </div>
                                                </div>
    
    
                                                <div class="row mb-3 required">
                                                    <label for="input-name-1" class="col-sm-2 col-form-label required-label">Name</label>
                                                    <div class="col-sm-10">
                                                        <input type="hidden" name="name" placeholder="Name" v-model="insertdata.id" class="form-control" />
                                                        <input type="text" name="name" placeholder="Name" v-model="insertdata.name" class="form-control" />
                                                        <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                                                    </div>
                                                </div>
    
    
    
    
                                                <div class="alert alert-info" bis_skin_checked="1">
                                                    <i class="fas fa-info-circle"></i>Image diemntion width: 150px; height: 150px;
                                                </div>
                                                <div class="row mb-3">
                                                    <label for="input-meta-description-1" class="col-sm-2 col-form-label">Thumbnail
                                    Image</label>
                                                    <div class="col-sm-10">
                                                        <input type="file" value class="form-control" id="fileInput" accept="image/png,image/jpeg" ref="files" @change="onFileSelected" />
                                                        <span class="text-danger" v-if="errors.image">{{ errors.image[0] }}</span>
                                                        <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="img-fluids" style="height: 225px;width: 225px; padding: 10px;;" />
    
                                                    </div>
                                                </div>
    
    
    
    
    
    
                                                <div class="row mb-3 required">
                                                    <label for="input-name-1" class="col-sm-2 col-form-label required-label">Status</label>
                                                    <div class="col-sm-10">
                                                        <select v-model="insertdata.status" class="form-control">
                                      <option value="" disabled>Selected</option>
                                      <option value="1">Active</option>
                                      <option value="0">Inactive</option>
                                    </select>
                                                        <span class="text-danger" v-if="errors.status">{{ errors.status[0] }}</span>
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
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const router = useRouter();
import 'summernote/dist/summernote-bs4.js';
import 'summernote/dist/summernote-bs4.css';
///import $ from 'jquery';
if (process.client) {
    window.Swal = swal;

}

definePageMeta({
    middleware: 'is-logged-out',
})
const file = ref(null);
const files = ref(null);
const insertdata = reactive({
    id: '',
    name: '',
    code: '',
    game_type_id: '',
    game_code: '',
    status: '',
});
// Define a ref to store the HTML content of the editor
const previewUrl = ref(null);

const errors = ref({});
const selectedGameType = ref({});
const previewImage = (event) => {
    const file = event.target.files[0];
    previewUrl.value = URL.createObjectURL(file);
};


const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    file.value = selectedFile; // Store the file
    if (selectedFile) {
        const img = new Image();
        const objectUrl = URL.createObjectURL(selectedFile);
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            // Check if the image dimensions are 240px x 270px
            if (width === 150 && height === 150) {
                // If dimensions are correct, proceed
                previewImage(event);
            } else {
                // Handle invalid dimensions by clearing the input field
                alert("Invalid image dimensions. Please upload an image of size 220px x 270px.");
                // Clear the file input
                event.target.value = null;
                file.value = null;
            }
            // Revoke the object URL to free up memory
            URL.revokeObjectURL(objectUrl);
        };

        img.src = objectUrl; // Set the image source to the selected file
    }
};



const saveData = () => {

    const formData = new FormData();
    formData.append('files', file.value);
    formData.append('id', insertdata.id);
    formData.append('name', insertdata.name);
    formData.append('code', insertdata.code);
    formData.append('game_type_id', insertdata.game_type_id);
    formData.append('game_code', insertdata.game_code);
    formData.append('status', insertdata.status);

    axios.post('/games/addGameCategory', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((res) => {
        $('#formrest')[0].reset();
        success_noti();
        router.push('/game/platform/list');

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


const productrow = () => {
    const id = router.currentRoute.value.query.parameter;
    axios.get(`/games/checkGameCategory/${id}`).then(response => {
        console.log("files" + response.data.image);

        insertdata.id = response.data.data.id;
        insertdata.name = response.data.data.name;
        insertdata.code = response.data.data.code
        insertdata.game_type = response.data.data.game_type
        insertdata.game_type_id = response.data.data.game_type_id
        insertdata.status = response.data.data.status
        insertdata.status = response.data.data.
        previewUrl.value = response.data.image
    });
};

const getGameTypeData = async () => {
    try {
        const response = await axios.get(`/games/allGamesTypes`);
        selectedGameType.value = response.data;

    } catch (error) {
        console.log(error);
    }
};


// Call the loadeditor function when the component is mounted
onMounted(async () => {
    getGameTypeData();
    productrow();

});
//
</script>

<style scoped>
.required-label::after {
    content: "\2605";
    color: red;
    margin-right: 4px;
}
</style>
