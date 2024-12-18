<template>
    <title>
        Add Game</title>
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
    
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                            <select v-model="game_platform" class="form-control">
                                                            <option value="" selected>All Game Platform</option>
                                                            <option v-for="gpltfrm in responsePlt" :key="gpltfrm.id" :value="gpltfrm.slug">
                                                                {{ gpltfrm.name }}
                                                            </option>
                                                        </select>
                        </div>
    
                        <div class="col-lg-2 col-md-2 col-sm-6 mb-2">
                            <button @click="getGamePltwise()" class="btn btn-primary w-100">Filter</button>
                        </div>
                    </div>
    
                    <div class="card border-top border-0 border-4 border-info">
                        <div class="border p-4 rounded">
    
                            <div class="">
                                <div class="row">
                                    <!-- Left Column: Table -->
                                    <div class="col-md-12">
    
                                        <table border="0.1" cellpadding="10" class="table table-response w-100">
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Platform Type</th>
                                                    <th class="text-left">Game Type</th>
                                                    <th class="text-left">Ingress</th>
                                                    <th>Images</th>
                                                    <th>GameName_zh_hant</th>
                                                    <th>GameName_zh_hans</th>
                                                    <th>GameName_en</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(game, index) in apiData" :key="game.gameid">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ game.platType }}</td>
                                                    <td class="text-left">{{ game.gameTypeName }}</td>
                                                    <td>{{ game.ingressStatus }}</td>
                                                    <td>{{ game.game_images || 'No Images' }}</td>
                                                    <td>{{ game.gameName_zh_hant }}</td>
                                                    <td>{{ game.gameName_zh_hans }}</td>
                                                    <td>{{ game.gameName_en }}</td>
                                                    <td>{{ game.status == 1 ? 'Active' : 'Inactive' }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- Right Column: Download Button -->
    
                                </div>
                            </div>
    
    
    
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
const responsePlt = ref([]);
const game_platform = ref("");
const errors = ref({});

definePageMeta({
    middleware: 'is-logged-out',
})

const getGamePltwise = async () => {
    try {

        loading.value = true;
        const chk = game_platform.value;
        if (chk == "") {
            alert("Please select");

        } else {
            const response = await axios.get('/api_gameList', {
                params: {
                    platform_name: game_platform.value,
                }

            });
            //console.log(response.data.games);
            apiData.value = response.data.data;
        }

    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};

const gamePlatform = async () => {
    try {
        loading.value = true;
        const url = `/gamePlatformOnly`;
        const response = await axios.get(url);
        responsePlt.value = response.data.data;
        // router.push("/game/allgames/list");
    } catch (error) {

        console.log(error);
    } finally {
        loading.value = false;
    }
};

//gamePlatformOnly
onMounted(() => {
    gamePlatform();
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
