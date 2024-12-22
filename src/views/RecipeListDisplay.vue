<template>
  <div class="container mt-5">
    <h1 class="mb-4">Recipe List</h1>
    <div class="d-flex mb-4 gap-3">
      <!-- Search input to filter recipes by name -->
      <input
        type="text"
        v-model="searchQuery"
        class="form-control"
        placeholder="Search recipes..."
        aria-label="Search recipes"
      />

      <!-- Select to filter recipes by category -->
      <select
        v-model="selectedCategory"
        class="form-select"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <!-- Select to sort recipes by name, rating, or category -->
      <select
        v-model="sortOption"
        class="form-select"
        aria-label="Sort recipes"
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="category">Category</option>
      </select>
    </div>
    <button class="btn btn-primary mb-4" @click="addRecipe">Add Recipe</button>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- No Recipes Found -->
    <div
      v-if="!loading && paginatedRecipes.length === 0"
      class="alert alert-info"
    >
      No recipes found. Try adjusting your search or filter criteria.
    </div>

    <!-- Recipe Table -->
    <table
      v-if="!loading && paginatedRecipes.length > 0"
      class="table table-hover"
    >
      <thead>
        <tr>
          <th @click="setSortOption('name')" style="cursor: pointer">Name</th>
          <th>Description</th>
          <th @click="setSortOption('category')" style="cursor: pointer">
            Category
          </th>
          <th>Prep Time</th>
          <th>Cook Time</th>
          <th @click="setSortOption('rating')" style="cursor: pointer">
            Rating
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in paginatedRecipes" :key="recipe.id">
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.description }}</td>
          <td>{{ recipe.category }}</td>
          <td>{{ recipe.prepTime }}</td>
          <td>{{ recipe.cookTime }}</td>
          <td>
            <span v-for="n in recipe.rating" :key="n" class="text-warning"
              >&#x2605;</span
            >
          </td>
          <td>
            <button class="btn btn-primary me-2" @click="viewRecipe(recipe.id)">
              View
            </button>
            <button class="btn btn-warning me-2" @click="editRecipe(recipe.id)">
              Edit
            </button>
            <button
              class="btn btn-danger"
              @click="handleDeleteConfirmation(recipe.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Component -->
    <PaginationComponent
      v-if="!loading"
      :total-items="filteredRecipes.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import PaginationComponent from "@/components/reusables/PaginationComponent.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

/**
 * This component displays a list of recipes, along with a search bar and a
 * category filter. It also handles pagination and sorting.
 */
export default {
  name: "RecipeListDisplay",
  components: {
    PaginationComponent,
  },
  setup() {
    /**
     * The list of recipes, fetched from the API.
     * @type {Ref<Recipe[]>}
     */
    const recipes = ref([]);

    /**
     * The list of categories, fetched from the API.
     * @type {Ref<string[]>}
     */
    const categories = ref([]);

    /**
     * The search query entered by the user.
     * @type {Ref<string>}
     */
    const searchQuery = ref("");
    /**
     * The selected category, or an empty string if the user hasn't selected a
     * category.
     * @type {Ref<string>}
     */
    const selectedCategory = ref("");
    /**
     * The sort option selected by the user, or an empty string if the user
     * hasn't selected a sort option.
     * @type {Ref<string>}
     */
    const sortOption = ref("");
    /**
     * The current page number.
     * @type {Ref<number>}
     */
    const currentPage = ref(1);
    /**
     * The number of items to display per page.
     * @type {Ref<number>}
     */
    const itemsPerPage = ref(5);
    /**
     * Whether the component is currently loading data from the API.
     * @type {Ref<boolean>}
     */
    const loading = ref(false);
    /**
     * Any error message that occurred while loading data from the API.
     * @type {Ref<string>}
     */
    const error = ref("");
    /**
     * The router instance, used to navigate to different routes.
     * @type {Router}
     */
    const router = useRouter();

    /**
     * Fetches the list of recipes from the API.
     * @returns {Promise<void>}
     */
    const fetchRecipes = async () => {
      loading.value = true;
      try {
        const response = await axios.get("http://127.0.0.1:3000/recipes");
        recipes.value = response.data;
        categories.value = [...new Set(response.data.map((r) => r.category))];
      } catch (error) {
        error.value = "Error fetching recipes:" + error.message;
      } finally {
        loading.value = false;
      }
    };

    /**
     * Returns the filtered list of recipes, based on the current search query
     * and selected category.
     * @type {ComputedRef<Recipe[]>}
     */
    const filteredRecipes = computed(() => {
      let results = recipes.value;
      if (searchQuery.value) {
        results = results.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      if (selectedCategory.value) {
        results = results.filter(
          (recipe) => recipe.category === selectedCategory.value
        );
      }
      return results;
    });

    /**
     * Returns the sorted list of recipes, based on the current sort option.
     * @type {ComputedRef<Recipe[]>}
     */
    const sortedRecipes = computed(() => {
      const results = [...filteredRecipes.value];
      if (sortOption.value === "name") {
        results.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption.value === "rating") {
        results.sort((a, b) => b.rating - a.rating);
      } else if (sortOption.value === "category") {
        results.sort((a, b) => a.category.localeCompare(b.category));
      }
      return results;
    });

    /**
     * Returns the paginated list of recipes, based on the current page number
     * and the number of items per page.
     * @type {ComputedRef<Recipe[]>}
     */
    const paginatedRecipes = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return sortedRecipes.value.slice(start, start + itemsPerPage.value);
    });

    /**
     * Handles the event of the user changing the page number.
     * @param {number} newPage
     */
    const handlePageChange = (newPage) => {
      currentPage.value = newPage;
    };

    /**
     * Sets the current sort option to the given value.
     * @param {string} option
     */
    const setSortOption = (option) => {
      sortOption.value = option;
    };

    /**
     * Navigates to the "Add Recipe" page.
     */
    const addRecipe = () => {
      router.push({ name: "RecipeForm" });
    };

    /**
     * Navigates to the "Recipe Details" page, with the given recipe ID as a
     * parameter.
     * @param {number} id
     */
    const viewRecipe = (id) => {
      router.push({ name: "RecipeDetails", params: { id } });
    };

    /**
     * Navigates to the "Edit Recipe" page, with the given recipe ID as a
     * parameter.
     * @param {number} id
     */
    const editRecipe = (id) => {
      router.push({ name: "RecipeEditForm", params: { id } });
    };

    /**
     * Confirms with the user before deleting the recipe with the given ID.
     * @param {number} id
     */
    const confirmDelete = (id) => {
      if (confirm("Are you sure you want to delete this recipe?")) {
        deleteRecipe(id);
      }
    };

    /**
     * Deletes the recipe with the given ID from the API.
     * @param {number} id
     * @returns {Promise<void>}
     */
    const deleteRecipe = async (id) => {
      try {
        await axios.delete(`http://127.0.0.1:3000/recipes/${id}`);
        recipes.value = recipes.value.filter((recipe) => recipe.id !== id);
      } catch (error) {
        error.value = "Error deleting recipe:" + error.message;
      }
    };

    /**
     * Confirms with the user before deleting the recipe with the given ID, and
     * then calls `deleteRecipe` if the user confirms.
     * @param {number} id
     */
    const handleDeleteConfirmation = (id) => {
      confirmDelete(id);
    };

    // Fetch the recipes when the component is mounted.
    onMounted(fetchRecipes);

    return {
      recipes,
      categories,
      searchQuery,
      selectedCategory,
      sortOption,
      currentPage,
      itemsPerPage,
      filteredRecipes,
      paginatedRecipes,
      loading,
      error,
      handlePageChange,
      setSortOption,
      addRecipe,
      viewRecipe,
      editRecipe,
      handleDeleteConfirmation,
    };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
