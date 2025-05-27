<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    width="500px"
    persistent
  >
    <v-card class="pt-0 pl-5 pr-5" color="#111111">
      <v-card-title class="text-gold">Agregar Propietario</v-card-title>
      <v-text-field
        v-model="usuario.name"
        class="text-gold"
        label="Nombre"
        prepend-inner-icon="mdi-account"
        required
      />
      <v-text-field
        v-model="usuario.email"
        class="text-gold"
        label="Correo electrónico"
        type="email"
        prepend-inner-icon="mdi-email"
        required
      />
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
import { defineProps, ref, watch, defineEmits, reactive } from "vue";

const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(["update:modelValue", "created"]);

const dialog = ref(false);

const usuario = reactive({
  name: "",
  email: "",
  kind: "P",
});

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val;
    if (val) {
      usuario.name = "";
      usuario.email = "";
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
  if (!usuario.name || !usuario.email) return;
  emit("created", { ...usuario });
};
</script>

<style scoped></style>
