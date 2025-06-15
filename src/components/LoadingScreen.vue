<template>
  <div class="loading-screen">
    <v-container class="fill-height d-flex align-center justify-center">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-container>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background-color: white;
  z-index: 9999;
}
</style>
