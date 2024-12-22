<template>
  <!-- The form to edit a recipe -->
  <div class="container mt-5" v-if="recipe">
    <form class="row g-3" @submit.prevent="handleSubmit">
      <div class="col-md-6">
        <label for="name" class="form-label">Recipe Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="recipe.name"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="prepTime" class="form-label">Prep Time (minutes)</label>
        <input
          type="number"
          class="form-control"
          id="prepTime"
          v-model="recipe.prepTime"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="cookTime" class="form-label">Cook Time (minutes)</label>
        <input
          type="number"
          class="form-control"
          id="cookTime"
          v-model="recipe.cookTime"
          required
        />
      </div>
      <div class="col-12">
        <label for="ingredients" class="form-label">Ingredients</label>
        <textarea
          class="form-control"
          id="ingredients"
          v-model="recipe.ingredients"
          rows="3"
          required
        ></textarea>
      </div>
      <div class="col-12">
        <label for="instructions" class="form-label">Instructions</label>
        <textarea
          class="form-control"
          id="instructions"
          v-model="recipe.instructions"
          rows="5"
          required
        ></textarea>
      </div>
      <div class="col-12">
        <label for="notes" class="form-label">Notes</label>
        <textarea
          class="form-control"
          id="notes"
          v-model="recipe.notes"
          rows="3"
        ></textarea>
      </div>
      <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary me-2">Save Changes</button>
        <button type="button" @click="handleCancel" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/**
 * @description Edit a recipe
 */
export default {
  name: "RecipeEditForm",
  /**
   * Data object for the component.
   * Initially the recipe data is set to null so we can check the loading state.
   * @type {Object}
   */
  data() {
    return {
      /**
       * The recipe data, initially set to null.
       * @type {Object|null}
       */
      recipe: null,
    };
  },
  methods: {
    /**
     * Fetch the recipe data from the server.
     * @returns {Promise<void>}
     */
    async fetchRecipeData() {
      const recipeId = this.$route.params.id; // Get recipe ID from route params
      if (recipeId) {
        try {
          const response = await fetch(
            `http://localhost:3000/recipes/${recipeId}`
          );
          if (!response.ok) throw new Error("Failed to fetch recipe data");
          this.recipe = await response.json(); // Populate the recipe data
        } catch (error) {
          console.error(error);
          this.$router.push("/recipes"); // Redirect if error
        }
      }
    },
    /**
     * Handle the form submission.
     * @returns {Promise<void>}
     */
    async handleSubmit() {
      const recipeId = this.$route.params.id; // Get the ID from route params
      try {
        const response = await fetch(
          `http://localhost:3000/recipes/${recipeId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.recipe),
          }
        );
        if (!response.ok) throw new Error("Failed to update recipe");
        this.$router.push(`/recipes/${recipeId}`); // Redirect to the updated recipe page
      } catch (error) {
        console.error(error);
        alert("Failed to save changes. Please try again.");
      }
    },
    /**
     * Handle the cancel button click.
     * @returns {void}
     */
    handleCancel() {
      this.$router.push("/recipes"); // Navigate back to the recipes list
    },
  },
  /**
   * Fetch the data when the component is mounted.
   * @returns {Promise<void>}
   */
  async mounted() {
    await this.fetchRecipeData(); // Fetch the data when the component is mounted
  },
};
</script>

