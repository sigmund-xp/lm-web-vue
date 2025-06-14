<template>
  <v-container class="gold-border filter-container py-0 pl-2 pr-2">
    <HorseFilterComponent />
  </v-container>
  <HorseListComponent />
</template>

<script setup>
import HorseFilterComponent from "@/components/HorseFilterComponent.vue";
import HorseListComponent from "@/components/HorseListComponent.vue";
</script>

<style scoped>
.filter-container {
  max-width: none;
}
</style>
