import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { Toast, Button, Form, Field, Popup } from "vant";
import "vant/lib/index.css";
import "@icon-park/vue-next/styles/index.css";

const app = createApp(App);

app.use(router);

app.use(Toast);
app.use(Button);
app.use(Form);
app.use(Field);
app.use(Popup);

app.mount("#app");
