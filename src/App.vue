<!-- 
  This is the main entry point for the application.
  It sets up the main navigation, and the router view to display the components.
-->

<template>
  <div id="app">
    <!-- Application AppBar -->
    <v-app id="inspire" dark class="primary">
      <v-app-bar :elevation="12" rounded>
        <!-- 
          The app title is displayed on the left side of the bar.
        -->
        <v-app-bar-title>Recipe App</v-app-bar-title>

        <!-- 
          The v-spacer component is used to add a space between the app title and the navigation links.
        -->
        <v-spacer></v-spacer>

        <!-- 
          The spacer is used to push the links to the right side of the bar.
        -->
        <v-spacer></v-spacer>

        <!-- 
          These are the navigation links.
          The v-btn component is used to create a button.
          The text property is used to specify the text displayed on the button.
          The to property is used to specify the route to navigate to when the button is clicked.
          The exact property is used to specify that the route should be matched exactly.
          The active-class property is used to specify the class to add to the button when it is active.
        -->
        <router-link
          to="/"
          class="v-btn v-btn--text"
          exact
          active-class="active"
          >Home</router-link
        >
        <router-link
          to="/recipes"
          class="v-btn v-btn--text"
          exact
          active-class="active"
          >Recipes</router-link
        >
        <router-link
          to="/recipes/form"
          class="v-btn v-btn--text"
          exact
          active-class="active"
          >Add Recipe</router-link
        >
      </v-app-bar>

      <!-- 
        The router view is where the components will be displayed.
        It is a built-in component in Vue Router.
      -->
      <v-main>
        <router-view />
      </v-main>
    </v-app>
    <!-- Import the Application Footer here -->
  </div>
  <FooterSection />
</template>

<script>
import FooterSection from "./components/reusables/FooterSection.vue";
export default {
  name: "App",
  components: {
    // Components used in the application
    FooterSection,
  },
  data() {
    return {
      // Data used in the application
      // ...
      // ...
      // ...
    };
  },
  methods: {
    // Methods used in the application
    // ...
    // ...
    // ...
  },
};
</script>

<script setup></script>

<style scoped>
/* General App Styles */

/* Apply a clean font and set up a full-height layout */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

/* Style for the active navigation link */
.active {
  color: #42b983 !important;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #42b983; /* Green underline for active link */
}

/* Application Header */
.v-app-bar {
  background-color: #42b983; /* Green background for the app bar */
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Add a shadow for a subtle floating effect */
  padding: 10px 20px;
  border-radius: 8px;
}

.v-app-bar-title {
  font-weight: 600;
  font-size: 1.5rem;
}

.v-spacer {
  margin: 0 10px;
}

/* Style for the navigation buttons (links) */
router-link {
  margin: 0 15px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.3s, font-weight 0.3s;
}

/* Hover effect for the navigation links */
router-link:hover {
  color: #ffbb33; /* Change to a golden color on hover */
  font-weight: bold;
}

/* Main Content Styling */
.v-main {
  flex-grow: 1; /* Allow the main content to expand and fill remaining space */
  padding: 20px;
}

/* Footer Section - Adding spacing and alignment */
footer {
  margin-top: 30px;
  text-align: center;
  color: #42b983;
  font-size: 1rem;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Recipe List Styling */
#recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 0;
  list-style: none;
}

#recipe-list li {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #42b983; /* Green color for recipe items */
}

#recipe-list a {
  color: inherit; /* Inherit the green color for consistency */
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s, text-decoration 0.3s;
}

#recipe-list a:hover {
  text-decoration: underline;
  color: #ffbb33; /* Change to golden color when hovered */
}

/* Recipe Form Styling */
#recipe-form {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #42b983;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px; /* Limit the width of the form */
  margin-left: auto;
  margin-right: auto;
}

#recipe-form input,
#recipe-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

#recipe-form button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

#recipe-form button:hover {
  background-color: #34a76a; /* Slightly darker green on hover */
}
</style>
