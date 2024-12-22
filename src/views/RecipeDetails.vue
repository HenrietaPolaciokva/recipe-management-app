<template>
  <div v-if="recipe" class="container mt-5">
    <h1 class="mb-3">{{ recipe.name }}</h1>
    <img
      v-if="recipe.image"
      :src="recipe.image"
      alt="Recipe Image"
      class="img-fluid rounded mb-4"
    />

    <div v-if="recipe.ingredients" class="mb-4">
      <h2>Ingredients</h2>
      <p>- {{ recipe.ingredients }}</p>
      <button
        class="btn btn-outline-secondary"
        @click="copyIngredientsToClipboard"
      >
        Copy Ingredients
      </button>
    </div>

    <div class="mb-4">
      <h2>Instructions</h2>
      <p>{{ recipe.instructions }}</p>
      <button class="btn btn-outline-secondary" @click="printInstructions">
        Print Instructions
      </button>
    </div>

    <div class="mb-4">
      <h2>Additional Information</h2>
      <p><strong>Preparation Time:</strong> {{ recipe.prepTime }} minutes</p>
      <p><strong>Cooking Time:</strong> {{ recipe.cookTime }} minutes</p>
      <p v-if="recipe.notes"><strong>Notes:</strong> {{ recipe.notes }}</p>
    </div>

    <div class="d-flex gap-2 mb-4">
      <button class="btn btn-primary" @click="editRecipe">Edit Recipe</button>
      <button class="btn btn-danger" @click="deleteRecipe">
        Delete Recipe
      </button>
      <button class="btn btn-secondary" @click="goBack">Back to List</button>
    </div>

    <div class="mb-4">
      <h2>Comments</h2>
      <ul>
        <li
          v-for="(comment, index) in recipe.comments"
          :key="index"
          class="mb-2"
        >
          <p>
            {{ comment.text }}
            <span v-if="comment.username" class="text-muted">
              - by {{ comment.username }}
            </span>
          </p>
        </li>
      </ul>
      <form @submit.prevent="addComment" class="mt-3">
        <textarea
          v-model="newComment"
          class="form-control mb-2"
          placeholder="Add a comment"
        ></textarea>
        <button class="btn btn-success" type="submit">Submit Comment</button>
      </form>
    </div>

    <div class="mb-4">
      <h2>Rating</h2>
      <p>
        <strong>Average Rating:</strong>
        {{ averageRating.toFixed(1) }} ({{ recipe.ratingCount }} ratings)
      </p>
      <div>
        <span
          v-for="star in 5"
          :key="star"
          @click="rateRecipe(star)"
          :class="{
            'text-warning': star <= userRating,
            'text-muted': star > userRating,
          }"
          class="me-2"
          style="cursor: pointer"
        >
          ★
        </span>
      </div>
    </div>

    <div class="mb-4">
      <h2>Related Recipes</h2>
      <div class="row">
        <div
          v-for="relatedRecipe in relatedRecipes"
          :key="relatedRecipe.id"
          class="col-md-4 mb-3"
        >
          <div class="card">
            <img
              v-if="relatedRecipe.image"
              :src="relatedRecipe.image"
              class="card-img-top"
              alt="Related Recipe Image"
            />
            <div class="card-body">
              <h5 class="card-title">{{ relatedRecipe.name }}</h5>
              <button
                class="btn btn-outline-primary"
                @click="viewRelatedRecipe(relatedRecipe.id)"
              >
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading recipe...</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRecipesStore } from "@/store";

export default {
  name: "RecipeDetails",
  /**
   * This component displays a single recipe's details, along with related recipes and comments.
   * It also allows the user to rate the recipe and add a comment.
   * @param {Object} recipe - The recipe object to display
   * @param {Array} relatedRecipes - An array of related recipes
   */
  setup() {
    const store = useRecipesStore();
    const router = useRouter();
    const route = useRoute();
    const recipeId = ref(route.params.id);
    const newComment = ref("");
    const userRating = ref(0);

    console.log("RecipeDetails: route.params.id =", route.params.id);

    /**
     * A computed property that returns the recipe object from the store
     * @returns {Object} The recipe object
     */
    const recipe = computed(() => {
      console.log("RecipeDetails: recipe =", store.recipes);
      return store.recipes.find((r) => r.id === recipeId.value) || {};
    });

    /**
     * A computed property that returns an array of related recipes
     * @returns {Array} An array of related recipes
     */
    const relatedRecipes = computed(() => {
      console.log("RecipeDetails: relatedRecipes =", store.recipes);
      return store.recipes.filter(
        (r) => r.category === recipe.value.category && r.id !== recipeId.value
      );
    });

    /**
     * A computed property that returns the average rating of the recipe
     * @returns {Number} The average rating of the recipe
     */
    const averageRating = computed(() => {
      console.log("RecipeDetails: averageRating =", recipe.value);
      if (!recipe.value.ratingCount) return 0;
      return recipe.value.ratingTotal / recipe.value.ratingCount;
    });

    onMounted(() => {
      console.log("RecipeDetails: onMounted");
      store.fetchRecipes();
    });

    /**
     * A method that allows the user to rate the recipe
     * @param {Number} star - The rating given by the user (1-5)
     */
    const rateRecipe = (star) => {
      console.log("RecipeDetails: rateRecipe =", star);
      userRating.value = star;
      recipe.value.ratingTotal += star;
      recipe.value.ratingCount += 1;
      store.updateRecipe(recipe.value);
    };

    /**
     * A method that navigates to the edit recipe page
     */
    const editRecipe = () => {
      console.log("RecipeDetails: editRecipe: recipeId =", recipeId.value);
      console.log("RecipeDetails: editRecipe: recipe =", recipe.value);
      router.push({
        name: "RecipeEditForm",
        params: { id: recipe.value.id },
        query: { edit: true },
      });
      console.log("RecipeDetails: editRecipe: navigated to RecipeForm");
    };

    /**
     * A method that deletes the recipe
     */
    const deleteRecipe = async () => {
      console.log("RecipeDetails: deleteRecipe");
      if (confirm("Are you sure you want to delete this recipe?")) {
        await store.deleteRecipe(recipe.value.id);
        router.push("/");
      }
    };

    /**
     * A method that navigates back to the home page
     */
    const goBack = () => {
      console.log("RecipeDetails: goBack");
      router.push("/");
    };

    /**
     * A method that adds a new comment to the recipe
     */
    const addComment = () => {
      console.log("RecipeDetails: addComment =", newComment.value);
      const newCommentObj = {
        id: Date.now(),
        text: newComment.value.trim(),
        username: "Anonymous",
      };
      recipe.value.comments.push(newCommentObj);
      store.updateRecipe(recipe.value);
      newComment.value = "";
    };

    /**
     * A method that copies the ingredients to the clipboard
     */
    const copyIngredientsToClipboard = () => {
      console.log("RecipeDetails: copyIngredientsToClipboard");
      // const ingredientsText = recipe.value.ingredients.join(", ");
      const ingredientsText = Array.isArray(recipe.value.ingredients) ? recipe.value.ingredients.join(", ") : recipe.value.ingredients;
      navigator.clipboard.writeText(ingredientsText);
      alert("Ingredients copied to clipboard!");
    };

    /**
     * A method that prints the instructions
     */
    const printInstructions = () => {
      console.log("RecipeDetails: printInstructions");
      const printWindow = window.open("", "_blank");
      printWindow.document.write(
        `<h1>Instructions</h1><p>${recipe.value.instructions}</p>`
      );
      printWindow.document.close();
      printWindow.print();
    };

    /**
     * A method that navigates to a related recipe
     * @param {Number} id - The id of the related recipe
     */
    const viewRelatedRecipe = (id) => {
      console.log("RecipeDetails: viewRelatedRecipe =", id);
      router.push({ name: "RecipeDetails", params: { id } });
    };

    return {
      recipe,
      newComment,
      userRating,
      averageRating,
      relatedRecipes,
      editRecipe,
      deleteRecipe,
      goBack,
      addComment,
      rateRecipe,
      copyIngredientsToClipboard,
      printInstructions,
      viewRelatedRecipe,
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

img {
  display: block;
  margin: 0 auto 20px;
  max-height: 300px;
}

textarea {
  resize: none;
}

.text-warning {
  color: gold;
}

.text-muted {
  color: gray;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
}

.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
