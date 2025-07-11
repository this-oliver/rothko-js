import { createApp } from "vue";
import App from "./App.vue";
import { setupVuetify } from "./plugins";

const app = createApp(App);

app.use(setupVuetify());
app.mount("#app");
