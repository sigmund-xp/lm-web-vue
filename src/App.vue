<template>
  <v-app>
    <LoadingScreen v-if="ui.loading" />
    <v-main v-else class="dark-color">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useUIStore } from "@/stores/uiStore";
import LoadingScreen from "@/components/LoadingScreen.vue";

const ui = useUIStore();
</script>

<style scoped>
.v-application {
  overflow-y: hidden;
}
</style>
