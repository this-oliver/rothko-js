<script setup lang="ts">
import { ref } from 'vue';
import RothkoCard from '../package/RothkoCard.vue';

const text = ref<string>();

</script>

<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="transparent">
      <v-spacer />
      <h1 class="text-primary">Rothko</h1>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col
            cols="11"
            md="8"
            order-md="2">
            <v-textarea
              v-model="text"
              auto-grow
              counter
              clearable
              label="Enter text to generate canvas"
              hint="Try entering a few words, or a sentence, or a paragraph into the input field above and see what happens" />
          </v-col>

          <v-col
            cols="11"
            md="8"
            order-md="1">
            <rothko-card
              id="canvas"
              :source="text" />
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
#canvas {
  min-height: 50vh;
}
</style>