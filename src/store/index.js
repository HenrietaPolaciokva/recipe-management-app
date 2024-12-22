import { defineStore } from "pinia";
import axios from "axios";

const storageKey = "recipes";

const getRecipesFromStorage = () => {
  const storedRecipes = localStorage.getItem(storageKey);
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

const saveRecipesToStorage = (recipes) => {
  localStorage.setItem(storageKey, JSON.stringify(recipes));
};

const addRecipeToStorage = (newRecipe) => {
  const recipes = getRecipesFromStorage();
  recipes.push(newRecipe);
  saveRecipesToStorage(recipes);
};

const updateRecipeInStorage = (updatedRecipe) => {
  const recipes = getRecipesFromStorage();
  const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
  if (index !== -1) {
    recipes[index] = updatedRecipe;
    saveRecipesToStorage(recipes);
  }
};

const deleteRecipeFromStorage = (id) => {
  const recipes = getRecipesFromStorage();
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index !== -1) {
    recipes.splice(index, 1);
    saveRecipesToStorage(recipes);
  }
};

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: getRecipesFromStorage(),
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
  }),
  getters: {
    getRecipeById: (state) => (id) => {
      return state.recipes.find((recipe) => recipe.id === id);
    },
    getRecipesForCurrentPage: (state) =>
      state.recipes.slice(
        (state.currentPage - 1) * state.itemsPerPage,
        state.currentPage * state.itemsPerPage
      ),
    getTotalRecipes: (state) => state.recipes.length,
    getRecipes: (state) => state.recipes,
  },
  actions: {
    async fetchRecipes() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/recipes");
        this.recipes = response.data;
        return Promise.resolve();
      } catch (error) {
        console.error("Error fetching recipes:", error);
        return Promise.reject(error);
      }
    },
    async addRecipe(recipe) {
      try {
        this.loading = true;
        addRecipeToStorage(recipe);
        this.recipes = getRecipesFromStorage();
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    async updateRecipe(updatedRecipe) {
      try {
        this.loading = true;
        updateRecipeInStorage(updatedRecipe);
        this.recipes = getRecipesFromStorage();
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    async deleteRecipe(id) {
      try {
        this.loading = true;
        deleteRecipeFromStorage(id);
        this.recipes = getRecipesFromStorage();
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
  },
});

export default useRecipesStore;
