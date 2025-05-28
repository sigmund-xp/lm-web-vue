<template>
  <AppHeader
    v-if="loaded"
    @showAddOwner="showAddOwner"
    @showAddVeterinarian="showAddVeterinarian"
  />
  <v-container
    v-if="loaded && (currentView === 'horseList' || currentView === 'dashboard')"
    class="gold-border filter-container py-0 pl-2 pr-2"
  >
    <AppFilterAdmin />
  </v-container>
  <AppHorseCard v-if="currentView === 'horseList' || currentView === 'dashboard'" />
  <AppUserProfile v-else-if="currentView === 'profile'" />
  <AppAlert
    v-model="dialogVisible"
    :text="dialogText"
    :type="dialogType"
    :sendLogin="dialogSendLogin"
    @update:modelValue="handleAlertClose"
  />
  <AppAddUserDialog v-model="showDialogAddUser" :userType="userType" @created="addUser" />
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

import AppHeader from "../components/AppHeader.vue";
import AppFilterAdmin from "../components/AppFilterAdmin.vue";
import AppHorseCard from "../components/AppHorseCard.vue";
import AppUserProfile from "../components/AppUserProfile.vue";
import AppAlert from "../components/AppAlert.vue";
import AppAddUserDialog from "../components/dialog/AppAddUserDialog.vue";

import { useAuthStore } from "../stores/auth.js";
import { useUserInfoStore } from "../stores/user.js";
import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";

const router = useRouter();
const auth = useAuthStore();
const userInfo = useUserInfoStore();

const loaded = ref(false);
const dialogVisible = ref(false);
const dialogSendLogin = ref(false);
const dialogText = ref("");
const dialogType = ref("warning");
const showDialogAddUser = ref(false);
const userType = ref("");
const currentView = ref("horseList");

onBeforeMount(() => {
  actualizarInfo();
});

async function actualizarInfo() {
  await refreshToken();
  await getUserInfo();
  loaded.value = true;
}

const getUserInfo = async () => {
  try {
    const response = await UserService.getUserInfo(auth.token);
    userInfo.setUserInfo(response.data.userInfo);
  } catch (error) {
    dialogText.value =
      "Acceso restringido. Esta función no está disponible para tu perfil.";
    dialogVisible.value = true;
  }
};

const refreshToken = async () => {
  try {
    const response = await AuthService.refreshToken();
    auth.setToken(response.data.token);
  } catch (error) {
    dialogText.value =
      "Acceso restringido. Esta función no está disponible para tu perfil.";
    dialogVisible.value = true;
    dialogSendLogin.value = true;
  }
};

const handleAlertClose = (sendToLogin) => {
  if (sendToLogin === true) {
    router.push("/");
  }
};

const showAddOwner = (value) => {
  userType.value = "P";
  showDialogAddUser.value = value;
};

const showAddVeterinarian = (value) => {
  userType.value = "V";
  showDialogAddUser.value = value;
};

const addUser = async (user) => {
  try {
    await UserService.createUser(user, auth.token);
    dialogText.value = "Usuario creado.";
    dialogType.value = "info";
    dialogVisible.value = true;
    showDialogAddUser.value = false;
  } catch (error) {
    dialogText.value = error.response.data.error;
    dialogType.value = "warning";
    dialogVisible.value = true;
  }
};
</script>

<style scoped>
.filter-container {
  max-width: none;
}
</style>
