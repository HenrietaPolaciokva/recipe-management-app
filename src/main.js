/**
 * The main entry point of the application.
 *
 * This file creates a Vue application, sets up the Pinia store, sets up the
 * router, and mounts the application to the #app element in the DOM.
 *
 * @author Hena Hena
 */
import { createApp } from "vue";
import App from "./App.vue";
/**
 * The router is imported from the ./router file, which is responsible for
 * setting up the application's routing configuration.
 */
import router from "./router";
/**
 * The Pinia store is a global, centralized store for the application's state.
 * It is created using the createPinia() function from the pinia library.
 */
import { createPinia } from "pinia";
/**
 * The Bootstrap CSS file is imported to provide a basic style for the
 * application.
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
/**
 * The Vue application is created by calling the createApp() function, passing
 * the App component as the first argument. This creates a new Vue application
 * instance, which is then configured by calling the use() method.
 */
const app = createApp(App);
/**
 * The Pinia store is added to the application by calling the use() method and
 * passing the Pinia store instance as the argument. This sets up the store for
 * use by the application's components.
 */
app.use(createPinia());
/**
 * The router is added to the application by calling the use() method and
 * passing the router instance as the argument. This sets up the router for use
 * by the application's components.
 */
app.use(router);
/**
 * The application is mounted to the #app element in the DOM by calling the
 * mount() method. This renders the application to the DOM and makes it
 * available to the user.
 */
app.mount("#app");
