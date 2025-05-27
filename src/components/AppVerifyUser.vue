<template>
  <v-container class="info-container" max-width="400">
    <v-row justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo-lm.jpg')"
          alt="Logo Las Marías"
          width="50%"
          class="mb-4"
        />
        <v-form @submit.prevent="register" class="w-100" max-width="400">
          <v-row dense>
            <v-text-field
              v-model="usuario.name"
              class="text-gold"
              label="Nombre"
              prepend-inner-icon="mdi-account"
              required
              readonly
            />
            <v-text-field
              v-model="usuario.email"
              class="text-gold"
              label="Correo electrónico"
              type="email"
              prepend-inner-icon="mdi-email"
              required
              readonly
            />
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <div class="text-gold label-opacity text-body-1 mb-1">Teléfono</div>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="usuario.area"
                ref="area"
                class="text-gold"
                label="Área"
                maxlength="4"
                prepend-inner-icon="mdi-map-marker"
                type="tel"
                @input="usuario.area = soloNumeros(usuario.area)"
                required
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="usuario.numero"
                class="text-gold"
                label="Número"
                maxlength="8"
                prepend-inner-icon="mdi-phone"
                type="tel"
                @input="usuario.numero = soloNumeros(usuario.numero)"
                required
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model="usuario.password"
            class="text-gold"
            label="Contraseña"
            prepend-inner-icon="mdi-lock"
            type="password"
            required
          />

          <v-text-field
            v-model="usuario.confirmPassword"
            class="text-gold"
            label="Confirmar contraseña"
            prepend-inner-icon="mdi-lock-check"
            type="password"
            required
          />

          <v-btn class="text-black mb-3" color="#C5A044" block @click.prevent="register">
            Registrarse
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <h2 class="text-gold mb-2">Usuario no encontrado</h2>
        <p class="text-gold mb-6">
          No pudimos verificar al usuario. Es posible que el enlace haya expirado o sea
          incorrecto.
        </p>
        <v-btn class="text-black mb-3" color="#C5A044" @click.prevent="volver"
          >Volver</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" width="300px">
    <v-card class="pa-0">
      <v-alert class="py-6 pr-8" :text="text" :type="type"></v-alert>
      <v-btn
        icon
        size="x-small"
        color="#B00020"
        variant="plain"
        class="close-btn"
        @click="dialog = false"
      >
        <v-icon class="text-white">mdi-close</v-icon>
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, nextTick, reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import AuthService from "../services/AuthService.js";
// import { userValidation } from "../validations/user.js";

const dialog = ref(false);
const text = ref("");
const type = ref("warning");
const area = ref(null);

const router = useRouter();

const usuario = reactive({
  name: "Juan Perez",
  email: "mmbatti@gmail.com",
  area: "",
  numero: "",
  password: "",
  confirmPassword: "",
});

onMounted(async () => {
  await nextTick();
  if (area.value) {
    area.value.focus();
  }
});
/*
const formatPhone = (area, numero) => {
  return `+54 9 (${area}) ${formatearTelefono(numero)}`;
};

const formatearTelefono = (numero) => {
  const largo = numero.length;

  if (largo > 4) {
    return `${numero.slice(0, largo - 4)}-${numero.slice(largo - 4)}`;
  }
  return numero;
};
*/
const soloNumeros = (valor) => {
  return valor.replace(/\D/g, "");
};

const volver = async () => {
  router.push("/");
};

const register = () => {
  /*
  const message = userValidation(usuario);
  if (message) {
    text.value = message;
    dialog.value = true;
  } else {
    AuthService.register({
      email: usuario.email,
      phone: formatPhone(usuario.area, usuario.numero),
      name: usuario.name,
      role: "681bdf61dbc0b2a6c0ec75df",
      password: usuario.password,
    })
      .then((response) => {
        // TODO: setear token
        console.log(response.data);
        router.push("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          console.log(
            "Mensaje del servidor:",
            JSON.stringify(error.response.data.errors[0].msg)
          );
        } else {
          console.log("Error de red u otro:", error.message);
        }
      });
  }
*/
};
</script>
<style scoped>
.info-container {
  margin-top: 1rem;
}
.label-opacity {
  opacity: 0.6 !important;
}
.close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 10;
}
</style>
