import type { Plugin } from 'vue'
import RothkoCard from './RothkoCard.vue'

export { RothkoCard }

const plugin: Plugin = {
  install(app) {
    app.component('RothkoCard', RothkoCard)
  }
}

export default plugin