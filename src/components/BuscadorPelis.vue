
<script setup>
import { ref } from 'vue'
import { cercar, obtenir } from '../services/communicationManager.js'

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

        <v-dialog v-model="dialog" max-width="600">
          <v-card v-if="peliculaSeleccionada">

            <v-card-title>
              {{ peliculaSeleccionada.Title }}
            </v-card-title>

            <v-card-text>
              <p><strong>Any:</strong> {{ peliculaSeleccionada.Year }}</p>
              <p><strong>Estrena:</strong> {{ peliculaSeleccionada.Released }}</p>
              <p><strong>Durada:</strong> {{ peliculaSeleccionada.Runtime }}</p>
              <p><strong>Gènere:</strong> {{ peliculaSeleccionada.Genre }}</p>
              <p><strong>Director:</strong> {{ peliculaSeleccionada.Director }}</p>
              <p><strong>Actors:</strong> {{ peliculaSeleccionada.Actors }}</p>
              <p><strong>Idioma:</strong> {{ peliculaSeleccionada.Language }}</p>
              <p><strong>País:</strong> {{ peliculaSeleccionada.Country }}</p>
              <p><strong>Nota IMDb:</strong> {{ peliculaSeleccionada.imdbRating }}</p>
              <p><strong>Sinopsi:</strong> {{ peliculaSeleccionada.Plot }}</p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false">
                Tancar
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>

      </v-container>
    </v-main>

  </v-layout>
</template>

