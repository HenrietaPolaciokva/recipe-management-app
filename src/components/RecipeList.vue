<template>
  <div class="recipe-list">
    <h2>recipes</h2>
    <!-- Filtering -->
    <div class="filters">
      <!-- Input that updates the filterText data property -->
      <input
        type="text"
        v-model="filterText"
        placeholder="Search recipes..."
        @input="applyFilters"
      />
      <!-- Select that updates the sortOrder data property -->
      <select v-model="sortOrder" @change="applySorting">
        <!-- Options have values of "asc" (ascending) and "desc" (descending) -->
        <option value="asc">Title (A-Z)</option>
        <option value="desc">Title (Z-A)</option>
      </select>
    </div>

    <!-- Paginated List -->
    <ul>
      <!-- Loop through the paginatedrecipes computed property -->
      <li v-for="recipe in paginatedrecipes" :key="recipe.id">
        <h3>{{ recipe.title }}</h3>
        <p>{{ recipe.description }}</p>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div class="pagination">
      <!-- Button to go to the previous page, if there is one -->
      <v-btn
        variant="outlined"
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        Previous
      </v-btn>
      <!-- Span showing the current page number -->
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <!-- Button to go to the next page, if there is one -->
      <v-btn
        variant="outlined"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Next
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Array of recipes to list
    recipes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // Text to filter recipes by title
      filterText: "",
      // Sort order to apply to recipes
      sortOrder: "asc",
      // Current page number
      currentPage: 1,
      // Number of items to display per page
      itemsPerPage: 5,
      // Array of recipes that have been filtered and sorted
      filteredrecipes: [],
    };
  },
  computed: {
    // Calculate the total number of pages based on the filteredrecipes array
    totalPages() {
      return Math.ceil(this.filteredrecipes.length / this.itemsPerPage);
    },
    // Get the recipes for the current page based on the currentPage and itemsPerPage
    paginatedrecipes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredrecipes.slice(start, end);
    },
  },
  methods: {
    // Apply filtering to the recipes array based on the filterText
    applyFilters() {
      const filterTextLower = this.filterText.toLowerCase();
      this.filteredrecipes = this.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(filterTextLower)
      );
      // Ensure filtered recipes are sorted
      this.applySorting();
      // Reset to the first page
      this.currentPage = 1;
    },
    // Sort the filteredrecipes array based on the sortOrder
    applySorting() {
      this.filteredrecipes.sort((a, b) => {
        const comparison =
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },
    // Go to a specific page number
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    // Initialize the filteredrecipes array with the recipes prop
    this.filteredrecipes = [...this.recipes];
    // Apply sorting to the filteredrecipes array
    this.applySorting();
  },
};
</script>

<style scoped>
.recipe-list {
  margin: 20px auto;
  max-width: 600px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters input {
  flex: 1;
  margin-right: 10px;
  padding: 5px;
}

.filters select {
  padding: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  background-color: #e9e9e9;
}
</style>
