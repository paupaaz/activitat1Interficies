```vue
<script setup>
import { ref } from 'vue'
import { cercar, obtenir } from '../services/communicationManager.js'
import InfoPelicula from '../components/InfoPelicula.vue'

const nom = ref('')
const noms = ref([])
const peliculaSeleccionada = ref(null)
const dialog = ref(false)

async function buscar() {
  noms.value = await cercar(nom.value)
}

async function mostrarInfo(id) {
  const resposta = await obtenir(id)
  peliculaSeleccionada.value = resposta
  dialog.value = true
}
</script>

<template>
  <v-layout style="background-color: #FFE8D6; min-height: 100vh;">

    <v-app-bar
      title="Cercador de pel·lícules"
      color="#FF8360"
      class="font-weight-bold"
    ></v-app-bar>

    <v-navigation-drawer color="#FFB79A">
      <v-list nav>
        <v-list-item
          title="Cercar pel·lícules"
          prepend-icon="mdi-magnify"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>

        <v-sheet
          color="#FFF8F2"
          rounded="lg"
          width="100%"
          class="pa-5"
          elevation="1"
        >
          <h2 class="text-h5 mb-4" style="color: #9C2B1B;">
            Busca una pel·lícula
          </h2>

          <v-text-field
            v-model="nom"
            label="Escriu el nom de la pel·lícula"
            placeholder="Ex.: Titanic"
            prepend-inner-icon="mdi-magnify"
            color="#9C2B1B"
            variant="outlined"
            clearable
            @keyup.enter="buscar"
          ></v-text-field>

          <div class="d-flex justify-end">
            <v-btn
              @click="buscar"
              color="#9C2B1B"
              prepend-icon="mdi-magnify"
            >
              Cercar
            </v-btn>
          </div>
        </v-sheet>

        <div v-if="noms.length > 0" class="mt-6">
          <h2 class="text-h5 mb-4" style="color: #9C2B1B;">
            Resultats de la cerca
          </h2>

          <v-row>
            <v-col
              v-for="pelicula in noms"
              :key="pelicula.imdbID"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                color="#FFF8F2"
                rounded="lg"
                elevation="2"
                class="h-100"
              >
                <v-img
                  :src="pelicula.Poster !== 'N/A' ? pelicula.Poster : undefined"
                  height="320"
                  cover
                  color="#FFB79A"
                >
                  <template #error>
                    <div class="d-flex align-center justify-center h-100">
                      No hi ha pòster disponible
                    </div>
                  </template>
                </v-img>

                <v-card-title class="font-weight-bold">
                  {{ pelicula.Title }}
                </v-card-title>

                <v-card-text>
                  <p>Any: {{ pelicula.Year }}</p>
                  <p class="mt-2">Tipus: {{ pelicula.Type }}</p>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="#9C2B1B"
                    variant="flat"
                    @click="mostrarInfo(pelicula.imdbID)"
                  >
                    Més informació
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-sheet
          v-else
          color="#FFF8F2"
          rounded="lg"
          class="pa-5 mt-6 text-center"
        >
          <p style="color: #9C2B1B;">
            Escriu el nom d'una pel·lícula per veure els resultats.
          </p>
        </v-sheet>

        <InfoPelicula
          v-model:dialogAbierto="dialog"
          :peliculaSeleccionada="peliculaSeleccionada"
        />

      </v-container>
    </v-main>

  </v-layout>
</template>
```
