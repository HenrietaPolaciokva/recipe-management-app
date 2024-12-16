import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import RecipeListDisplay from "../views/RecipeListDisplay.vue";
import RecipeDetails from "../views/RecipeDetails.vue";
import RecipeForm from "../views/RecipeForm.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/recipes", name: "RecipeListDisplay", component: RecipeListDisplay },
  { path: "/recipes/:id", name: "RecipeDetails", component: RecipeDetails },
  { path: "/recipes/form", name: "RecipeForm", component: RecipeForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
