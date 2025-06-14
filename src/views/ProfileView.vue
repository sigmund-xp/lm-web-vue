<template>
  <v-container class="info-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-form class="w-100" max-width="300">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="localUser.email"
                hide-details="auto"
                class="text-gold"
                label="Correo electrónico"
                type="email"
                prepend-inner-icon="mdi-email"
                required
                readonly
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="localUser.name"
                hide-details="auto"
                ref="inputNombre"
                class="text-gold"
                label="Nombre"
                prepend-inner-icon="mdi-account"
                required
              />
            </v-col>
            <v-col cols="12" class="mt-0 pt-0 pb-0 mb-0">
              <div class="text-gold label-opacity text-body-1">Teléfono</div>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="localUser.phoneArea"
                hide-details="auto"
                class="text-gold"
                label="Área"
                maxlength="4"
                prepend-inner-icon="mdi-map-marker"
                type="tel"
                @input="localUser.phoneArea = soloNumeros(localUser.phoneArea)"
                required
              />
            </v-col>
            <v-col cols="8">
              <v-text-field
                v-model="localUser.phoneNumber"
                hide-details="auto"
                class="text-gold"
                label="Número"
                maxlength="8"
                prepend-inner-icon="mdi-phone"
                type="tel"
                @input="localUser.phoneNumber = soloNumeros(localUser.phoneNumber)"
                required
              />
            </v-col>
            <v-col
              v-if="userRole === 'V' || userRole === 'P'"
              cols="12"
              class="mt-0 pt-0 pb-0 mb-0"
            >
              <div class="text-gold label-opacity text-body-1">
                {{ (userRole === "V" ? "Teléfono" : "Contacto") + " de emergencia" }}
              </div>
            </v-col>
            <v-col v-if="userRole === 'P'" cols="6">
              <v-text-field
                v-model="localUser.extraData.emergency.name"
                hide-details="auto"
                class="text-gold"
                label="Nombre"
                prepend-inner-icon="mdi-doctor"
                required
              />
            </v-col>
            <v-col
              v-if="userRole === 'V' || userRole === 'P'"
              :cols="userRole === 'P' ? 2 : 4"
            >
              <v-text-field
                v-model="localUser.extraData.emergency.phoneArea"
                hide-details="auto"
                class="text-gold"
                label="Área"
                maxlength="4"
                prepend-inner-icon="mdi-map-marker"
                required
              />
            </v-col>
            <v-col
              v-if="userRole === 'V' || userRole === 'P'"
              :cols="userRole === 'P' ? 4 : 8"
            >
              <v-text-field
                v-model="localUser.extraData.emergency.phoneNumber"
                hide-details="auto"
                class="text-gold"
                label="Número"
                maxlength="8"
                prepend-inner-icon="mdi-phone"
                required
              />
            </v-col>
            <v-col
              v-if="userRole === 'V' || userRole === 'P'"
              cols="12"
              class="mt-0 pt-0 pb-0 mb-0"
            >
              <div class="text-gold label-opacity text-body-1">
                {{ userRole === "V" ? "Información para los pagos" : "Dirección" }}
              </div>
            </v-col>
            <v-col v-if="userRole === 'V'" cols="12" md="4">
              <v-text-field
                v-model="localUser.extraData.billingData.cbu"
                hide-details="auto"
                class="text-gold"
                label="CBU"
                maxlength="22"
                prepend-inner-icon="mdi-bank"
                @input="
                  localUser.extraData.billingData.cbu = soloNumeros(
                    localUser.extraData.billingData.cbu
                  )
                "
                required
              />
            </v-col>
            <v-col v-if="userRole === 'V'" cols="12" md="4">
              <v-text-field
                v-model="localUser.extraData.billingData.alias"
                hide-details="auto"
                class="text-gold"
                label="Alias"
                prepend-inner-icon="mdi-credit-card-plus"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'V'" cols="12" md="4">
              <v-text-field
                v-model="localUser.extraData.billingData.name"
                hide-details="auto"
                class="text-gold"
                label="Titular de la cuenta"
                prepend-inner-icon="mdi-account-box-outline"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="12" md="6">
              <v-text-field
                v-model="localUser.extraData.address.calle"
                hide-details="auto"
                class="text-gold"
                label="Calle"
                prepend-inner-icon="mdi-map-marker"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="4" md="2">
              <v-text-field
                v-model="localUser.extraData.address.numero"
                hide-details="auto"
                class="text-gold"
                label="Número"
                maxlength="6"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="4" md="2">
              <v-text-field
                v-model="localUser.extraData.address.piso"
                hide-details="auto"
                class="text-gold"
                label="Piso"
                maxlength="2"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="4" md="2">
              <v-text-field
                v-model="localUser.extraData.address.dpto"
                hide-details="auto"
                class="text-gold"
                label="Dpto"
                maxlength="2"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="4" md="4">
              <v-text-field
                v-model="localUser.extraData.address.codPostal"
                hide-details="auto"
                class="text-gold"
                label="Código Postal"
                maxlength="6"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="4" md="4">
              <v-text-field
                v-model="localUser.extraData.address.localidad"
                hide-details="auto"
                class="text-gold"
                label="Localidad"
                required
              />
            </v-col>
            <v-col v-if="userRole === 'P'" cols="4" md="4">
              <v-text-field
                v-model="localUser.extraData.address.provincia"
                hide-details="auto"
                class="text-gold"
                label="Provincia"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                class="text-black mb-3 d-block mx-auto"
                color="#C5A044"
                @click.prevent="update"
              >
                Actualizar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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

import UserService from "@/services/UserService.js";
import AuthService from "@/services/AuthService.js";

import { useAuthStore } from "@/stores/auth.js";
import { useUserInfoStore } from "@/stores/user.js";
import { userDataValidation } from "@/validations/user.js";

const router = useRouter();

const userInfo = useUserInfoStore();
const auth = useAuthStore();

const inputNombre = ref(null);
const dialog = ref(false);
const text = ref("");
const type = ref("warning");
const userRole = ref("");
const localUser = reactive({
  email: "",
  name: "",
  phoneArea: "",
  phoneNumber: "",
  role: {
    description: "",
    permissions: "",
  },
  extraData: {
    id: "",
    kind: "",
    userId: "",
    veteSpecialty: "",
    address: {
      calle: "",
      numero: null,
      piso: null,
      dpto: "",
      codPostal: "",
      localidad: "",
      provincia: "",
    },
    emergency: {},
    billingData: {
      cbu: "",
      alias: "",
      name: "",
    },
  },
});

onMounted(async () => {
  await nextTick();
  if (inputNombre.value) {
    inputNombre.value.focus();
  }
  userRole.value = userInfo.info.role.description[0];
  Object.assign(localUser, {
    email: userInfo.info.email,
    name: userInfo.info.name,
    phoneArea: userInfo.info.phoneArea,
    phoneNumber: soloNumeros(userInfo.info.phoneNumber || ""),
    extraData: {
      id: userInfo.info.extraData?._id || "",
      address: userInfo.info.extraData?.address || {
        calle: "",
        numero: "",
        piso: "",
        dpto: "",
        codPostal: "",
        localidad: "",
        provincia: "",
      },
      emergency: {
        name: userInfo.info.extraData?.emergency.name || "",
        phoneArea: userInfo.info.extraData?.emergency.phoneArea,
        phoneNumber: soloNumeros(userInfo.info.extraData?.emergency.phoneNumber || ""),
      },
      billingData: userInfo.info.extraData?.billingData || {
        cbu: "",
        alias: "",
        name: "",
      },
    },
  });
});

const soloNumeros = (valor) => {
  return valor.replace(/\D/g, "");
};

const update = async () => {
  const message = userDataValidation(localUser);
  if (message) {
    text.value = message;
    dialog.value = true;
  } else {
    await refreshAuth();
    const extraData = makeExtraData();
    const payload = {
      email: localUser.email,
      name: localUser.name,
      phoneArea: localUser.phoneArea,
      phoneNumber: formatearTelefono(localUser.phoneNumber),
      extraData,
    };
    UserService.modifyProfile(payload, auth.token)
      .then(async () => {
        text.value = "Datos actualizados.";
        dialog.value = true;
        type.value = "info";
        await getUserInfo();
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
        text.value = "Hay un problema para actualizar ss datos.";
        dialog.value = true;
        type.value = "warning";
      });
  }
};

const makeExtraData = () => {
  if (!["V", "P"].includes(userRole.value)) return {};

  return {
    id: localUser.extraData._id,
    address: localUser.extraData.address,
    emergency: {
      name: localUser.extraData.emergency.name,
      phoneArea: localUser.extraData.emergency.phoneArea,
      phoneNumber: formatearTelefono(localUser.extraData.emergency.phoneNumber),
    },
    billingData: localUser.extraData.billingData,
  };
};

const getUserInfo = async () => {
  try {
    const response = await UserService.getUserInfo(auth.token);
    userInfo.setUserInfo(response.data.userInfo);
  } catch (error) {
    text.value = "Acceso restringido. Esta función no está disponible para tu perfil.";
    dialog.value = true;
  }
};

const formatearTelefono = (numero) => {
  const largo = numero.length;

  if (largo > 4) {
    return `${numero.slice(0, largo - 4)}-${numero.slice(largo - 4)}`;
  }
  return numero;
};

const refreshAuth = async () => {
  try {
    const response = await AuthService.refreshToken();
    auth.setToken(response.data.token);
  } catch (error) {
    console.log(error);
    text.value = "Acceso restringido. Esta función no está disponible para tu perfil.";
    dialog.value = true;
    type.value = "warning";
    router.push("/login");
  }
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
