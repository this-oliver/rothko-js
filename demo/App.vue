<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import RothkoCard from '../lib/RothkoCard.vue';
import type { Pattern } from '../lib/composables/useArt';
import { usePattern } from '../lib/composables/useArt';

const { smAndDown } = useDisplay();
const { patterns } = usePattern();

const currentPattern = ref<Pattern>(patterns[0]);

const text = ref<string>();

const links = ref([
  {
    title: 'Source Code',
    link: 'https://github.com/this-oliver/rothko-js'
  }
])

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
            md="8">
            <rothko-card
              id="canvas"
              :pattern="currentPattern"
              :source="text" />
          </v-col>

          <v-col
            cols="11"
            md="8">
            <v-btn
              v-for="p in patterns"
              :key="p"
              class="mx-1"
              :color="currentPattern === p ? 'primary' : ''"
              @click="currentPattern = p">{{ p }}</v-btn>
          </v-col>

          <v-col
            cols="11"
            md="8">
            <v-textarea
              v-model="text"
              auto-grow
              counter
              clearable
              label="Input Text"
              placeholder="Try entering a few words, or a sentence, or a paragraph into the input field above and see what happens"/>
          </v-col>
        </v-row>
      </v-container>

      <v-footer
        app
        absolute
        color="transparent">
        <v-row :class="`px-2 ${!smAndDown ? 'text-center' : ''}`">
          <v-col
            v-for="item in links"
            :key="item.link"
            cols="auto">
            <a
              class="mx-2"
              :href="item.link"
              target="_blank">
              {{ item.title }}
            </a>
          </v-col>
          <v-col
            cols="auto"
            class="ml-md-auto">
            <a
              class="mx-2"
              href="https://www.oliverrr.net"
              target="_blank">Oliverrr 🤠</a>
            
            <span>&copy; {{ new Date().getFullYear() }}</span>
          </v-col>
        </v-row>
      </v-footer>
    </v-main>
  </v-app>
</template>

<style>
#canvas {
  min-height: 50vh;
}
</style>