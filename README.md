# Rothko-js 🖼️

A tool that generates colors and visual patterns based on text-based input.

## Features

- Generate colors based on text input
- Generate shapes and patterns based on text input
- Configure the colors and patterns

## Why Rothko-js?

There are a number of pain points that this tool addresses:

- blogs with no visual identity are boring
- graphics take time/mony to create
- hosting images (S3 buckets) is expensive

`rothko-js` uses a hash function to generate colors and patterns based on the text input. The hash function is deterministic, so the same text input will always generate the same colors and patterns. This means that you can use the same text input to generate the same colors and patterns for your blog posts.

Practically speaking, you can feed the title of your blog post into `rothko-js` and it will generate a unique color and pattern (graphic) for your blog post.

## Credits

1. This tool is inspired by **Ruby Chen**, a designer at OpenAI. You can find the works that inspired this tool on [OpenAI's blogs](https://openai.com/blog/).
2. The name of this tool is inspired by [**Mark Rothko**](https://en.wikipedia.org/wiki/Mark_Rothko), an American painter who is best known for his abstract expressionist paintings which this tool tries to emulate.
3. The implementation of this tool is based on the open-source implementation of [**vue-sonner**](https://github.com/xiaoluoboding/vue-sonner)
