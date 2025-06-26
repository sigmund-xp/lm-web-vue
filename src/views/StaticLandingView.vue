<template>
  <v-app>
    <v-app-bar
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
          <v-btn class="black-pure ml-1" @click.prevent="scrollTo('clases')"
            >Clases</v-btn
          >
          <v-btn class="black-pure ml-1" @click.prevent="scrollTo('venta')"
            >Venta de Caballos</v-btn
          >
          <v-btn class="black-pure ml-1" to="/contacto">Contacto</v-btn>
        </v-row>
        <v-btn
          class="text-black bg-gold font-weight-bold d-none d-md-inline-flex"
          rounded
          to="/login"
          >Ingresar</v-btn
        >
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
    <v-main id="inicio">
      <div
        class="d-flex flex-column align-center justify-center text-center"
        style="
          height: 100vh;
          background: url('https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?auto=format&fit=crop&w=1470&q=80')
            center center / cover no-repeat;
          position: relative;
        "
      >
        <div
          style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
          "
        ></div>
        <div style="z-index: 1; max-width: 700px; padding: 1rem">
          <h1 class="display-2 font-weight-bold text-gold">
            Excelencia Ecuestre en Las Marías
          </h1>
          <p class="text-grey text-subtitle-1 mt-4">
            Descubre el arte de la equitación en un entorno único, donde tradición y
            pasión se encuentran.
          </p>
          <v-btn
            color="#C5A044"
            class="mt-6 text-black font-weight-bold"
            rounded
            to="#clases"
            >Ver Clases</v-btn
          >
        </div>
      </div>
      <!-- Sección Clases - Versión Dual -->
      <section id="clases" class="py-16 bg-grey-darken-4">
        <v-container>
          <h2 class="text-center text-gold text-h3 mb-10">Nuestras Clases</h2>
          <div class="d-block d-md-none">
            <v-carousel hide-delimiters show-arrows height="auto">
              <template v-slot:prev="{ props }">
                <v-btn
                  @click="props.onClick"
                  icon="mdi-chevron-left"
                  color="#C5A044"
                  size="small"
                />
              </template>
              <template v-slot:next="{ props }">
                <v-btn
                  @click="props.onClick"
                  icon="mdi-chevron-right"
                  color="#C5A044"
                  size="small"
                />
              </template>
              <v-carousel-item v-for="(clase, index) in clases" :key="'mobile-' + index">
                <v-card class="bg-black text-grey hover-card">
                  <v-img :src="clase.img" height="250" cover class="grayscale"></v-img>
                  <v-card-text class="pa-6">
                    <h3 class="text-gold text-h6 mb-3">{{ clase.titulo }}</h3>
                    <v-divider color="#C5A044" class="mb-3"></v-divider>
                    <p class="text-grey-lighten-1 mb-4">{{ clase.fecha }}</p>
                  </v-card-text>
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </div>
          <v-row class="d-none d-md-flex" dense>
            <v-col
              cols="12"
              md="4"
              v-for="(clase, index) in clases"
              :key="'desktop-' + index"
            >
              <v-card class="bg-black text-grey hover-card">
                <v-img :src="clase.img" height="250" cover class="grayscale"></v-img>
                <v-card-text class="pa-6">
                  <h3 class="text-gold text-h6 mb-3">{{ clase.titulo }}</h3>
                  <v-divider color="#C5A044" class="mb-3"></v-divider>
                  <p class="text-grey-lighten-1 mb-4">{{ clase.fecha }}</p>
                  <ul class="text-grey-lighten-2 pl-4 mb-4">
                    <li v-for="(benefit, i) in clase.beneficios" :key="i" class="mb-2">
                      <v-icon small color="#C5A044" class="mr-2">mdi-check</v-icon>
                      {{ benefit }}
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Botón común para ambas versiones -->
          <div class="text-center mt-8">
            <v-btn
              color="#C5A044"
              class="text-black font-weight-bold"
              rounded
              size="large"
              to="/clases"
            >
              Más Información
            </v-btn>
          </div>
        </v-container>
      </section>
      <section id="venta" class="py-16 bg-grey-darken-4">
        <v-container>
          <div class="text-center mb-12">
            <h2 class="text-gold text-h3 font-weight-bold mb-4">Caballos Disponibles</h2>
            <v-divider
              color="#C5A044"
              thickness="2"
              class="mx-auto"
              style="max-width: 100px"
            ></v-divider>
            <p class="text-grey-lighten-2 mt-4 mx-auto" style="max-width: 700px">
              Descubre nuestros ejemplares de élite, cuidadosamente seleccionados y
              entrenados para máxima performance.
            </p>
          </div>

          <!-- Tarjetas de Caballos -->
          <v-row class="justify-center">
            <v-col cols="12" md="4" v-for="(caballo, index) in caballos" :key="index">
              <v-card
                class="elevation-8 horse-card"
                :class="{ 'mr-md-4': index < caballos.length - 1 }"
              >
                <!-- Imagen con efecto de zoom -->
                <div class="horse-image-container">
                  <v-img
                    :src="caballo.img"
                    height="320"
                    cover
                    class="horse-image"
                  ></v-img>
                  <div class="horse-overlay d-flex align-end">
                    <v-chip variant="outlined" color="#C5A044" class="ma-2">
                      <v-icon left>mdi-heart</v-icon>
                      Disponible
                    </v-chip>
                  </div>
                </div>

                <!-- Contenido de la tarjeta -->
                <v-card-text class="pa-6">
                  <h3 class="text-gold text-h5 font-weight-bold mb-2">
                    {{ caballo.titulo }}
                  </h3>
                  <v-divider color="#C5A044" class="my-3"></v-divider>

                  <v-row class="mb-2">
                    <v-col cols="6">
                      <div class="d-flex align-center">
                        <v-icon small color="#C5A044" class="mr-2">mdi-ruler</v-icon>
                        <span class="text-grey-lighten-2">{{ caballo.altura }}</span>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="d-flex align-center">
                        <v-icon small color="#C5A044" class="mr-2">mdi-cake</v-icon>
                        <span class="text-grey-lighten-2">{{ caballo.edad }}</span>
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <div class="d-flex align-center mb-2">
                        <v-icon small color="#C5A044" class="mr-2">mdi-hoof</v-icon>
                        <span class="text-grey-lighten-2">{{ caballo.raza }}</span>
                      </div>
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
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-main>
    <v-footer app color="#111" class="text-center text-md-left">
      <v-container class="py-8">
        <v-row>
          <!-- Columna 1: Logo y descripción -->
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

          <!-- Columna 2: Contacto -->
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

          <!-- Columna 3: Redes sociales -->
          <v-col cols="12" md="4">
            <h3 class="text-gold text-h6 mb-4 font-weight-bold">REDES SOCIALES</h3>
            <div class="d-flex justify-center justify-md-start gap-4">
              <v-btn
                icon="mdi-facebook"
                variant="text"
                color="#C5A044"
                size="large"
              ></v-btn>
              <v-btn
                icon="mdi-instagram"
                variant="text"
                color="#C5A044"
                size="large"
              ></v-btn>
              <v-btn
                icon="mdi-youtube"
                variant="text"
                color="#C5A044"
                size="large"
              ></v-btn>
            </div>
            <v-divider color="#C5A044" class="my-4"></v-divider>
            <p class="text-grey-lighten-2 mt-4">© 2025 Las Marías Centro Equestre.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const mobileMenu = ref(false);

const navItems = [
  { text: "Inicio", to: "#inicio" },
  { text: "Clases", to: "#clases" },
  { text: "Venta de Caballos", to: "#venta" },
  { text: "Contacto", to: "#contacto" },
  { text: "Ingresar", to: "/login" },
];

const clases = [
  {
    titulo: "Clases para Niños",
    img: "https://images.unsplash.com/photo-1605000797499-95e51c52685e",
    fecha: "Martes a Domingo",
    beneficios: [
      "Iniciación ecuestre segura",
      "Caballos especialmente dóciles",
      "Grupos reducidos",
      "Enfoque lúdico y educativo",
      "Equipo de protección incluido",
    ],
  },
  {
    titulo: "Clases para Adultos",
    img: "https://images.unsplash.com/photo-1553284965-5dd8352ff1bd",
    fecha: "Martes a Domingo",
    beneficios: [
      "Técnicas básicas/intermedias",
      "Preparación física específica",
      "Instrucción personalizada",
      "Práctica en pista y exterior",
      "Manejo y cuidado del caballo",
    ],
  },
  {
    titulo: "Clases Avanzadas",
    img: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6",
    fecha: "Martes a Domingo",
    beneficios: [
      "Saltos hasta 1.10m",
      "Adiestramiento técnico",
      "Preparación para competencias",
      "Video-análisis de técnica",
      "Entrenamiento de alto rendimiento",
    ],
  },
];

const caballos = [
  {
    titulo: "Pura Sangre",
    img: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35",
    edad: "5 años",
    altura: "1.65m",
    raza: "Pura Sangre Inglés",
    caracteristicas: [
      "Campeón en 3 torneos nacionales",
      "Temperamento equilibrado",
      "Excelente para salto",
    ],
  },
  {
    titulo: "Cuarto de Milla",
    img: "https://images.unsplash.com/photo-1553284966-3e6bfa8fba46",
    edad: "4 años",
    altura: "1.55m",
    raza: "Quarter Horse",
    caracteristicas: [
      "Velocidad comprobada",
      "Ideal para rodeo",
      "Adiestramiento western",
    ],
  },
  {
    titulo: "Árabe",
    img: "https://images.unsplash.com/photo-1553284966-b5a78b713b9e",
    edad: "6 años",
    altura: "1.50m",
    raza: "Árabe Puro",
    caracteristicas: [
      "Resistencia excepcional",
      "Morfológicamente perfecto",
      "Genealogía certificada",
    ],
  },
];
const handleMenuClick = (item) => {
  scrollTo(item.to);
  mobileMenu.value = false;
};
const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
<style scoped>
html {
  overflow-x: hidden;
}
.v-container {
  max-width: 100%;
}
.bg-gold {
  background-color: #c5a044 !important;
}
.bg-black {
  background-color: #000 !important;
}
.grayscale {
  filter: grayscale(30%);
  transition: filter 0.4s;
}
.grayscale:hover {
  filter: grayscale(0%);
}

.v-slide-group__next,
.v-slide-group__prev {
  background: rgba(197, 160, 68, 0.7) !important;
  border-radius: 50%;
}
.v-slide-group__content {
  padding-bottom: 12px;
}
.v-slide-group__dot {
  background-color: #c5a044 !important;
}
.hover-card {
  transition: transform 0.3s;
  border: 1px solid rgba(197, 160, 68, 0.3);
  background: #1a1a1a !important;
}
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(197, 160, 68, 0.15) !important;
  border-color: #c5a044;
}
.image-container {
  position: relative;
  overflow: hidden;
}
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(197, 160, 68, 0.1), rgba(0, 0, 0, 0.7));
}
ul {
  list-style-type: none;
}

.horse-card {
  transition: all 0.4s ease;
  background: #1e1e1e !important;
  border: 1px solid rgba(197, 160, 68, 0.2);
}
.horse-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(197, 160, 68, 0.1) !important;
  border-color: #c5a044;
}
.horse-image-container {
  position: relative;
  overflow: hidden;
}
.horse-image {
  transition: transform 0.5s ease;
}
.horse-card:hover .horse-image {
  transform: scale(1.05);
}
.horse-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
}
.v-chip {
  border-width: 1px !important;
}
.drawer-link {
  background-color: #111 !important;
  color: #c5a044 !important;
  transition: background-color 0.3s ease !important;
}

.drawer-link:hover {
  background-color: #1f1f1f !important;
  color: #f0d089 !important;
}
</style>
<style>
.v-btn.black-pure {
  background: #000 !important;
  color: #c5a044 !important;
  position: relative;
  transition: color 0.3s;
  --v-theme-overlay-multiplier: 0 !important;
}

.v-btn.black-pure::before {
  background-color: transparent !important;
}

.v-btn.black-pure:hover {
  background-color: #1a1203 !important;
}
</style>
