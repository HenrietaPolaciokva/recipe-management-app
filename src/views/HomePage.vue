<template>
  <div class="homepage">
    <!-- Hero Section -->
    <div class="hero-section">
      <!-- Title and Tagline -->
      <h1>Welcome to Recipe Management</h1>
      <p>
        Discover, create, and organize your favorite recipes. Manage your
        recipes effortlessly with our intuitive platform.
      </p>
      <!-- Call-to-Action Button -->
      <router-link to="/recipes" class="cta-button">Browse Recipes</router-link>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <!-- Title -->
      <h2>How It Works</h2>
      <!-- Features List -->
      <div class="features-list">
        <!-- Feature 1 -->
        <div class="feature">
          <h3>Browse Recipes</h3>
          <p>
            Explore a wide collection of recipes and view detailed instructions.
          </p>
        </div>
        <!-- Feature 2 -->
        <div class="feature">
          <h3>Add & Edit Recipes</h3>
          <p>Add new recipes or make updates to existing ones with ease.</p>
        </div>
        <!-- Feature 3 -->
        <div class="feature">
          <h3>Manage Your Collection</h3>
          <p>Organize and manage your recipe library seamlessly.</p>
        </div>
      </div>
    </div>

    <!-- Call-to-Action Section -->
    <div class="cta-section">
      <!-- Title -->
      <h2>Get Started</h2>
      <!-- Description -->
      <p>
        Click below to add your first recipe or browse our curated collection.
      </p>
      <!-- Call-to-Action Buttons -->
      <div class="cta-buttons">
        <!-- Add Recipe Button -->
        <router-link to="/recipes/form" class="cta-button"
          >Add Recipe</router-link
        >
        <!-- View Recipes Button -->
        <router-link to="/recipes" class="cta-button secondary"
          >View Recipes</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
/* Style the Hero Section */
.hero-section {
  background-color: #f9f9f9;
  padding: 50px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
}

/* Style the Hero Section Title */
.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
}

/* Style the Hero Section Description */
.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #666;
}

/* Style the Call-to-Action Button */
.cta-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #4caf50;
  text-decoration: none;
  border-radius: 5px;
  margin: 5px;
}

/* Style the Secondary Call-to-Action Button */
.cta-button.secondary {
  background-color: #2196f3;
}

/* Style the Features Section */
.features-section {
  margin: 40px 0;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

/* Style the Features Title */
.features-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Style the Features List */
.features-list {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

/* Style the Feature */
.feature {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  text-align: left;
}

/* Style the Feature Title */
.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

/* Style the Feature Description */
.feature p {
  font-size: 1rem;
  color: #555;
}

/* Style the Call-to-Action Section */
.cta-section {
  background-color: #e8f5e9;
  padding: 40px;
  border-radius: 10px;
  margin-top: 30px;
}

/* Style the Call-to-Action Title */
.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

/* Style the Call-to-Action Description */
.cta-section p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

/* Style the Call-to-Action Buttons */
.cta-buttons .cta-button {
  margin: 10px;
}
</style>
