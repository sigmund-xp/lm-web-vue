<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      density="comfortable"
      flat
      elevate-on-scroll
      class="border-b border-yellow-darken-2 px-0"
      height="100"
    >
      <v-container class="d-flex justify-space-between align-center" fluid>
        <v-img
          :src="require('../assets/logo-lm-header.png')"
          height="80"
          max-width="200"
          contain
          @click="router.push('/')"
        />
        <v-spacer></v-spacer>
        <v-row
          class="d-none d-md-flex ml-auto"
          align="center"
          no-gutters
          style="flex: none; padding-right: 1em"
        >
          <v-btn class="black-pure ml-1" to="/">Inicio</v-btn>
          <v-btn class="black-pure ml-1" to="/venta">Venta de Caballos</v-btn>
          <v-btn class="black-pure ml-1" to="/contacto">Contacto</v-btn>
        </v-row>
        <v-app-bar-nav-icon
          class="d-md-none text-gold"
          @click="mobileMenu = !mobileMenu"
        />
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="mobileMenu"
      location="right"
      temporary
      style="top: 80px"
      color="#111"
    >
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.text"
          :href="item.to"
          tag="a"
          class="drawer-link"
          @click="handleMenuClick(item)"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-grey-darken-4 py-16" style="marxgin-top: 100px; background: red">
      <v-container class="pt-16">
        <v-row class="mb-10">
          <v-col cols="12" md="6">
            <h1 class="text-gold text-h3 font-weight-bold mb-4">
              {{ caballo.titulo }}
            </h1>
            <v-divider color="#C5A044" class="mb-4"></v-divider>
            <v-row>
              <v-col cols="6">
                <v-icon color="#C5A044" class="mr-2">mdi-ruler</v-icon>
                <span class="text-grey-lighten-2">{{ caballo.altura }}</span>
              </v-col>
              <v-col cols="6">
                <v-icon color="#C5A044" class="mr-2">mdi-cake</v-icon>
                <span class="text-grey-lighten-2">{{ caballo.edad }}</span>
              </v-col>
            </v-row>
            <v-row class="mt-2 mb-4">
              <v-col cols="12">
                <v-icon color="#C5A044" class="mr-2">mdi-hoof</v-icon>
                <span class="text-grey-lighten-2">{{ caballo.raza }}</span>
              </v-col>
            </v-row>
            <ul class="text-grey-lighten-2 pl-4 mt-3">
              <li
                v-for="(caracteristica, i) in caballo.caracteristicas"
                :key="i"
                class="mb-1"
              >
                <v-icon x-small color="#C5A044" class="mr-2">mdi-star</v-icon>
                {{ caracteristica }}
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col
                v-for="(item, index) in caballo.media"
                :key="index"
                class="d-flex child-flex"
                cols="4"
              >
                <div
                  v-if="item.type === 'v'"
                  class="video-wrapper"
                  @click.prevent="abrirMedia(item)"
                >
                  <v-icon icon="mdi-filmstrip" class="video-icon" />
                  <video
                    playsinline
                    preload="metadata"
                    :src="item.src"
                    class="horse-img video-thumb"
                  />
                </div>
                <v-img
                  v-else
                  :lazy-src="item.src"
                  :src="item.src"
                  aspect-ratio="1"
                  class="horse-img"
                  @click.prevent="abrirMedia(item)"
                >
                  <template v-slot:placeholder>
                    <v-row align="center" class="fill-height ma-0" justify="center">
                      <v-progress-circular color="grey-lighten-5" indeterminate />
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="#111" class="text-center text-md-left">
      <v-container class="py-8">
        <v-row>
          <v-col cols="12" md="4" class="mb-4 mb-md-0">
            <v-img
              :src="require('../assets/logo-lm-header.png')"
              max-width="120"
              class="mx-auto mx-md-0 mb-4"
            />
            <p class="text-grey-lighten-1">
              Centro ecuestre dedicado a la excelencia en equitación y cuidado de
              caballos.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="mb-4 mb-md-0">
            <h3 class="text-gold text-h6 mb-4 font-weight-bold">CONTACTO</h3>
            <ul class="text-grey-lighten-1 pl-0" style="list-style: none">
              <li class="mb-2">
                <v-icon icon="mdi-email" color="#C5A044" class="mr-2"></v-icon>
                info@lasmarias.com
              </li>
              <li class="mb-2">
                <v-icon icon="mdi-phone" color="#C5A044" class="mr-2"></v-icon>
                +54 9 11 1234 5678
              </li>
              <li>
                <v-icon icon="mdi-map-marker" color="#C5A044" class="mr-2"></v-icon>
                Ruta 40, Salta, Argentina
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="text-gold text-h6 mb-4 font-weight-bold">REDES SOCIALES</h3>
            <div class="d-flex justify-center justify-md-start gap-4">
              <v-btn icon="mdi-facebook" variant="text" color="#C5A044" size="large" />
              <v-btn icon="mdi-instagram" variant="text" color="#C5A044" size="large" />
              <v-btn icon="mdi-youtube" variant="text" color="#C5A044" size="large" />
            </div>
            <v-divider color="#C5A044" class="my-4"></v-divider>
            <p class="text-grey-lighten-2 mt-4">© 2025 Las Marías Centro Ecuestre.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <v-dialog v-model="dialog" width="60vw" transition="dialog-bottom-transition">
      <v-card class="bg-black">
        <v-toolbar flat color="black">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-responsive
          v-if="imagenSeleccionada.type === 'v'"
          :aspect-ratio="16 / 9"
          max-width="100%"
          style="text-align: center"
          class="w-100"
        >
          <video
            controls
            playsinline
            preload="metadata"
            :src="imagenSeleccionada.src"
            class="horse-img video-thumb"
          />
        </v-responsive>
        <!-- IMAGEN -->
        <v-responsive v-else :aspect-ratio="4 / 3" max-width="100%" class="w-100">
          <v-img :src="imagenSeleccionada.src" cover class="w-100 h-100" />
        </v-responsive>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const mobileMenu = ref(false);
const dialog = ref(false);
const imagenSeleccionada = ref(null);

const navItems = [
  { text: "Inicio", to: "/" },
  { text: "Contacto", to: "/contacto" },
  { text: "Venta de Caballos", to: "/venta" },
];

const caballo = {
  titulo: "Pura Sangre",
  media: [
    //    { src: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35", type: "i" },
    //    { src: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35", type: "i" },
    //    { src: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35", type: "i" },
    //    { src: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35", type: "i" },
    { src: "../horno.mp4", type: "v" },
    { src: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35", type: "i" },
    { src: "../test.mp4", type: "v" },
  ],
  edad: "5 años",
  altura: "1.65m",
  raza: "Pura Sangre Inglés",
  caracteristicas: [
    "Campeón en 3 torneos nacionales",
    "Temperamento equilibrado",
    "Excelente para salto",
  ],
};

const handleMenuClick = (item) => {
  scrollTo(item.to);
  mobileMenu.value = false;
};
const scrollTo = (id) => {
  const element = document.getElementById(id.replace("#", ""));
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const abrirMedia = (item) => {
  imagenSeleccionada.value = item;
  dialog.value = true;
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.bg-gold {
  background-color: #c5a044 !important;
}
.black-pure {
  background: #000 !important;
  color: #c5a044 !important;
  transition: color 0.3s;
}
.black-pure:hover {
  background-color: #1a1203 !important;
}
.drawer-link {
  background-color: #111 !important;
  color: #c5a044 !important;
  transition: background-color 0.3s ease;
}
.drawer-link:hover {
  background-color: #1f1f1f !important;
  color: #f0d089 !important;
}
.horse-img {
  transition: all 0.4s ease;
  background: #1e1e1e !important;
  border: 1px solid rgba(197, 160, 68, 0.2);
}
.horse-img:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(197, 160, 68, 0.1) !important;
  border-color: #c5a044;
}
.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
  align-items: center;
  justify-content: center;
  position: relative;
  display: inline-block;
}
.video-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: auto;
}
.video-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  z-index: 2;
}
</style>
