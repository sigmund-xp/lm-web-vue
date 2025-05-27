<template>
  <v-app>
    <v-main class="dark-color">
      <router-view />
      <v-footer
        app
        color="#111"
        class="d-flex align-center justify-center gold-top-border mt-6 text-grey"
        width="100%"
      >
        © 2025 Las Marías
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.v-application {
  overflow-y: hidden;
}
</style>
