<template>
  <title>Add Game</title>
  <div>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <p>Game list</p>
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
      <!-- <button @click="makeDeposit">MakeDeposit</button>  -->
      <center>
        <div class="loading-indicator" v-if="loading" style="text-align: center">
          <Loader />
        </div>
      </center>

      <!-- <button @click="pageRedirect()">Pages</button> -->
      <section class="content">
        <div class="container-fluid">
          <!-- Start -->
          <center>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
          </center>
          <div class="card border-top border-0 border-4 border-info">
            <div class="border p-4 rounded">
              <form @submit.prevent="saveData()" id="formrest" class="forms-sample" enctype="multipart/form-data">

                <div class="">
                  <div class="row">
                    <!-- Left Column: Table -->
                    <div class="col-md-10">
                      <table border="1" cellpadding="10" class="table table-striped">
                        <thead>
                          <tr>
                            <th>SL</th> <!-- New SL column -->
                            <th>Game ID</th>
                            <th class="text-left">Name</th>
                            <th>Images</th>
                            <th>Platform</th>
                            <th>Game Type</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(game, index) in apiData" :key="game.gameid">
                            <td>{{ index + 1 }}</td> <!-- Display SL number here -->
                            <td>{{ game.gameid }}</td>
                            <td class="text-left">{{ game.name }}</td>
                            <td>{{ game.game_images || 'No Images' }}</td>
                            <td>{{ game.platform }}</td>
                            <td>{{ game.gametype }}</td>
                            <td>{{ game.status }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- Right Column: Download Button -->
                    <div class="col-md-2 d-flex align-items-start justify-content-end">
                      <button type="submit" class="btn btn-primary btn-lg">
                        <i class="fas fa-download"></i> Pull
                      </button>
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
const router = useRouter()
window.Swal = swal;
const loading = ref(false);
const errorMessage = ref("");
const apiData = ref([]);

const errors = ref({});

definePageMeta({
  middleware: 'is-logged-out',
})


const saveData = async () => {
  try {
    loading.value = true;
    const url = `/api_gameList`;
    const response = await axios.get(url);
    //console.log(response.data.games);
    apiData.value = response.data.games;
    // router.push("/game/allgames/list");
  } catch (error) {

    console.log(error);
  } finally {
    loading.value = false;
  }
};



onMounted(() => {
  saveData();
});

</script>

<style scoped>
/* Optional styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
}
</style>
