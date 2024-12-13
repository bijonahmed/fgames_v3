<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <!-- <center>
       ==={{ isActive }}===
      </center> -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li v-for="(menuItem, index) in menuItems" :key="index"
            :class="{ 'nav-item': true, 'menu-open': menuItem.children }">
            <router-link :to="menuItem.route ? menuItem.route : '#'" class="nav-link">
              <i :class="'nav-icon fas ' + menuItem.icon"></i>
              <p>
                {{ menuItem.label }}
                <i v-if="menuItem.children" class="right fas fa-angle-left"></i>
              </p>
            </router-link>

            <ul v-if="menuItem.children" class="nav nav-treeview">
              <li v-for="(childItem, childIndex) in menuItem.children" :key="childIndex" class="nav-item">
                <router-link :to="childItem.route" class="nav-link">
                  <p>{{ childItem.label }}</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const isActive = ref(null);
//const userStatusIsAdmin = computed(() => userStore.status === 1);
const fetchData = async () => {
  try {
    const response = await axios.post(`/auth/me`);
    console.log("====" + response.data.status);
    isActive.value = response.data.status;
  } catch (error) {
    console.log("--------------------" + error);
    // Handle error
  } finally {
  }
};
onMounted(async () => {
  fetchData();
});
const menuItems = ref([
  {
    label: "Dashboard",
    icon: "fa-home",
    badge: "New",
    open: false,
    route: "/admin/dashboard",
    children: null,
  },
  {
    label: "Profile",
    icon: "fa-th",
    badge: "New",
    open: false,
    route: "/user/my-profile",
    children: null,
  },

  {
    label: "User Management",
    icon: "nav-icon fas fa-users",
    badge: "6",
    open: false,
    route: null,
    children: [

      { label: "Super Admin list", icon: "fa-circle", route: "/usermanagement/superadmin-list", },
      { label: "User list", icon: "fa-circle", route: "/usermanagement/userlist", },
      { label: 'Affiliate ', icon: 'fa-circle', route: '/usermanagement/affiliate' },


    ],
  },


  {
    label: 'Data Management',
    icon: 'fa-folder',
    badge: '',
    open: false,
    route: null,
    children: [
      { label: 'API Pictures Gallery', icon: 'fa-circle', route: '/gallery/porn-star-gallery' },
      { label: 'Hosters Lists', icon: 'fa-circle', route: '/usermanagement/modellist' },
      { label: 'Online Live Room List', icon: 'fa-circle', route: '/api/online-room' },
      { label: 'FG Gallery (Frontend)', icon: 'fa-circle', route: '/gallery/fgGallery' },
    ]
  },

  {
    label: 'Game Management',
    icon: 'fa-folder',
    badge: '',
    open: false,
    route: null,
    children: [
      { label: 'Gaming Type', icon: 'fa-circle', route: '/game/type/list' },
      { label: 'Gaming Platform', icon: 'fa-circle', route: '/game/platform/list' },
      { label: 'Games List', icon: 'fa-circle', route: '/game/allgames/list' },
      { label: 'Games List (Translate)', icon: 'fa-circle', route: '/game/allgames/list-translate' },
      { label: 'Player List', icon: 'fa-circle', route: '/game/player/list' },

    ]
  },
  {
    label: 'Post Management',
    icon: 'fa-folder',
    badge: '',
    open: false,
    route: null,
    children: [
      { label: 'Add Post', icon: 'fa-circle', route: '/post/add' },
      { label: 'Post List', icon: 'fa-circle', route: '/post/list' },

    ]
  },

  {
    label: "System settings",
    icon: "nav-icon fas fa-cog",
    badge: "6",
    open: false,
    route: null,
    children: [
      { label: 'Translation ', icon: 'fa-circle', route: '/setting/language/translation-list' },
      { label: 'Language List', icon: 'fa-circle', route: '/setting/language/list' },
      { label: 'Porn Category List', icon: 'fa-circle', route: '/category/list' },
      { label: 'Reward Center List', icon: 'fa-circle', route: '/setting/reward/rewardcenter-list' },
      { label: "Global Wallet Address", icon: "fa-circle", route: "/setting/wallet/globalwalletAddressList" },
      { label: "Notification", icon: "fa-circle", route: "/setting/notificationlist" },
      { label: "Pre-Setting", icon: "fa-circle", route: "/setting/presetting" },

    ],
  },


  {
    label: "Wallet Management",
    icon: "nav-icon fas fa-cog",
    badge: "6",
    open: false,
    route: null,
    children: [
      { label: "Deposit Request ", icon: "fa-circle", route: "/walletmanagement/deposit-management", },
      { label: "Withdrawal Request", icon: "fa-circle", route: "/walletmanagement/withdrawal-management", },
      { label: "Reward center Request", icon: "fa-circle", route: "/walletmanagement/reward-center-management", },
      { label: "All User with Address", icon: "fa-circle", route: "/walletmanagement/withdrawal-address", },
      { label: "Manual Adjustment report", icon: "fa-circle", route: "/walletmanagement/manual-adjustment-report", },
      { label: "Create Manual adjustment", icon: "fa-circle", route: "/walletmanagement/manual-adjustment", },

    ],
  },
]);

const toggleMenu = (item) => {
  item.open = !item.open;
};
</script>
<style>
body:not(.layout-fixed) .main-sidebar {
  min-height: 100vh;
  position: fixed;
}

.disabled {
  pointer-events: none;
  color: #ccc;
}
</style>