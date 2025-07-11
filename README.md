# Rothko-js 🖼️

A tool that deterministically generates visual patterns based on text-based input.

https://github.com/this-oliver/rothko/assets/32515201/273badee-2063-4749-83ea-d1c1e7570c68

## Features

- 🖌️ Graphics: Generate shapes and patterns based on text input
- 🎨 Colors: Apply colors based on text input
- 🪄 Deterministic: Get the same shapes, patterns, and colors for the same input

## Why use rothko-js?

There are a number of pain points that this tool addresses:

- blogs with no graphics are boring
- graphics take time/money to create
- hosting graphical images is expensive

## Install

```bash
npm install rothko-js
```

## Usage

```vue
<script setup lang='ts'>
import { RothkoCard } from "rothko-js";

const textInput = ref<string>();
</script>

<template>
  <RothkoCard source="textInput" />
</template>
```

### Configuration

| Prop         | Type   | Default           | Description                                                             |
| ------------ | ------ | ----------------- | ----------------------------------------------------------------------- |
| source       | string | -                 | The text input used to generate the graphics                            |
| pattern      | string | 'quad'            | The pattern used to generate the graphics (e.g. quad, circle, triangle) |
| color        | string | -                 | The background color                                                    |
| height       | number | '100px'           | The height of the canvas                                                |
| width        | number | 'auto'            | The width of the canvas                                                 |
| padding      | number | '0.5rem'          | The padding of the canvas                                               |
| borderRadius | number | '5px 5px 0px 0px' | The border radius of the canvas                                         |

## How does rothko-js work?

`rothko-js` uses a [hash function](https://www.bitpanda.com/academy/en/lessons/what-is-a-hash-function-in-a-blockchain-transaction/) to generate colors and patterns based on the text input. A hash function takes produces some output for a given input. More importantly, the output is always the same (deterministic) for a given input and it is hard to infer the input from the output. These characteristics make hash functions extremely vital, in the context of information security, because they ensure the integrity of a payload.

For the purpose of this library, hash functions are a great way to generate the same colors (hex), coordinates and dimensions for a given text input. In other words, `rothko-js` uses hash functions to
convert text-inputs, like the title of your blog, into a unique and deterministic graphical representations.

## Credits

1. This tool is inspired by **Ruby Chen**, a designer at OpenAI. You can find the works that inspired this tool on [OpenAI's blogs](https://openai.com/blog/).
2. The name of this tool is inspired by [**Mark Rothko**](https://en.wikipedia.org/wiki/Mark_Rothko), a painter who is best known for his abstract expressionist paintings which this tool tries to emulate.
3. The implementation of this tool is based on the open-source implementation of [**vue-sonner**](https://github.com/xiaoluoboding/vue-sonner)
