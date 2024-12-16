import { createStore } from "vuex";

// Define the initial state of the recipes store
const initialState = {
  recipes: [],
};

// Define the recipes store using Vuex
export const useRecipesStore = createStore({
  // state: initialState,
  getters: {
    // Get a recipe by its ID
    getRecipeById: (state) => (id) => state.recipes.find((r) => r.id === id),
    // Get all recipes
    getRecipes: (state) => state.recipes,
  },
  mutations: {
    // Add a new recipe to the state
    addRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    // Update an existing recipe in the state
    updateRecipe(state, { id, updatedRecipe }) {
      const index = state.recipes.findIndex((r) => r.id === id);
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      }
    },
    // Delete a recipe from the state
    deleteRecipe(state, id) {
      state.recipes = state.recipes.filter((r) => r.id !== id);
    },
    // Set the recipes state with a new array of recipes
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    // Clear all recipes from the state
    clearRecipes(state) {
      state.recipes = [];
    },
  },
  actions: {
    // Commit a new recipe to the state
    addRecipe({ commit }, recipe) {
      commit("addRecipe", recipe);
    },
    // Commit an updated recipe to the state
    updateRecipe({ commit }, { id, updatedRecipe }) {
      commit("updateRecipe", { id, updatedRecipe });
    },
    // Commit a recipe deletion to the state
    deleteRecipe({ commit }, id) {
      commit("deleteRecipe", id);
    },
    // Commit a new set of recipes to the state
    setRecipes({ commit }, recipes) {
      commit("setRecipes", recipes);
    },
    // Commit clearing all recipes from the state
    clearRecipes({ commit }) {
      commit("clearRecipes");
    },
  },
  modules: {},
});

export default useRecipesStore;
