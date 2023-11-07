removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  
  // Fonction pour filtrer les recettes
filterRecipes(recipes, query) {
    query = removeAccents(query).toLowerCase();
    return recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ingredient) => removeAccents(ingredient.ingredient).toLowerCase());
      const ustensils = recipe.ustensils.map((ustensil) => removeAccents(ustensil).toLowerCase());
      const appliance = removeAccents(recipe.appliance).toLowerCase();
  
      return (
        removeAccents(recipe.name).toLowerCase().includes(query) ||
        ingredients.some((ingredient) => ingredient.includes(query)) ||
        ustensils.some((ustensil) => ustensil.includes(query)) ||
        appliance.includes(query)
      );
    });
  }
// Gestionnaire d'événements pour le formulaire de recherche
const searchForm = document.querySelector(".formHeader");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut
    const searchInput = document.querySelector(".inputHeader");
    const query = searchInput.value;
    controller.handleSearch(query);
});
// Gestionnaire d'événements pour la recherche en temps réel
const searchInput = document.querySelector(".inputHeader");
searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    controller.handleSearch(query);
});
//a mettre dans controllers
handleSearch(query) {
    const recipes = this.model.getRecipes();
    const filteredRecipes = this.filterRecipes(recipes, query);
    this.view.updateRecipesDisplay({ recipes: filteredRecipes });
}