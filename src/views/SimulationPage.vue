<template>
  <div
    class="simulation-page"
    :class="{ 'shake-active': shakeEnabled }"
    @click="handlePageClick"
    @mousemove="handleMouseMove"
    @mouseleave="showFakeCursor = false"
    @mouseenter="showFakeCursor = true"
  >
    <!-- Faux curseur tremblant -->
    <div
      v-if="shakeEnabled && showFakeCursor"
      class="fake-cursor"
      :style="fakeCursorStyle"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M5 3l14 9-6 2-4 7z" fill="#1e40af" stroke="#fff" stroke-width="1.5"/>
      </svg>
    </div>

    <div class="simulation-content">
      <!-- Contrôles -->
      <div class="controls-bar">
        <v-card variant="elevated" class="pa-5 mb-6">
          <div class="d-flex align-center flex-wrap ga-6">
            <div>
              <h1 class="text-h5 font-weight-bold mb-1">Simulation — Tremblements</h1>
              <p class="text-body-2 text-medium-emphasis mb-0">
                Activez le mode tremblement pour comprendre la difficulté de naviguer avec un handicap moteur.
              </p>
            </div>
            <v-spacer />
            <div class="d-flex align-center ga-4">
              <v-switch
                v-model="shakeEnabled"
                color="primary"
                hide-details
                :label="shakeEnabled ? 'Tremblement actif' : 'Tremblement inactif'"
              />
              <div v-if="shakeEnabled" class="d-flex align-center ga-2" style="min-width: 200px;">
                <v-icon size="16">mdi-vibrate</v-icon>
                <v-slider
                  v-model="shakeIntensity"
                  :min="2"
                  :max="40"
                  :step="1"
                  color="primary"
                  hide-details
                  thumb-label
                />
                <span class="text-caption">{{ shakeIntensity }}px</span>
              </div>
            </div>
          </div>
        </v-card>
      </div>

      <!-- Compteur de clics -->
      <v-card v-if="shakeEnabled" variant="tonal" color="deep-purple" class="pa-4 mb-6">
        <div class="d-flex align-center justify-center ga-8 flex-wrap">
          <div class="text-center">
            <div class="text-h4 font-weight-bold">{{ clickAttempts }}</div>
            <div class="text-caption text-medium-emphasis">Tentatives</div>
          </div>
          <v-divider vertical class="mx-2" />
          <div class="text-center">
            <div class="text-h4 font-weight-bold text-success">{{ clickSuccesses }}</div>
            <div class="text-caption text-medium-emphasis">Réussis</div>
          </div>
          <v-divider vertical class="mx-2" />
          <div class="text-center">
            <div class="text-h4 font-weight-bold text-error">{{ clickAttempts - clickSuccesses }}</div>
            <div class="text-caption text-medium-emphasis">Ratés</div>
          </div>
          <v-divider vertical class="mx-2" />
          <div class="text-center">
            <div class="text-h4 font-weight-bold" :class="accuracyColor">{{ accuracy }}%</div>
            <div class="text-caption text-medium-emphasis">Précision</div>
          </div>
          <v-btn variant="text" size="small" @click="resetCounters" >
            <v-icon start>mdi-restart</v-icon>
            Réinitialiser
          </v-btn>
        </div>
      </v-card>

      <!-- Grille de produits -->
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <v-card variant="elevated" class="product-card h-100">
            <div class="product-image">
              <span class="product-emoji">{{ product.image }}</span>
              <v-btn
                icon
                size="x-small"
                variant="text"
                class="fav-btn"
                :color="product.fav ? 'red' : 'grey'"
                @click.stop="toggleFav(product)"
              >
                <v-icon size="16">{{ product.fav ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
              </v-btn>
            </div>

            <v-card-text class="pb-2">
              <div class="text-subtitle-1 font-weight-bold">{{ product.name }}</div>
              <div class="text-h6 text-primary font-weight-bold mt-1">{{ product.price.toFixed(2) }} &euro;</div>

              <div class="d-flex align-center ga-1 mt-2">
                <v-icon v-for="n in 5" :key="n" size="14" :color="n <= product.rating ? 'amber' : 'grey-lighten-2'">
                  mdi-star
                </v-icon>
                <span class="text-caption text-medium-emphasis ml-1">({{ product.reviews }})</span>
              </div>
            </v-card-text>

            <v-card-actions class="px-4 pb-4 pt-0">
              <div class="d-flex flex-column w-100 ga-2">
                <div class="d-flex align-center ga-1">
                  <v-btn
                    icon
                    size="x-small"
                    variant="outlined"
                    @click="decrementQty(product)"
                    :disabled="product.qty <= 1"
                  >
                    <v-icon size="14">mdi-minus</v-icon>
                  </v-btn>
                  <span class="text-body-2 mx-1" style="min-width: 20px; text-align: center;">{{ product.qty }}</span>
                  <v-btn
                    icon
                    size="x-small"
                    variant="outlined"
                    @click="incrementQty(product)"
                  >
                    <v-icon size="14">mdi-plus</v-icon>
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    size="small"
                    color="primary"
                    variant="flat"
                    @click="addToCart(product)"
                  >
                    <v-icon start size="16">mdi-cart-plus</v-icon>
                    Ajouter
                  </v-btn>
                </div>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Message de sensibilisation -->
      <v-card color="deep-purple" variant="tonal" class="pa-5 mt-8 text-center">
        <v-icon size="48" color="deep-purple" class="mb-3">mdi-hand-heart-outline</v-icon>
        <h2 class="text-h6 font-weight-bold mb-2">Pourquoi cette simulation ?</h2>
        <p class="text-body-1 text-medium-emphasis mb-3" style="max-width: 600px; margin: 0 auto;">
          Les tremblements touchent des millions de personnes (maladie de Parkinson, sclérose en plaques, tremblements essentiels...).
          De petits boutons, des zones cliquables réduites et un manque de tolérance aux erreurs rendent la navigation quasi impossible.
        </p>
        <div class="d-flex justify-center ga-4 flex-wrap">
          <v-chip prepend-icon="mdi-arrow-expand-all" variant="outlined" color="deep-purple">
            Agrandir les zones cliquables
          </v-chip>
          <v-chip prepend-icon="mdi-timer-sand" variant="outlined" color="deep-purple">
            Éviter les délais courts
          </v-chip>
          <v-chip prepend-icon="mdi-undo" variant="outlined" color="deep-purple">
            Permettre d'annuler les actions
          </v-chip>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import '../assets/simulation.css'

const shakeEnabled = ref(false)
const shakeIntensity = ref(18)
const showFakeCursor = ref(true)

const cursorX = ref(0)
const cursorY = ref(0)
const shakeX = ref(0)
const shakeY = ref(0)

const clickAttempts = ref(0)
const clickSuccesses = ref(0)

const accuracy = computed(() => {
  if (clickAttempts.value === 0) return 0
  return Math.round((clickSuccesses.value / clickAttempts.value) * 100)
})

const accuracyColor = computed(() => {
  if (accuracy.value >= 80) return 'text-success'
  if (accuracy.value >= 50) return 'text-warning'
  return 'text-error'
})

const fakeCursorStyle = computed(() => ({
  left: `${cursorX.value + shakeX.value}px`,
  top: `${cursorY.value + shakeY.value}px`
}))

const products = ref([
  { id: 1, name: 'Casque audio', price: 79.99, image: '\uD83C\uDFA7', fav: false, qty: 1, rating: 4, reviews: 128 },
  { id: 2, name: 'Clavier mécanique', price: 129.99, image: '\u2328\uFE0F', fav: false, qty: 1, rating: 5, reviews: 256 },
  { id: 3, name: 'Souris ergonomique', price: 49.99, image: '\uD83D\uDDB1\uFE0F', fav: false, qty: 1, rating: 3, reviews: 84 },
  { id: 4, name: 'Webcam HD', price: 59.99, image: '\uD83D\uDCF7', fav: false, qty: 1, rating: 4, reviews: 62 },
  { id: 5, name: 'Écran 27"', price: 349.99, image: '\uD83D\uDDA5\uFE0F', fav: false, qty: 1, rating: 5, reviews: 312 },
  { id: 6, name: 'Hub USB-C', price: 39.99, image: '\uD83D\uDD0C', fav: false, qty: 1, rating: 3, reviews: 47 },
  { id: 7, name: 'Câble HDMI', price: 12.99, image: '\uD83D\uDCE1', fav: false, qty: 1, rating: 4, reviews: 198 },
  { id: 8, name: 'Support laptop', price: 34.99, image: '\uD83D\uDCBB', fav: false, qty: 1, rating: 4, reviews: 91 }
])

let animationFrame = null
let lastShakeTime = 0

const updateShake = (timestamp) => {
  if (shakeEnabled.value && timestamp - lastShakeTime > 30) {
    const intensity = shakeIntensity.value
    // Combine a base drift with sharp jolts for more realistic tremor
    shakeX.value = (Math.random() - 0.5) * 2 * intensity + Math.sin(timestamp * 0.02) * intensity * 0.3
    shakeY.value = (Math.random() - 0.5) * 2 * intensity + Math.cos(timestamp * 0.03) * intensity * 0.3
    lastShakeTime = timestamp
  }
  animationFrame = requestAnimationFrame(updateShake)
}

const handleMouseMove = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const handlePageClick = (e) => {
  if (!shakeEnabled.value) return
  clickAttempts.value++

  const target = e.target.closest('button, .v-btn, a, .v-switch, .v-slider')
  if (target) {
    clickSuccesses.value++
  }
}

const toggleFav = (product) => {
  product.fav = !product.fav
}

const incrementQty = (product) => {
  product.qty++
}

const decrementQty = (product) => {
  if (product.qty > 1) product.qty--
}

const addToCart = () => {
  // visual feedback only
}

const resetCounters = () => {
  clickAttempts.value = 0
  clickSuccesses.value = 0
}

onMounted(() => {
  animationFrame = requestAnimationFrame(updateShake)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>
