<script setup lang="ts">
import { ref, computed } from 'vue'

const formData = ref({
  name: '',
  email: '',
  preference: ''
})
const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
}
</script>

<template>
        <div class="main-content">
      <v-card rounded="lg">
        <!-- ISSUE 1: Missing page title in template (should be handled in router/meta) -->

        <!-- ISSUE 2: Missing main landmark -->
        <div class="content-wrapper pa-4">
          <!-- ISSUE 3: Wrong heading hierarchy (skipping from h1 to h3) -->
          <h1>Bienvenue sur notre site</h1>
          <h3>Veuillez remplir le formulaire ci-dessous</h3>

          <!-- ISSUE 4: Image without alt text -->
          <img src="https://picsum.photos/650/200" alt="test" class="banner-image" />

          <!-- ISSUE 5: Low contrast text (light gray on white) -->
          <p style="color: #111;">
            Voici des informations importantes sur nos services que vous devriez lire attentivement.
          </p>

          <!-- ISSUE 6 & 7: Form inputs without labels and missing fieldset -->
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <input
                type="text"
                placeholder="Entrez votre nom"
                v-model="formData.name"
              />
            </div>

            <div class="form-group">
              <input
                type="email"
                placeholder="Entrez votre email"
                v-model="formData.email"
              />
            </div>

            <!-- ISSUE 8: Radio buttons without proper grouping or labels -->
            <div class="form-group">
              <p>Sélectionnez votre préférence :</p>
              <input type="radio" name="preference" value="option1" v-model="formData.preference" /> Option 1
              <input type="radio" name="preference" value="option2" v-model="formData.preference" /> Option 2
            </div>

            <!-- ISSUE 9: Button with only icon, no accessible text -->
            <v-btn color="primary" icon="mdi-send" type="submit"></v-btn>
          </form>

          <!-- ISSUE 10: Link with non-descriptive text -->
          <p class="mt-4">
            Pour plus d'informations, <a href="#" @click.prevent>cliquez ici</a>
          </p>

          <!-- ISSUE 11: Contrast issue with button (light yellow on white background) -->
          <v-btn
            class="mt-4"
            style="background-color: #ffff99; color: #ffffff;"
          >
            Action importante
          </v-btn>

        </div>
      </v-card>
    </div>
    </template>

<style scoped>
/* Main content centered */
.main-content {
  max-width: 1000px;
  margin: 0 auto;
}
</style>