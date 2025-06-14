<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    width="500px"
    persistent
  >
    <v-card class="pt-0 pl-5 pr-5" color="#1E1E1E ">
      <v-card-title class="text-gold">Agregar Herrador</v-card-title>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="farrier.name"
            ref="farrierName"
            class="text-gold"
            label="Nombre"
            prepend-inner-icon="mdi-account"
            required
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="farrier.email"
            class="text-gold"
            label="Correo electrónico"
            type="email"
            prepend-inner-icon="mdi-email"
            required
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="farrier.phoneArea"
            class="text-gold"
            label="Área"
            maxlength="4"
            prepend-inner-icon="mdi-map-marker"
            type="tel"
            @input="farrier.phoneArea = soloNumeros(farrier.phoneArea)"
            required
          />
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="farrier.phoneNumber"
            class="text-gold"
            label="Número"
            maxlength="8"
            prepend-inner-icon="mdi-phone"
            type="tel"
            @input="farrier.phoneNumber = soloNumeros(farrier.phoneNumber)"
            required
          />
        </v-col>
      </v-row>
      <v-card-actions class="px-5 pb-4">
        <v-btn color="#C5A044" variant="flat" class="text-black" @click.prevent="agregar">
          Agregar
        </v-btn>
        <v-spacer />
        <v-btn variant="outlined" color="#C5A044" @click.prevent="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, nextTick, ref, watch, defineEmits, reactive } from "vue";
import { farrierDataValidation } from "@/validations/farrier.js";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "alert", "created"]);

const dialog = ref(false);
const farrierName = ref(null);

const farrier = reactive({
  name: "",
  email: "",
  phoneArea: "",
  phoneNumber: "",
});

watch(
  () => props.modelValue,
  async (val) => {
    dialog.value = val;
    if (val) {
      farrier.name = "";
      farrier.email = "";
      farrier.phoneArea = "";
      farrier.phoneNumber = "";
      await nextTick();
      if (farrierName.value) {
        farrierName.value.focus();
      }
    }
  }
);

watch(dialog, (val) => {
  emit("update:modelValue", val);
});

const close = () => {
  dialog.value = false;
};

const agregar = () => {
  if (validFarrier(farrier)) {
    emit("created", { ...farrier });
  }
};

const validFarrier = (farrier) => {
  const message = farrierDataValidation(farrier);
  if (message !== "") {
    emit("alert", `Error de validación: ${message}`);
    return false;
  }
  return true;
};

const soloNumeros = (valor) => {
  return valor.replace(/\D/g, "");
};
</script>

<style scoped></style>
