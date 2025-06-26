<template>
  <section id="contacto" class="py-16 bg-grey-darken-4">
    <v-container>
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
  </section>
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
.xcontacto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(197, 160, 68, 0.1) !important;
  border-color: #c5a044;
}
</style>
