<script setup lang="ts">
import type { Pattern } from "rothko-js";
import html2canvas from "html2canvas";
import { RothkoCard, usePattern } from "rothko-js";
import { ref } from "vue";
import { version } from "../../package.json"; // read npm package version from package.json

const { patterns } = usePattern();

const currentPattern = ref<Pattern>(patterns[0]);

const text = ref<string>();

const links = ref([
  {
    title: "Source Code",
    link: "https://github.com/this-oliver/rothko-js"
  },
  {
    title: "Documentation",
    link: "https://github.com/this-oliver/rothko-js?tab=readme-ov-file#install"
  },
  {
    title: "Inspiration",
    link: "https://www.oliverrr.net/notes/text-based-generative-color-and-shapes-heotxz"
  }
]);

async function downloadCanvas() {
  // skip if not in browser
  if (typeof window === "undefined" || typeof document === "undefined") {
    console.warn("This function can only be run in a browser environment.");
    return;
  }

  try {
    const element = document.getElementById("canvas") as HTMLCanvasElement;
    const canvas = await html2canvas(element);

    const link = document.createElement("a");
    link.download = "rothko.png";
    link.href = canvas.toDataURL();
    link.click();
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line no-alert
    alert(`Something went wrong: ${(error as Error).message}`);
  }
}

function capitalize(string: any): string {
  if (typeof string !== "string")
    return "";

  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<template>
  <div class="min-h-screen flex flex-col text-black dark:text-white bg-white dark:bg-stone-900">
    <!-- Header -->
    <header class="w-full flex items-center justify-center py-4">
      <h1 class="text-3xl font-bold text-primary-600 dark:text-primary-400">
        Rothko <small class="text-base font-normal">v.{{ version }}</small>
      </h1>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center w-full px-2">
      <div class="w-full max-w-2xl mx-auto grid gap-6 mt-8">
        <!-- RothkoCard -->
        <div class="w-full">
          <RothkoCard
            id="canvas"
            :source="text"
            :pattern="currentPattern"
            class="w-full min-h-[50vh]" />
        </div>

        <!-- Pattern Select -->
        <div class="w-full">
          <label for="pattern-select" class="block mb-1 font-medium text-stone-700 dark:text-stone-200">Pattern</label>
          <select
            id="pattern-select"
            v-model="currentPattern"
            class="w-full rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option v-for="item in patterns" :key="item" :value="item">
              {{ capitalize(item) }}
            </option>
          </select>
        </div>

        <!-- Textarea and Download -->
        <div class="w-full">
          <label for="input-text" class="block mb-1 font-medium text-stone-700 dark:text-stone-200">Input Text</label>
          <textarea
            id="input-text"
            v-model="text"
            rows="3"
            class="w-full rounded border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y"
            placeholder="Try entering a few words, or a sentence, or a paragraph into the input field above and see what happens" />
          <button
            class="mt-2 px-4 py-2 border border-primary-600 text-primary-600 rounded hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
            @click="downloadCanvas">
            Download
          </button>
        </div>

        <!-- Info Section -->
        <div class="w-full mt-4">
          <hr class="my-4 border-stone-300 dark:border-stone-700">

          <h1 class="text-2xl font-bold mb-2">
            <code>Rothko-js</code>
          </h1>
          <p class="mb-2">
            A simple Vue3 component that generates shapes and patterns based on text input.
          </p>

          <h2 class="text-xl font-semibold mt-4">
            Features
          </h2>
          <ul class="list-disc pl-6 mb-2">
            <li>🖌️ Generate shapes and patterns based on text input</li>
            <li>🎨 Apply colors based on text input</li>
            <li>🪄 Do all of the above deterministically (always get the same shapes, patterns, and colors for the same input)</li>
          </ul>

          <h2 class="text-xl font-semibold mt-4">
            Why use <code>Rothko-js</code>
          </h2>
          <p class="mb-2">
            There are a number of pain points that this tool addresses:
          </p>
          <ul class="list-disc pl-6">
            <li>large bodies of text with no graphics are boring</li>
            <li>graphics take time/money to create</li>
            <li>hosting images (graphics) can get expensive</li>
          </ul>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-4 mt-8">
      <div class="flex flex-wrap items-center justify-center gap-4 px-2">
        <template v-for="item in links" :key="item.link">
          <a
            class="mx-2 hover:underline hover:text-blue-400 dark:hover:text-blue-200"
            :href="item.link"
            target="_blank">
            {{ item.title }}
          </a>
        </template>
        <span class="mx-2 text-stone-500 dark:text-stone-400">|</span>
        <a
          class="mx-2 hover:underline hover:text-blue-400 dark:hover:text-blue-200"
          href="https://www.oliverrr.net"
          target="_blank">Oliverrr 🤠</a>
        <span class="mx-2 text-stone-500 dark:text-stone-400">&copy; {{ new Date().getFullYear() }}</span>
      </div>
    </footer>
  </div>
</template>
