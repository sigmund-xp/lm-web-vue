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
    <v-main class="bg-grey-darken-4 py-16" style="marxgin-top: 100px">
      <v-container class="pt-16">
        <div class="text-center mb-12">
          <h2 class="text-gold text-h3 font-weight-bold mb-4">Contacto</h2>
          <v-divider
            color="#C5A044"
            thickness="2"
            class="mx-auto"
            style="max-width: 100px"
          />
          <p class="text-grey-lighten-2 mt-4 mx-auto" style="max-width: 700px">
            ¿Tenés alguna consulta o querés saber más sobre nuestras clases o caballos?
            Escribinos y te responderemos a la brevedad.
          </p>
        </div>

        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-6 contacto-card" elevation="8">
              <v-form v-model="valid" ref="formRef">
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.nombre"
                      label="Nombre"
                      :rules="[rules.required]"
                      prepend-inner-icon="mdi-account"
                      color="#C5A044"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      :rules="[rules.required, rules.email]"
                      prepend-inner-icon="mdi-email"
                      color="#C5A044"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="form.telefono"
                      label="Teléfono"
                      prepend-inner-icon="mdi-phone"
                      color="#C5A044"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.mensaje"
                      label="Mensaje"
                      :rules="[rules.required]"
                      auto-grow
                      prepend-inner-icon="mdi-message-text"
                      color="#C5A044"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>

                <div class="text-center mt-6">
                  <v-btn
                    color="#C5A044"
                    class="text-black font-weight-bold"
                    rounded
                    size="large"
                    @click="enviarFormulario"
                  >
                    Enviar Mensaje
                  </v-btn>
                </div>
              </v-form>
            </v-card>
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
import { ref, reactive } from "vue";

const valid = ref(false);
const formRef = ref(null);

const form = reactive({
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
});

const rules = {
  required: (v) => !!v || "Este campo es obligatorio",
  email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email inválido",
};

const enviarFormulario = () => {
  if (formRef.value?.validate()) {
    console.log("Formulario enviado:", { ...form });
    alert("¡Gracias por tu mensaje!");
    formRef.value.reset();
  }
};
</script>

<style scoped>
.contacto-card {
  background: #1e1e1e !important;
  border: 1px solid rgba(197, 160, 68, 0.2);
  transition: all 0.3s ease;
}
</style>
