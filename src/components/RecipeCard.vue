<template>
  <!-- This is the main template for the Recipe Card component. It displays
       a recipe in a card format. The card contains the recipe image, title,
       description, category, prep time, and actions. The actions include view,
       edit, and delete. -->
  <v-card class="mx-auto my-4" max-width="400">
    <!-- Recipe Image -->
    <v-img
      src="https://cdn.vuetifyjs.com/docs/images/cards/salad.jpg"
      alt="Recipe Image"
      height="200"
      cover
    >
      <!-- Title Toolbar -->
      <v-toolbar color="rgba(0, 0, 0, 0.6)" dense>
        <template v-slot:prepend>
          <v-btn icon="mdi-heart-outline" color="white"></v-btn>
        </template>
        <v-spacer></v-spacer>
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical" color="white"></v-btn>
        </template>
      </v-toolbar>
    </v-img>

    <!-- Recipe Details -->
    <v-card-text>
      <h3 class="text-h6 font-weight-bold mb-2">{{ recipe.name }}</h3>
      <div class="text-caption text-grey-darken-1 mb-2">
        {{ recipe.description }}
      </div>
      <div class="d-flex justify-space-between align-center">
        <v-chip color="primary" label>{{ recipe.category }}</v-chip>
        <span class="text-body-2 font-weight-medium"
          >Prep: {{ recipe.prepTime }}</span
        >
      </div>
    </v-card-text>

    <!-- Actions -->
    <v-card-actions>
      <!-- The view button takes the user to the recipe details page when clicked -->
      <v-btn color="primary" text @click="viewRecipe(recipe.id)"
        >View Recipe</v-btn
      >
      <v-spacer></v-spacer>
      <!-- The edit button takes the user to the recipe edit page when clicked -->
      <v-btn icon="mdi-pencil" @click="editRecipe(recipe.id)"></v-btn>
      <!-- The delete button deletes the recipe when clicked -->
      <v-btn icon="mdi-delete" @click="deleteRecipe(recipe.id)"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    // The recipe object is passed as a prop to this component
    recipe: {
      type: Object,
      required: true,
      // The default recipe object is used if no recipe is passed
      default: () => ({
        id: 1,
        name: "Caesar Salad",
        description: "A classic Caesar salad with a rich, creamy dressing.",
        category: "Salad",
        prepTime: "15 min",
      }),
    },
  },
  methods: {
    // The viewRecipe method navigates to the recipe details page with the id as a parameter
    viewRecipe(id) {
      this.$router.push(`/recipes/${id}`);
    },
    // The editRecipe method navigates to the recipe edit page with the id as a parameter
    editRecipe(id) {
      this.$router.push(`/recipes/edit/${id}`);
    },
    // The deleteRecipe method deletes the recipe with the id as a parameter
    deleteRecipe(id) {
      if (confirm("Are you sure you want to delete this recipe?")) {
        // Handle recipe deletion logic here
        console.log(`Deleted recipe with ID: ${id}`);
      }
    },
  },
};
</script>

<style scoped>
/* The font size of the caption is set to 0.9rem and the line height is set to 1.4 */
.text-caption {
  font-size: 0.9rem;
  line-height: 1.4;
}

/* The card is given a border radius of 12px and overflow is set to hidden */
.v-card {
  border-radius: 12px;
  overflow: hidden;
}

/* The padding of the card text is set to 16px */
.v-card-text {
  padding: 16px;
}

/* The actions are justified to the end of the card */
.v-card-actions {
  justify-content: flex-end;
}
</style>
