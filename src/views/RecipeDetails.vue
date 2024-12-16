<template>
  <!-- This is the main template for the Recipe Details page. It displays a heading with the recipe name, the image, ingredients, instructions, and additional information. It also displays the comments and rating. -->
  <div>
    <!-- The heading displays the recipe name -->
    <h1>{{ recipe.name }}</h1>
    <!-- The image displays the recipe image -->
    <img :src="recipe.image" alt="Recipe Image" />
    <!-- The ingredients list displays the ingredients -->
    <div>
      <h2>Ingredients</h2>
      <ul>
        <!-- We loop through the ingredients array and display each one -->
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <!-- The instructions display the instructions -->
    <div>
      <h2>Instructions</h2>
      <p>{{ recipe.instructions }}</p>
    </div>
    <!-- The additional information displays the preparation time, cooking time, and notes -->
    <div>
      <h2>Additional Information</h2>
      <p>Preparation Time: {{ recipe.prepTime }} minutes</p>
      <p>Cooking Time: {{ recipe.cookTime }} minutes</p>
      <p>Notes: {{ recipe.notes }}</p>
    </div>
    <!-- The edit button will take the user to the edit page -->
    <button @click="editRecipe">Edit</button>
    <!-- The delete button will delete the recipe -->
    <button @click="deleteRecipe">Delete</button>
    <!-- The back button will take the user to the list page -->
    <button @click="goBack">Back to List</button>
    <!-- The comments section displays the comments -->
    <div>
      <h2>Comments</h2>
      <ul>
        <!-- We loop through the comments array and display each one -->
        <li v-for="(comment, index) in recipe.comments" :key="index">
          {{ comment.text }}
          <span v-if="comment.username">(by {{ comment.username }})</span>
        </li>
      </ul>
      <!-- The form allows the user to add a comment -->
      <form @submit.prevent="addComment">
        <textarea v-model="newComment" placeholder="Add a comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
    <!-- The rating section displays the average rating and allows the user to rate the recipe -->
    <div>
      <h2>Rating</h2>
      <p>
        Average Rating: {{ recipe.rating }} ({{ recipe.ratingCount }} ratings)
      </p>
      <div>
        <span v-for="star in 5" :key="star" @click="rateRecipe(star)">
          {{ star <= recipe.userRating ? " " : " " }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        name: "",
        image: "",
        ingredients: [],
        instructions: "",
        prepTime: 0,
        cookTime: 0,
        notes: "",
        comments: [],
        rating: 0,
        ratingCount: 0,
        userRating: 0,
      },
      newComment: "",
    };
  },
  methods: {
    editRecipe() {
      // This method will take the user to the edit page
      this.$router.push(`/recipes/edit/${this.recipe.id}`);
    },
    deleteRecipe() {
      // This method will delete the recipe after a confirmation prompt
      if (confirm("Are you sure you want to delete this recipe?")) {
        // Remove the recipe from the state or backend
        alert("Recipe deleted successfully!");
        this.$router.push("/recipes");
      }
    },
    goBack() {
      // This method will take the user to the list page
      this.$router.push("/recipes");
    },
    addComment() {
      // This method will add a comment to the recipe
      if (this.newComment.trim()) {
        // Add the comment to the comments array
        this.recipe.comments.push({
          id: Date.now(),
          text: this.newComment,
          username: "Anonymous",
        });
        // Reset the comment text
        this.newComment = "";
      }
    },
    rateRecipe(star) {
      // This method will rate the recipe
      // Set the user rating to the star rating
      this.recipe.userRating = star;
      // Update the rating in the state or backend
    },
  },
  created() {
    // This method will load the recipe details from the state or backend when the component is created
    const recipeId = this.$route.params.id;
    this.recipe = this.getRecipeById(recipeId);
  },
};
</script>

<style scoped>
image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

span {
  font-weight: bold;
  margin-right: 5px;
  cursor: pointer;
}

</style>

