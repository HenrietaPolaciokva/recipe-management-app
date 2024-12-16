<template>
  <!-- The form displays the recipe name, ingredients and instructions. 
  There are buttons for submitting the form and canceling the operation.
  The form is used for both adding and editing recipes. -->
  <div>
    <h1>{{ isEditMode ? "Edit Recipe" : "Add Recipe" }}</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Name input field -->
      <div>
        <label for="name">Recipe Name</label>
        <input type="text" id="name" v-model="recipe.name" required />
      </div>
      <!-- Ingredients textarea -->
      <div>
        <label for="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          v-model="recipe.ingredients"
          required
        ></textarea>
      </div>
      <!-- Instructions textarea -->
      <div>
        <label for="instructions">Instructions</label>
        <textarea
          id="instructions"
          v-model="recipe.instructions"
          required
        ></textarea>
      </div>
      <!-- Submit and cancel buttons -->
      <div>
        <button type="submit">
          {{ isEditMode ? "Save Changes" : "Add Recipe" }}
        </button>
        <button type="button" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        name: "",
        ingredients: "",
        instructions: "",
      },
      isEditMode: false,
    };
  },
  methods: {
    // Handles form submission
    handleSubmit() {
      // Check if we are in edit mode
      if (this.isEditMode) {
        // Update the existing recipe
        this.updateRecipe(this.recipe);
      } else {
        // Add a new recipe
        this.addRecipe(this.recipe);
      }
    },
    // Handles cancel button click
    handleCancel() {
      // Navigate back to the previous page
      this.$router.push("/recipes");
    },
    // Adds a new recipe
    addRecipe(recipe) {
      console.log("Adding recipe:", recipe);
      // Add the recipe to the state or backend
      // Display a confirmation message
      alert("Recipe added successfully!");
      // Reset the form
      this.recipe = {
        name: "",
        ingredients: "",
        instructions: "",
      };
    },
    // Updates an existing recipe
    updateRecipe(recipe) {
      console.log("Updating recipe:", recipe);
      // Update the recipe in the state or backend
      // Display a confirmation message
      alert("Recipe updated successfully!");
    },
    // Loads recipe details based on the route parameter
    getRecipeById(id) {
      console.log("Loading recipe details for ID:", id);
      // Load the recipe details from the state or backend
      return {
        name: "Recipe Name",
        ingredients: "Ingredients",
        instructions: "Instructions",
      };
    },
  },
  created() {
    // Check if we are in edit mode and load the recipe details
    const recipeId = this.$route.params.id;
    if (recipeId) {
      this.isEditMode = true;
      // Load the recipe details from the state or backend
      this.recipe = this.getRecipeById(recipeId);
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
