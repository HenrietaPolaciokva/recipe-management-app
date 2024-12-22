<template>
  <!--
    This component displays a pagination control.
    It allows the user to navigate between pages of a list of items.
    The component uses the v-pagination component from the Vuetify library.
  -->
  <div class="text-center">
    <!--
      The v-pagination component displays the pagination control.
      It takes the total number of items and the number of items to display per page as props.
      It also takes a v-model to keep track of the current page.
      When the user selects a different page, the onPageChange method is called.
    -->
    <v-pagination
      v-model="localcurrentPage"
      :length="totalPages"
      @input="onPageChange"
      class="my-4"
      rounded
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    // Total number of items to display
    totalItems: {
      type: Number,
      required: true,
    },
    // Number of items to display per page
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    // Current page number to display
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    // Calculate the total number of pages based on the total number of items and the items per page
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    // Called when the user selects a different page
    onPageChange(newPage) {
      // Emit an event to the parent component to let it know the page has changed
      this.$emit("page-change", newPage);
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
