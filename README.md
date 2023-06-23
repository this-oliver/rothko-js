# Rothko-js 🖼️

A tool that generates colors and visual patterns based on text-based input.

https://github.com/this-oliver/rothko/assets/32515201/273badee-2063-4749-83ea-d1c1e7570c68

## Features

- 🎨 Generate colors deterministically based on text input
- 🖌️ Generate shapes and patterns based on text input
- 🧪 Configure the colors and patterns

## Install

```bash
npm install rothko-js
```

## Usage

```vue
<script setup lang='ts'>
import { RothkoCard } from 'rothko-js'

const textInput = ref<string>()
</script>

<template>
  <rothko-card source="textInput" />
</template>
```

## Why use rothko-js?

There are a number of pain points that this tool addresses:

- blogs with no graphics are boring
- graphics take time/money to create
- hosting graphical images (S3 buckets) is expensive

## How does rothko-js work?

`rothko-js` uses a deterministic [hash function](https://www.bitpanda.com/academy/en/lessons/what-is-a-hash-function-in-a-blockchain-transaction/) to generate colors and patterns based on the text input. This means that the same text input will always generate the same colors and patterns.

Practically speaking, you can feed the title of your blog post into `rothko-js` and it will generate a unique color and pattern (graphic) for your blog post.

## Credits

1. This tool is inspired by **Ruby Chen**, a designer at OpenAI. You can find the works that inspired this tool on [OpenAI's blogs](https://openai.com/blog/).
2. The name of this tool is inspired by [**Mark Rothko**](https://en.wikipedia.org/wiki/Mark_Rothko), an American painter who is best known for his abstract expressionist paintings which this tool tries to emulate.
3. The implementation of this tool is based on the open-source implementation of [**vue-sonner**](https://github.com/xiaoluoboding/vue-sonner)
