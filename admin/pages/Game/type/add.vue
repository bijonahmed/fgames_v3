<template>
  <title>Add Game Type</title>
  <div>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <p>Add Game Type</p>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <LazyNuxtLink to="/admin/dashboard">Home</LazyNuxtLink>
                </li>
                <li class="breadcrumb-item active">
                  <LazyNuxtLink to="/game/type/list">Back to List</LazyNuxtLink>
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
                        <div class="row mb-3 required">
                          <label for="input-name-1" class="col-sm-2 col-form-label required-label">Title</label>
                          <div class="col-sm-10">
                            <input type="text" name="name" placeholder="Name" v-model="insertdata.name"
                              class="form-control" />
                            <input type="hidden" name="id" id="id" class="form-control" />
                            <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
                          </div>
                        </div>





                        <div class="row mb-3 required">
                          <label for="input-name-1" class="col-sm-2 col-form-label required-label">Game Type
                            Code</label>
                          <div class="col-sm-10">
                            <input type="text"  placeholder="1" v-model="insertdata.gameTypecode"
                              class="form-control" />
                            <input type="hidden" name="id" id="id" class="form-control" />
                            <span class="text-danger" v-if="errors.gameTypecode">{{ errors.gameTypecode[0] }}</span>
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
import 'summernote/dist/summernote-bs4.js';
import 'summernote/dist/summernote-bs4.css';
const router = useRouter()
window.Swal = swal;
const insertdata = reactive({
  id: '',
  name: '',
  gameTypecode:'',
  status: 1,
});
// Define a ref to store the HTML content of the editor
const errors = ref({});

// Initialize Summernote editor

definePageMeta({
  middleware: 'is-logged-out',
})



const saveData = () => {
  const formData = new FormData();
  formData.append('name', insertdata.name);
  formData.append('gameTypecode', insertdata.gameTypecode);
  formData.append('status', insertdata.status);
  axios.post('/games/addGameType', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    $('#formrest')[0].reset();
    success_noti();
    router.push('/game/type/list');

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
