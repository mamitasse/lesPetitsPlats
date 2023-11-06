//fonction pour filtrer la recherche des recettes
function filterRecipes(recipes, query) {
    // Convertir en minuscules pour traiter les majuscules et minuscules de la même manière
    query = query.toLowerCase();
    return recipes.filter((recipe) => {
        const ingredients = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
        const ustensils = recipe.ustensils.map((ustensil) => ustensil.toLowerCase());
        const appliance = recipe.appliance.toLowerCase();

        return (
            recipe.name.toLowerCase().startsWith(query) ||
            ingredients.some((ingredient) => ingredient.startsWith(query)) ||
            ustensils.some((ustensil) => ustensil.startsWith(query)) ||
            appliance.startsWith(query)
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