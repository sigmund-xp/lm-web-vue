<template>
  <v-container
    class="d-flex flex-column justify-center align-center text-center"
    max-width="400"
  >
    <v-img
      :src="require('../assets/logo-lm.jpg')"
      alt="Logo Las Marías"
      class="mb-6"
      width="100%"
      contain
    ></v-img>
    <template>
      <h2 class="text-gold mb-2">Usuario no encontrado</h2>
      <p class="text-gold mb-6">
        No pudimos verificar al usuario. Es posible que el enlace haya expirado o sea
        incorrecto.
      </p>
      <v-btn class="text-black mb-3" color="#C5A044" @click.prevent="volver"
        >Volver</v-btn
      >
    </template>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const volver = async () => {
  router.push("/");
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
</style>
