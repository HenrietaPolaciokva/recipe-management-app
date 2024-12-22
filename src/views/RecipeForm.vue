<template>
  <!-- This is the form for adding a new recipe or editing an existing one -->

  <!-- The form is displayed in a container with a margin of 5 units on the top -->
  <div class="container mt-5" v-if="recipe">
    <!-- The form is a row with a gap of 3 units between elements -->
    <form class="row g-3" @submit.prevent="handleSubmit">
      <!-- The first column contains the recipe name -->
      <div class="col-md-6">
        <label for="name" class="form-label">Recipe Name</label>
        <input
          type="text"
          id="name"
          v-model="recipe.name"
          required
          class="form-control"
        />
      </div>

      <!-- The second column contains the ingredients -->
      <div class="col-12">
        <label for="ingredients" class="form-label">Ingredients</label>
        <textarea
          id="ingredients"
          v-model="recipe.ingredients"
          required
          class="form-control"
          rows="5"
        ></textarea>
      </div>

      <!-- The third column contains the instructions -->
      <div class="col-12">
        <label for="instructions" class="form-label">Instructions</label>
        <textarea
          id="instructions"
          v-model="recipe.instructions"
          required
          class="form-control"
          rows="5"
        ></textarea>
      </div>

      <!-- The fourth column contains the preparation time -->
      <div class="col-md-6">
        <label for="prepTime" class="form-label"
          >Preparation Time (minutes)</label
        >
        <input
          type="number"
          id="prepTime"
          v-model="recipe.prepTime"
          required
          class="form-control"
        />
      </div>

      <!-- The fifth column contains the cooking time -->
      <div class="col-md-6">
        <label for="cookTime" class="form-label">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookTime"
          v-model="recipe.cookTime"
          required
          class="form-control"
        />
      </div>

      <!-- The sixth column contains the notes -->
      <div class="col-12">
        <label for="notes" class="form-label">Notes</label>
        <textarea
          id="notes"
          v-model="recipe.notes"
          class="form-control"
          rows="5"
        ></textarea>
      </div>

      <!-- The last column contains the submit and cancel buttons -->
      <div class="col-12 d-flex justify-content-end">
        <button type="submit" class="btn btn-primary me-2">
          {{ isEditMode ? "Save Changes" : "Add Recipe" }}
        </button>
        <button type="button" @click="handleCancel" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecipeForm",
  /**
   * The data object stores the recipe data and the mode of the form.
   * @type {Object}
   */
  data() {
    return {
      /**
       * The recipe object stores the recipe data.
       * @type {Object}
       */
      recipe: {
        /**
         * The name of the recipe.
         * @type {String}
         */
        name: "",
        /**
         * The ingredients of the recipe.
         * @type {String}
         */
        ingredients: "",
        /**
         * The instructions of the recipe.
         * @type {String}
         */
        instructions: "",
        /**
         * The preparation time of the recipe in minutes.
         * @type {Number}
         */
        prepTime: 0,
        /**
         * The cooking time of the recipe in minutes.
         * @type {Number}
         */
        cookTime: 0,
        /**
         * The notes of the recipe.
         * @type {String}
         */
        notes: "",
      },
      /**
       * A flag indicating whether the form is in edit mode.
       * @type {Boolean}
       */
      isEditMode: false,
      /**
       * The endpoint of the JSON server.
       * @type {String}
       */
      apiUrl: "http://localhost:3000/recipes",
    };
  },

  methods: {
    /**
     * Handles the submission of the form, either creating a new recipe
     * or updating an existing one.
     *
     * @returns {Promise<void>}
     */
    async handleSubmit() {
      try {
        if (this.isEditMode) {
          // Update the existing recipe
          await this.updateRecipe();
        } else {
          // Create a new recipe
          await this.addRecipe();
        }
      } catch (error) {
        console.error("Error submitting the recipe:", error);
      }
    },

    /**
     * Adds a new recipe to the database.
     *
     * @returns {Promise<void>}
     */
    async addRecipe() {
      try {
        // Make a POST request to the API to add a new recipe
        const response = await axios.post(this.apiUrl, this.recipe);
        console.log("Recipe added successfully:", response.data);
        // Navigate to the recipes list after a successful addition
        this.$router.push("/recipes");
      } catch (error) {
        console.error("Error adding the recipe:", error);
      }
    },

    /**
     * Updates an existing recipe in the database.
     *
     * @returns {Promise<void>}
     */
    async updateRecipe() {
      try {
        // Make a PUT request to the API to update the existing recipe
        const response = await axios.put(
          `${this.apiUrl}/${this.recipe.id}`,
          this.recipe
        );
        console.log("Recipe updated successfully:", response.data);
        // Navigate to the recipes list after a successful update
        this.$router.push("/recipes");
      } catch (error) {
        console.error("Error updating the recipe:", error);
      }
    },

    /**
     * Handles the cancel button click.
     * Navigates the user back to the recipes list.
     * @returns {void}
     */
    handleCancel() {
      this.$router.push("/recipes");
    },

    /**
     * Fetches the recipe data from the database if the form is in edit mode.
     * @returns {Promise<void>}
     */
    async fetchRecipeData() {
      const recipeId = this.$route.params.id;
      if (recipeId) {
        this.isEditMode = true;
        try {
          // Make a GET request to the API to fetch the recipe data
          const response = await axios.get(`${this.apiUrl}/${recipeId}`);
          // Update the form with the fetched recipe data
          this.recipe = response.data;
        } catch (error) {
          console.error("Error fetching the recipe:", error);
        }
      }
    },
  },
  /**
   * Lifecycle hook that is called when the component is mounted.
   * Fetches the recipe data from the database if the form is in edit mode.
   * @returns {void}
   */
  mounted() {
    this.fetchRecipeData();
  },
};
</script>

<style scoped>
.form-label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  color: #333;
  text-align: left;
}
.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
