<template>
  <title>Edit Game</title>
  <div>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <p>Edit Game</p>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                </li>
                <li class="breadcrumb-item active">
                  <LazyNuxtLink to="/game/allgames/list">Back to List</LazyNuxtLink>
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
                        <a class="nav-link active" id="custom-tabs-three-home-tab" data-toggle="pill"
                          href="#custom-tabs-three-home" role="tab" aria-controls="custom-tabs-three-home"
                          aria-selected="true">General</a>
                      </li>

                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-three-tabContent">
                      <div class="tab-pane fade active show" id="custom-tabs-three-home" role="tabpanel"
                        aria-labelledby="custom-tabs-three-home-tab">
                        <!-- General  -->
                        <div class="row mb-3">
                          <label for="input-name-1" class="col-sm-2 col-form-label">Name</label>
                          <div class="col-sm-10">
                            <input type="hidden" name="id" placeholder="Name" v-model="insertdata.id"
                              class="form-control" />
                            {{ insertdata.name }}
                          </div>
                        </div>

                        <div class="row mb-3">
                          <label for="gameid" class="col-sm-2 col-form-label">Game ID</label>
                          <div class="col-sm-10"> {{ insertdata.gameid }} </div>
                        </div>



                        <div class="row mb-3">
                          <label for="input-name-1" class="col-sm-2 col-form-label">Platform</label>
                          <div class="col-sm-10">
                            {{ insertdata.platform }}
                          </div>
                        </div>


                        <div class="row mb-3">
                          <label for="input-name-1" class="col-sm-2 col-form-label">Game Type</label>
                          <div class="col-sm-10">
                            {{ insertdata.gametype }}
                          </div>
                        </div>


                        <div class="row mb-3">
                          <label for="input-name-1" class="col-sm-2 col-form-label">Img</label>
                          <div class="col-sm-10">

                            <input type="file" value class="form-control" id="fileInput_1" accept="image/png,image/jpeg"
                              ref="files" @change="onFileSelected_1" />
                            <div v-if="previewUrl">
                              <img :src="previewUrl" alt="Image Preview" style="height:50px;width: 50px;" />
                            </div>




                            <img :src="insertdata.img" />
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
const bg_images = ref(null);
const insertdata = reactive({
  id: '',
  name: '',
  gameid: '',
  platform: '',
  gametype: '',
  img: '',
  status: '',
});
// Define a ref to store the HTML content of the editor

const errors = ref({});

const saveData = () => {

  const formData = new FormData();
  formData.append('id', insertdata.id);
  formData.append('status', insertdata.status);
  formData.append('bg_images', bg_images.value);

  axios.post('/games/updateGame', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    $('#formrest')[0].reset();
    success_noti();
    router.push('/game/allgames/list');

  }).catch(error => {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      // Handle other types of errors here
      console.error("An error occurred:", error);
    }
  });
};

const checkImageDimensionsThunbnail = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      previewUrl.value = e.target.result;
    };
  };
  reader.readAsDataURL(file);
  //resetInput();
};
const previewUrl = ref(null);

const previewImage_bg = (event) => {
  const file = event.target.files[0];
  previewUrl.value = URL.createObjectURL(file);
  checkImageDimensionsThunbnail(file);
};


const onFileSelected_1 = (event) => {
  previewImage_bg(event);
  bg_images.value = event.target.files[0];
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
  axios.get(`/games/checkGame/${id}`).then(response => {
    console.log("Preview uirl: " + response.data.images);
    insertdata.id = response.data.id;
    insertdata.name = response.data.name;
    insertdata.gameid = response.data.gameid;
    insertdata.platform = response.data.platform;
    insertdata.gametype = response.data.gametype;
    previewUrl.value = response.data.images;
    insertdata.status = response.data.status

  });
};
// Call the loadeditor function when the component is mounted
onMounted(async () => {
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
