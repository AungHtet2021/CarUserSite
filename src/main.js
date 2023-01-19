import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "../node_modules/alertifyjs/build/css/alertify.min.css";
import "../node_modules/alertifyjs/build/css/themes/bootstrap.min.css";
import * as alertify from "alertifyjs";
// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import materialKit from "./material-kit";



const app = createApp(App);

app.use(createPinia());
app.use(alertify);
app.use(router);
app.use(materialKit);
app.mount("#app");
