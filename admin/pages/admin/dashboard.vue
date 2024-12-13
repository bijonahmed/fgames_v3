<template>
  <title>Admin Dashboard</title>
  <div class="content-wrapper mt-3" v-if="userRoleIsAdmin">
    <section class="content" v-if="userStatusIsAdmin">
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card card-secondary">
                <div class="card-header">
                  <h3 class="card-title">Welcome to {{user_name}}</h3>
                </div>
               
                <div class="card-body">
                  <GoogleTranslate />
                  <div class="row">
                    <div class="container-fluid">
                      <div class="row">
                        <center>
                          <div
                            class="loading-indicator"
                            v-if="loading"
                            style="text-align: center"
                          >
                            <Loader />
                          </div>
                        </center>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-warning"
                              ><i class="fas fa-user-circle"></i
                            ></span>
                            <nuxt-link
                              to="/usermanagement/userlist"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text">Total Users</span>
                                <span class="info-box-number">{{
                                  total_users
                                }}</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-info"
                              ><i class="fa fa-money"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/deposit-management"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text">Total Deposit</span>
                                <span class="info-box-number">{{
                                  total_deposit
                                }}</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-success"
                              ><i class="fa fa-money-bill"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/withdrawal-management"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text"
                                  >Total Withdrawal</span
                                >
                                <span class="info-box-number">{{
                                  total_withdraw
                                }}</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-danger"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/reward-center-management"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text"
                                  >Reward Request</span
                                >
                                <span class="info-box-number">0</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-danger"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/loan-management"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text">Loan Request</span>
                                <span class="info-box-number">0</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-primary"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/pay-loan-return-management"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text"
                                  >Pay (Loan Return)</span
                                >
                                <span class="info-box-number">0</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-danger"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/trade-request-management"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text">Trade Request</span>
                                <span class="info-box-number">0</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-primary"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <nuxt-link
                              to="/api/apilist"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text">API Zone</span>
                                <span class="info-box-number">{{
                                  total_api_counts
                                }}</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12">
                          <div class="info-box">
                            <span class="info-box-icon bg-primary"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <nuxt-link
                              to="/walletmanagement/manual-adjustment-report"
                              style="text-decoration: none"
                            >
                              <div class="info-box-content">
                                <span class="info-box-text"
                                  >Manual Adjustment</span
                                >
                                <span class="info-box-number">0</span>
                              </div>
                            </nuxt-link>
                          </div>
                        </div>

                        <div class="col-md-3 col-sm-6 col-12 d-none">
                          <div class="info-box">
                            <span class="info-box-icon bg-danger"
                              ><i class="fa fa-product-hunt"></i
                            ></span>
                            <div class="info-box-content">
                              <span class="info-box-text">Total Products</span>
                              <span class="info-box-number">{{
                                total_products
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <ChartComponent />
                        </div>
                        <!-- <div class="col-6">
                          <usersJoinReg />
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
  <!--end page wrapper -->
</template>

<script setup>
import GoogleTranslate from '~/components/GoogleTranslate.vue'
import ChartComponent from "~/components/usersJoinCharts.vue";
import usersJoinReg from "~/components/usersJoinReg.vue";
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from "pinia";
import axios from "axios";

const router = useRouter();
const userStore = useUserStore();
const total_deposit = ref(0);
const total_withdraw = ref(0);
const total_users = ref(0);
const total_products = ref(0);
const total_api_counts = ref(0);
const user_name = ref('');

const { email } = storeToRefs(userStore);
const loading = ref(true);
definePageMeta({
  middleware: "is-logged-out",
});

const userRoleIsAdmin = computed(() => userStore.role_id === 1);
const userStatusIsAdmin = computed(() => userStore.status === 1);
const fetchData = async () => {
  try {
    const response = await axios.get(`/product/dashboardCounting`);
    total_deposit.value = response.data.total_deposit;
    total_withdraw.value = response.data.total_withdraw;
    total_users.value = response.data.total_users;
    total_products.value = response.data.total_products;
    total_api_counts.value = response.data.api_counts;
    user_name.value = response.data.user_name;
  } catch (error) {
    // Handle error
  } finally {
    //loading.value = false;
  }
};

onMounted(async () => {
  // After 5 seconds, hide the loading indicator
  setTimeout(() => {
    loading.value = false; // Hide the loading indicator after 5 seconds
  }, 500);

  try {
    fetchData();
    await userStore.getUser();
  } catch (error) {
    //  console.log(error)
  }
});
</script>
