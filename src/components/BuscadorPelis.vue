
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
  <v-layout class="rounded rounded-md border">

    <v-app-bar title="Cercador de pel·lícules"></v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Navigation drawer" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>

        <v-sheet
          color="surface-light"
          rounded="lg"
          width="100%"
          class="pa-4"
        >
          <v-text-field
            v-model="nom"
            label="Escriu un nom"
            clearable
          ></v-text-field>

          <div class="d-flex justify-end">
            <v-btn @click="buscar">
              Cercar pel·lícula
            </v-btn>
          </div>
        </v-sheet>

        <v-row v-if="noms.length" class="mt-4">

          <v-col
            v-for="pelicula in noms"
            :key="pelicula.imdbID"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card>

              <v-img
                :src="pelicula.Poster"
                height="300"
                cover
              ></v-img>

              <v-card-title>
                {{ pelicula.Title }}
              </v-card-title>

              <v-card-text>
                Any: {{ pelicula.Year }}
              </v-card-text>

              <v-card-text>
                Tipus: {{ pelicula.Type }}
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="primary"
                  @click="mostrarInfo(pelicula.imdbID)"
                >
                  Més informació
                </v-btn>
              </v-card-actions>

            </v-card>
          </v-col>

        </v-row>

        <InfoPelicula
        v-model:dialogAbierto="dialog"
        :peliculaSeleccionada="peliculaSeleccionada"/>

      </v-container>
    </v-main>

  </v-layout>
</template>
```
