<template>
  <div id="app">
    <!-- Application AppBar -->
    <v-app id="inspire" dark class="primary">
      <v-app-bar :elevation="12" rounded>
        <div
          class="container-fluid d-flex align-items-center justify-content-between"
        >
          <!-- Logo Section -->
          <div class="logo d-flex align-items-center">
            <img src="../../assets/logo.png" alt="Logo" class="logo-img me-2" />
            <router-link to="/" class="app-name text-white fs-5 fw-bold"
              >Hena's Recipe App</router-link
            >
          </div>

          <!-- Navigation Menu -->
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <router-link to="/" class="nav-link text-white"
                    >Home</router-link
                  >
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle text-white"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Recipes
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <router-link to="/recipes" class="dropdown-item"
                        >All Recipes</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/recipes/form" class="dropdown-item"
                        >Add Recipe</router-link
                      >
                    </li>
                  </ul>
                </li>
              </ul>
              <!-- Right Aligned Section -->
              <div class="d-flex align-items-center gap-2">
                <input
                  type="text"
                  class="form-control search-bar"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <button v-bind="attrs" v-on="on" class="btn btn-light me-2">
                      Login
                    </button>
                  </template>
                  <span>Log in to your account</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <button
                      v-bind="attrs"
                      v-on="on"
                      class="btn btn-outline-light"
                    >
                      Sign Up
                    </button>
                  </template>
                  <span>Create a new account</span>
                </v-tooltip>
                <!-- Theme Toggle Button -->
                <v-btn icon @click="toggleTheme">
                  <v-icon>{{
                    isDark
                      ? "mdi-white-balance-sunny"
                      : "mdi-moon-waning-crescent"
                  }}</v-icon>
                </v-btn>
              </div>
            </div>
          </nav>
        </div>
      </v-app-bar>
    </v-app>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HeaderSection",
  setup() {
    const isDark = ref(false);

    const toggleTheme = () => {
      isDark.value = !isDark.value;
      document.body.classList.toggle("dark-theme", isDark.value);
    };

    return { isDark, toggleTheme };
  },
};
</script>

<style scoped>
/* Enhance the logo section with animation */
.logo-img {
  width: 40px;
  height: auto;
  transition: transform 0.3s ease-in-out;
}
.logo-img:hover {
  transform: rotate(360deg);
}

/* Improved search bar styling */
.search-bar {
  max-width: 200px;
  border-radius: 20px;
  padding: 0.5rem 1rem;
}

/* Add theme-specific styles */
body.dark-theme {
  background-color: #121212;
  color: #fff;
}

/* Navbar background for transparency */
.navbar {
  background-color: rgba(0, 0, 0, 0.85) !important;
}

/* Add hover effects for nav links */
.nav-link:hover {
  color: #ffc107 !important;
  text-decoration: underline;
}

/* Button animations */
.btn {
  transition: all 0.3s ease-in-out;
}
.btn:hover {
  transform: scale(1.1);
}

/* Tooltip styling */
.v-tooltip {
  font-size: 0.9rem;
  padding: 0.5rem;
}
</style>
