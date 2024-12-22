<template>
  <div id="app">
    <!-- Application AppBar -->
    <v-app id="inspire" dark class="primary">
      <v-app-bar :elevation="12" rounded>
        <HeaderSection />
      </v-app-bar>

      <!-- The router view is where the components will be displayed -->
      <v-main>
        <router-view />
      </v-main>

      <!-- Footer Section -->
      <v-footer dark padless>
        <FooterSection />
      </v-footer> </v-app
    >>
  </div>
</template>

<script>
import FooterSection from "./components/reusables/FooterSection.vue";
import HeaderSection from "./components/reusables/HeaderSection.vue";

export default {
  name: "App",
  components: {
    HeaderSection,
    FooterSection,
  },
};
</script>

<style scoped>
/* Style the logo for better placement and scaling */
.logo-img {
  width: 50px;
  height: auto;
}

/* Ensure responsiveness for navbar */
@media (max-width: 768px) {
  .navbar-brand {
    font-size: 1.2rem;
  }
}
</style>
