<template>
  <div>
    <!--
      This is the template for the Recipe List Display component.

      It contains a search bar, a button to add a new recipe, and a list of recipes.
      The list of recipes is paginated, and the user can navigate between pages
      using the pagination component at the bottom of the page.
    -->
    <h1>Recipe List</h1>
    <v-text-field
      v-model="searchQuery"
      label="Search recipes..."
      outlined
      class="mb-4"
    ></v-text-field>
    <v-btn color="primary" class="mb-4" @click="addRecipe">Add Recipe</v-btn>
    <v-list>
      <v-list-item
        v-for="recipe in paginatedRecipes"
        :key="recipe.id"
        class="recipe-item"
      >
        <v-list-item-content>
          <!--
            When the user clicks on a recipe, take them to the recipe details page
            with the id of the recipe as a parameter.
          -->
          <v-list-item-title @click="viewRecipe(recipe.id)">
            {{ recipe.name }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <!--
            When the user clicks on the edit button, take them to the edit recipe page
            with the id of the recipe as a parameter.
          -->
          <v-btn icon color="blue" @click="editRecipe(recipe.id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!--
            When the user clicks on the delete button, prompt them to confirm that
            they want to delete the recipe. If they confirm, send a delete request
            to the server, and then update the recipe list by removing the deleted
            recipe.
          -->
          <v-btn icon color="red" @click="deleteRecipe(recipe.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <!--
      This is the pagination component, which displays the number of pages
      and allows the user to navigate between them.
    -->
    <PaginationComponent
      :total-items="filteredRecipes.length"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script>
import PaginationComponent from "@/components/reusables/PaginationComponent.vue";

export default {
  name: "RecipeListDisplay",
  components: {
    PaginationComponent,
  },
  data() {
    return {
      recipes: [],
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    filteredRecipes() {
      // Filter the recipes based on the search query
      return this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedRecipes() {
      // Calculate the start and end indices for the current page
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredRecipes.slice(start, end);
    },
  },
  methods: {
    fetchRecipes() {
      // Fetch the recipes from the server
      // For now, just return a dummy list of recipes
      return [
        { id: 1, name: "Recipe 1" },
        { id: 2, name: "Recipe 2" },
        { id: 3, name: "Recipe 3" },
        { id: 4, name: "Recipe 4" },
        { id: 5, name: "Recipe 5" },
      ];
    },
    viewRecipe(id) {
      // Navigate to the recipe details page with the id as a parameter
      this.$router.push(`/recipes/${id}`);
    },
    addRecipe() {
      // Navigate to the add recipe page
      this.$router.push("/recipes/add");
    },
    editRecipe(id) {
      // Navigate to the edit recipe page with the id as a parameter
      this.$router.push(`/recipes/edit/${id}`);
    },
    deleteRecipe(id) {
      // Prompt the user to confirm that they want to delete the recipe
      if (confirm("Are you sure you want to delete this recipe?")) {
        // Delete the recipe from the server
        // For now, just update the local recipe list
        const index = this.recipes.findIndex((recipe) => recipe.id === id);
        if (index !== -1) {
          this.recipes.splice(index, 1);
        }
        // Fetch the recipes from the server again
        this.fetchRecipes();
      }
    },
    handlePageChange(newPage) {
      // Update the current page number
      this.currentPage = newPage;
    },
  },
  created() {
    // Fetch the recipes from the server when the component is created
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.recipe-item {
  margin-bottom: 10px;
}
</style>
