<template>
  <v-container class="login-container" max-width="400">
    <v-row justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo-lm.png')"
          alt="Logo Las Marías"
          class="mb-6"
          width="100%"
          contain
        ></v-img>

        <v-form @submit.prevent="login" ref="form">
          <v-text-field
            v-model="usuario.email"
            class="text-gold"
            label="Correo electrónico"
            type="email"
            ref="email"
            prepend-inner-icon="mdi-email"
          />

          <v-text-field
            v-model="usuario.password"
            class="text-gold"
            label="Contraseña"
            type="password"
            prepend-inner-icon="mdi-lock"
          />

          <v-btn class="text-black mb-3" color="#C5A044" block @click.prevent="login">
            Entrar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <AlertComponent v-model="dialogVisible" :text="dialogText" :type="dialogType" />
  </v-container>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService.js";
import AlertComponent from "@/components/AlertComponent.vue";

const router = useRouter();

const dialogVisible = ref(false);
const dialogText = ref("");
const dialogType = ref("warning");
const email = ref(null);

onMounted(async () => {
  await nextTick();
  if (email.value) {
    email.value.focus();
  }
});

const usuario = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    await AuthService.login({
      email: usuario.email,
      password: usuario.password,
    });
    router.push("/dashboard");
  } catch (error) {
    dialogText.value = error.response.data.error;
    dialogVisible.value = true;
  }
};
</script>

<style scoped>
.login-container {
  margin-top: 1rem;
}
.close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
}
</style>
