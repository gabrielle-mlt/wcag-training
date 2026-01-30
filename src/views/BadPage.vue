<template>
  <div class="bad-page">
    <!-- Panneau de score flottant (style TOC) -->
    <div class="score-panel" :class="{ visible: showPanel }">
      <div class="score-panel-inner">
        <h3 class="score-title">
          <v-icon start size="20">mdi-check-circle</v-icon>
          Votre score
        </h3>

        <v-btn
          color="primary"
          block
          size="small"
          @click="checkScore"
          class="mb-3"
        >
          <v-icon start>mdi-refresh</v-icon>
          Vérifier le score
        </v-btn>

        <div v-if="score !== null">
          <div class="text-h4 text-center mb-2" :class="'text-' + scoreColor">
            {{ score }}%
          </div>
          <v-progress-linear
            :model-value="score"
            :color="scoreColor"
            height="6"
            rounded
            class="mb-3"
          />

          <div v-if="scoreDetails.fixed.length > 0" class="mb-2">
            <v-chip
              v-for="issue in scoreDetails.fixed"
              :key="issue"
              color="success"
              size="x-small"
              prepend-icon="mdi-check"
              class="ma-1"
            >
              {{ issue }}
            </v-chip>
          </div>

          <div v-if="scoreDetails.remaining.length > 0" class="text-body-2 text-medium-emphasis">
            {{ scoreDetails.remaining.length }} problème{{ scoreDetails.remaining.length > 1 ? 's' : '' }} restant{{ scoreDetails.remaining.length > 1 ? 's' : '' }}
          </div>

          <v-btn
            v-if="score === 100"
            color="success"
            block
            size="small"
            to="/correction"
            class="mt-3"
          >
            <v-icon start>mdi-trophy</v-icon>
            Voir la correction
          </v-btn>
        </div>

        <p v-else class="text-body-2 text-medium-emphasis mb-0">
          Cliquez pour évaluer vos corrections
        </p>
      </div>
    </div>

    <!-- Instructions -->
     <v-card color="transparent">
              <h1>Zone mal conçue</h1>

      <v-card-text>
      <p class="text-body-1">
        Le composant présente plusieurs erreurs d'accessibilité. <br>Votre objectif est de les identifier et de les corriger en utilisant les bonnes pratiques apprises dans ce module.
      </p>
      </v-card-text>
    </v-card>

    <!-- Contenu principal centré - écran moniteur -->
    <div class="monitor">
      <div class="monitor-screen">
        <div class="monitor-topbar">
          <span class="monitor-dot monitor-dot--red"></span>
          <span class="monitor-dot monitor-dot--yellow"></span>
          <span class="monitor-dot monitor-dot--green"></span>
          <span class="monitor-topbar-title">EditMe.vue — Zone de travail</span>
        </div>
        <div class="monitor-content">
          <edit-me ></edit-me>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { calculateScore } from '../utils/calculateScore'
import EditMe from '../components/EditMe.vue'

const formData = ref({
  name: '',
  email: '',
  preference: ''
})

const score = ref(null)
const scoreDetails = ref({ fixed: [], remaining: [] })
const showPanel = ref(true)

const scoreColor = computed(() => {
  if (score.value === null) return ''
  if (score.value === 100) return 'success'
  if (score.value >= 70) return 'info'
  return 'warning'
})

const checkScore = () => {
  try {
    const result = calculateScore()
    score.value = result.score
    scoreDetails.value = result.details
  } catch (error) {
    console.error('Error calculating score:', error)
    score.value = 0
    scoreDetails.value = { fixed: [], remaining: ['Erreur de calcul — voir la console'] }
  }
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
}
</script>

<style scoped>
.bad-page {
  min-height: calc(100vh - 64px);
  padding: 2rem 1rem;
}



/* Floating score panel (same pattern as TOC in Presentation) */
.score-panel {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  width: 240px;
  transition: opacity 0.3s ease;
}

.score-panel-inner {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 12px;
}

.score-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.banner-image {
  width: 100%;
  max-width: 400px;
  margin: 1rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Monitor frame */
.monitor {
  max-width: 900px;
  margin: 2rem auto;
}

.monitor-screen {
  background: #fff;
  border: 3px solid #2d2d2d;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

.monitor-topbar {
  background: #2d2d2d;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.monitor-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.monitor-dot--red { background: #ff5f57; }
.monitor-dot--yellow { background: #febc2e; }
.monitor-dot--green { background: #28c840; }

.monitor-topbar-title {
  color: #999;
  font-size: 0.75rem;
  margin-left: 0.5rem;
  font-family: monospace;
}


.monitor-chin {
  height: 18px;
  background: #2d2d2d;
  border-radius: 0 0 4px 4px;
  margin: 0 2rem;
}

.monitor-stand {
  width: 60px;
  height: 40px;
  background: linear-gradient(180deg, #2d2d2d, #3d3d3d);
  margin: 0 auto;
  border-radius: 0 0 2px 2px;
}

.monitor-foot {
  width: 120px;
  height: 8px;
  background: #2d2d2d;
  margin: 0 auto;
  border-radius: 0 0 6px 6px;
}

@media (max-width: 1200px) {
  .score-panel {
    display: none;
  }
}
</style>
