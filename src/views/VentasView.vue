<template>
  <v-app>
    <v-main class="bg-black py-16">
      <v-container>
        <h1 class="text-gold text-h4 font-weight-bold mb-8">Caballos en Venta</h1>
        <v-card class="pa-4 mb-8" color="#1e1e1e" flat>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="filtros.nombre"
                label="Nombre"
                variant="underlined"
                color="gold"
                class="text-gold"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="filtros.razas"
                :items="razasUnicas"
                label="Raza"
                multiple
                chips
                clearable
                variant="underlined"
                color="gold"
                class="text-gold"
                hide-details
              >
                <template #chip="{ item, props }">
                  <v-chip v-bind="props" color="gold" class="text-black" size="small">
                    {{ item.title }}
                  </v-chip>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12" sm="6" md="3">
              <v-slider
                v-model="filtros.edad"
                :min="1"
                :max="20"
                :step="1"
                range
                color="gold"
                track-color="#333"
                thumb-label
                label="Edad (años)"
                class="text-gold"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="3"
              class="d-flex flex-column justify-center h-100"
            >
              <v-slider
                v-model="filtros.altura"
                :min="140"
                :max="200"
                :step="1"
                range
                color="gold"
                track-color="#333"
                thumb-label
                label="Alzada (cm)"
                class="text-gold"
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-checkbox
                v-model="filtros.soloDisponibles"
                label="Mostrar solo disponibles"
                color="gold"
                hide-details
                class="text-gold"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-spacer />
            <v-col cols="6" sm="3" class="d-fxlex alixgn-start">
              <v-btn
                color="#c5a044"
                class="text-black font-weight-bold"
                block
                @click="limpiarFiltros"
                >Limpiar</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <!-- Lista de caballos -->
        <v-row>
          <v-col
            v-for="(caballo, i) in caballosFiltrados"
            :key="i"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="horse-card" flat color="#1e1e1e" rounded="xl">
              <v-img :src="caballo.img" height="200" cover class="rounded-t-xl" />
              <v-card-text class="text-grey-lighten-2">
                <h3 class="text-gold text-h6 font-weight-bold mb-2">
                  {{ caballo.nombre }}
                </h3>
                <p class="mb-1"><strong>Raza:</strong> {{ caballo.raza }}</p>
                <p class="mb-1"><strong>Edad:</strong> {{ caballo.edad }}</p>
                <p class="mb-1"><strong>Alzada:</strong> {{ caballo.altura }}</p>
                <p class="mb-1">
                  <v-chip
                    :color="caballo.disponible ? 'green' : 'red'"
                    class="text-white"
                    size="small"
                    label
                  >
                    {{ caballo.disponible ? "Disponible" : "No disponible" }}
                  </v-chip>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="gold" block class="text-black" :to="`/venta/${caballo.id}`">
                  Ver detalle
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

const caballos = ref([
  {
    id: 1,
    nombre: "Luna",
    raza: "Pura Sangre",
    edad: "4 años",
    altura: "1.60m",
    disponible: true,
    img: "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35",
  },
  {
    id: 2,
    nombre: "Tormenta",
    raza: "Criollo",
    edad: "6 años",
    altura: "1.52m",
    disponible: false,
    img: "https://images.unsplash.com/photo-1553284966-b5a78b713b9e",
  },
  {
    id: 3,
    nombre: "Fénix",
    raza: "Árabe",
    edad: "5 años",
    altura: "1.55m",
    disponible: true,
    img: "https://images.unsplash.com/photo-1553284966-3e6bfa8fba46",
  },
]);

const filtros = ref({
  soloDisponibles: false,
  razas: [],
  nombre: "",
  edad: [1, 20],
  altura: [140, 180],
});

const razasUnicas = computed(() => {
  const todas = caballos.value.map((c) => c.raza);
  return [...new Set(todas)];
});

const caballosFiltrados = computed(() => {
  return caballos.value.filter((caballo) => {
    const edadNum = parseInt(caballo.edad);
    const alzadaNum = parseFloat(caballo.altura.replace("m", "").replace(",", ".")) * 100;

    const matchDisponibilidad = !filtros.value.soloDisponibles || caballo.disponible;

    const matchRaza =
      filtros.value.razas.length === 0 || filtros.value.razas.includes(caballo.raza);

    const matchNombre = caballo.nombre
      .toLowerCase()
      .includes(filtros.value.nombre.toLowerCase());

    const matchEdad =
      edadNum >= filtros.value.edad[0] && edadNum <= filtros.value.edad[1];

    const matchAlzada =
      alzadaNum >= filtros.value.altura[0] && alzadaNum <= filtros.value.altura[1];

    return matchDisponibilidad && matchRaza && matchNombre && matchEdad && matchAlzada;
  });
});

const limpiarFiltros = () => {
  filtros.value = {
    soloDisponibles: false,
    razas: [],
    nombre: "",
    edad: [1, 20],
    altura: [140, 180],
  };
};
</script>

<style scoped>
.text-gold {
  color: #c5a044 !important;
}
.horse-card {
  border: 1px solid rgba(197, 160, 68, 0.2);
  transition: transform 0.3s ease;
}
.horse-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(197, 160, 68, 0.2);
  border-color: #c5a044;
}
</style>
