<script setup>
defineProps({
  peliculaSeleccionada: Object,
  dialogAbierto: Boolean
})

const emitirEvento = defineEmits(['update:dialogAbierto'])
</script>

<template>
  <v-dialog
    :model-value="dialogAbierto"
    @update:model-value="emitirEvento('update:dialogAbierto', $event)"
    max-width="600"
  >
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

        <v-btn @click="emitirEvento('update:dialogAbierto', false)">
          Tancar
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>
