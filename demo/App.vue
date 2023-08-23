<script setup lang="ts">
// read npm package version from package.json
import { version } from '../package.json';

import RothkoCard from '@lib/RothkoCard.vue';
import type { Pattern } from '@lib/composables/useArt';
import { usePattern } from '@lib/composables/useArt';
import html2canvas from 'html2canvas';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

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

async function downloadCanvas() {
  try {
    const element = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas = await html2canvas(element)

    const link = document.createElement('a');
    link.download = 'rothko.png';
    link.href = canvas.toDataURL();
    link.click();
  
  } catch (error) {
    console.error(error);
    alert(`Something went wrong: ${(error as Error).message}`);
  }
}

function capitalize(string: any): string {
  if (typeof string !== 'string') return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>

<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="transparent">
      <v-spacer />
      <h1 class="text-primary">Rothko <small>v.{{ version }}</small></h1>
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
              :source="text"
              :pattern="currentPattern" />
          </v-col>

          <v-col
            cols="11"
            md="8">
            <v-select
              v-model="currentPattern"
              :items="patterns"
              :item-title="item => capitalize(item)"
              :item-value="item => item"
              label="Pattern"
              variant="outlined">
            </v-select>
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
              
            <v-btn
              class="mt-1"
              color="primary"
              variant="outlined"
              @click="downloadCanvas">Download</v-btn>
          </v-col>

          
          <v-col
            class="mt-2"
            cols="11"
            md="8">
            <v-divider class="my-4" />
          
            <h1><code>Rothko-js</code></h1>
            <p>A simple Vue3 component that generates shapes and patterns based on text input.</p>

            <h2>Features</h2>
            <ul>
              <li>🖌️ Generate shapes and patterns based on text input</li>
              <li>🎨 Apply colors based on text input</li>
              <li>🪄 Do all of the above deterministically (always get the same shapes, patterns, and colors for the same input)</li>
            </ul>
            
            <h2>Why use <code>Rothko-js</code></h2>
            <p>There are a number of pain points that this tool addresses:</p>
            <ul>
              <li>large bodies of text with no graphics are boring</li>
              <li>graphics take time/money to create</li>
              <li>hosting images (graphics) can get expensive</li>
            </ul>
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

h2 {
  padding-top: 1rem;
}

ul {
  padding-left: 2rem;
}
</style>