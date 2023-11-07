class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  initRecipePage() {
    // Chargez les recettes depuis le modèle
    const recipes = this.model.getRecipes();
    this.view.displayRecipesInfos({ recipes });
  }

  // Fonction pour filtrer les recettes
  filterRecipes(recipes, query) {
    query = query.toLowerCase();
    return recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      );
      const ustensils = recipe.ustensils.map((ustensil) =>
        ustensil.toLowerCase()
      );
      const appliance = recipe.appliance.toLowerCase();

      return (
        recipe.name.toLowerCase().includes(query) ||
        ingredients.some((ingredient) => ingredient.includes(query)) ||
        ustensils.some((ustensil) => ustensil.includes(query)) ||
        appliance.includes(query)
      );
    });
  }
  // Fonction pour gérer la recherche
  handleSearch(query) {
    const recipes = this.model.getRecipes();
    const filteredRecipes = this.filterRecipes(recipes, query);
    this.view.updateRecipesDisplay({ recipes: filteredRecipes });
  }
}

// Instanciation de la vue, du modèle et du contrôleur
const view = new ListRecipesView();
const model = new Model(recipes);
const controller = new Controller(view, model);

controller.initRecipePage(); // Lancez l'initialisation depuis le contrôleur
