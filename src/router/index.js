import { createRouter, createWebHistory } from "vue-router";
import RecipeListDisplay from "@/views/RecipeListDisplay.vue";
import RecipeDetails from "@/views/RecipeDetails.vue"; // Assuming this is your recipe details page
import RecipeForm from "@/views/RecipeForm.vue"; // Assuming this is your recipe edit form page
import HomePage from "@/views/HomePage.vue";
import RecipeEditForm from "@/views/RecipeEditForm.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/recipes",
    name: "RecipeListDisplay",
    component: RecipeListDisplay,
  },
  {
    path: "/recipes/:id", // Use a parameter for the recipe ID
    name: "RecipeDetails",
    component: RecipeDetails,
  },
  {
    path: "/recipes/form",
    name: "RecipeForm",
    component: RecipeForm,
  },
  {
    path: "/recipes/form/:id", // Edit form with an optional ID parameter
    name: "RecipeEditForm",
    component: RecipeEditForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
