<template>
  <!-- This is the form for adding a new recipe -->
  <div class="recipe-form">
    <!-- This is the input for the title of the recipe -->
    <div class="form-input">
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required />
      <!-- This is the error message for the title input -->
      <span class="error-message"></span>
      <br />
    </div>
    <!-- This is the input for the description of the recipe -->
    <div class="form-input">
      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea>
      <!-- This is the error message for the description input -->
      <span class="error-message"></span>
      <br />
    </div>
    <!-- This is the input for the ingredients of the recipe -->
    <div class="form-input">
      <label for="ingredients">Ingredients:</label>
      <input type="text" id="ingredients" name="ingredients" required />
      <!-- This is the error message for the ingredients input -->
      <span class="error-message"></span>
      <br />
    </div>
    <!-- This is the input for the instructions of the recipe -->
    <div class="form-input">
      <label for="instructions">Instructions:</label>
      <textarea id="instructions" name="instructions" required></textarea>
      <!-- This is the error message for the instructions input -->
      <span class="error-message"></span>
      <br />
    </div>
    <!-- This is the submit button for adding the recipe -->
    <v-btn variant="outlined" color="primary" type="submit">Add Recipe</v-btn>
  </div>
</template>

<script>
/**
 * This is the component for adding a new recipe
 */
export default {
  name: "RecipeForm",
  data() {
    /**
     * This is the initial state of the component
     */
    return {
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
    };
  },
  methods: {
    /**
     * This method is called when the form is submitted
     * It adds a new recipe to the state
     */
    addRecipe() {
      const newRecipe = {
        title: this.title,
        description: this.description,
        ingredients: this.ingredients,
        instructions: this.instructions,
      };

      // Call the addRecipe mutation in the store
      this.$store.commit("addRecipe", newRecipe);

      // Reset the form fields
      this.title = "";
      this.description = "";
      this.ingredients = "";
      this.instructions = "";
    },
  },
  computed: {
    /**
     * This is a computed property that returns the recipes from the state
     */
    recipes() {
      return this.$store.state.recipes;
    },
  },
  mounted() {
    // Call the fetchRecipes action when the component is mounted
    this.$store.dispatch("fetchrecipes");
  },
};
</script>
