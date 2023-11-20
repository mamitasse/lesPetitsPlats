class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.filteredBySearch = []; // Ajoutez cette ligne
  }

  initRecipePage() {
    // Chargez les recettes depuis le modèle
    const recipes = this.model.getRecipes();

    // Obtenez la liste unique d'ingrédients, appareils et ustensiles
    const uniqueItems = this.model.getUniqueItems();

    // Mettez à jour la vue avec les informations nécessaires
    this.view.displayRecipesInfos({ recipes, uniqueItems });
  }

  // Nouvelle méthode pour filtrer les recettes
// Nouvelle méthode pour filtrer les recettes en fonction des sélections
filterRecipes(selectedIngredients, selectedAppareils, selectedUstensiles) {
  // Obtenez toutes les recettes du modèle
  const allRecipes = this.model.getRecipes();

  // Filtrez les recettes en fonction des sélections
  const filteredRecipes = allRecipes.filter((recipe) => {
    // Vérifiez les ingrédients
    const hasSelectedIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.some((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );

    // Vérifiez les appareils
    const hasSelectedAppareils =
      selectedAppareils.length === 0 ||
      selectedAppareils.some((appareil) =>
        recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
      );

    // Vérifiez les ustensiles
    const hasSelectedUstensiles =
      selectedUstensiles.length === 0 ||
      selectedUstensiles.some((ustensile) =>
        recipe.ustensils.some((recipeUstensile) =>
          recipeUstensile.toLowerCase().includes(ustensile.toLowerCase())
        )
      );

    // Retournez true si la recette correspond à toutes les sélections
    return hasSelectedIngredients && hasSelectedAppareils && hasSelectedUstensiles;
  });

  // Retournez le tableau de recettes filtrées
  return filteredRecipes;
}


  // Nouvelle méthode pour mettre à jour l'affichage des recettes
  updateRecipesDisplay(data) {
    this.view.updateRecipesDisplay(data);
  }

 // Nouvelle méthode pour gérer la recherche
// Méthode pour gérer la recherche principale
handleSearch(query) {
  // Récupérez les éléments sélectionnés depuis la vue
  const selectedIngredients = this.view.getSelectedItems("ingredients");
  const selectedAppareils = this.view.getSelectedItems("appareils");
  const selectedUstensiles = this.view.getSelectedItems("ustensiles");

  // Obtenez toutes les recettes du modèle
  const allRecipes = this.model.getRecipes();

  // Filtrez les recettes en fonction de la recherche
  this.filteredBySearch = allRecipes.filter((recipe) => {
    // Vérifiez si la recette correspond à la recherche et aux sélections
    const isInNameOrDescription =
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase());

    const hasSelectedIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((item) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(item.toLowerCase())
        )
      );

    const hasSelectedAppareils =
      selectedAppareils.length === 0 ||
      selectedAppareils.every((item) =>
        recipe.appliance.toLowerCase().includes(item.toLowerCase())
      );

    const hasSelectedUstensiles =
      selectedUstensiles.length === 0 ||
      selectedUstensiles.every((item) =>
        recipe.ustensils.some((ustensile) =>
          ustensile.toLowerCase().includes(item.toLowerCase())
        )
      );

    return (
      isInNameOrDescription &&
      hasSelectedIngredients &&
      hasSelectedAppareils &&
      hasSelectedUstensiles
    );
  });

  // Mettez à jour l'affichage des recettes avec le résultat filtré
  this.view.updateRecipesDisplay({ recipes: this.filteredBySearch });
}


 // Ajoutez cette nouvelle méthode pour gérer le filtrage supplémentaire
 handleAdditionalFiltering() {
  // Utilisez les éléments sélectionnés pour filtrer les recettes
  const selectedIngredients = this.view.getSelectedItems("ingredients");
  const selectedAppareils = this.view.getSelectedItems("appareils");
  const selectedUstensiles = this.view.getSelectedItems("ustensiles");

  // Filtrer les recettes en fonction des éléments sélectionnés
  const filteredRecipes = this.filterRecipes(
    selectedIngredients,
    selectedAppareils,
    selectedUstensiles
  );

  // Mise à jour de l'affichage des recettes avec le résultat filtré
  this.view.updateRecipesDisplay(filteredRecipes);
}


}

// Instanciation de la vue, du modèle et du contrôleur
const view = new ListRecipesView();
const model = new Model(recipes);
const controller = new Controller(view, model);

controller.initRecipePage(); // Lancez l'initialisation depuis le contrôleur et mon fichier view
// Appelez la nouvelle méthode pour mettre à jour les listes déroulantes
const uniqueItems = model.getUniqueItems();
view.updateDropdowns(uniqueItems);
view.updateDropdowns(uniqueItems, "ingredients");
view.updateDropdowns(uniqueItems, "appareils");
view.updateDropdowns(uniqueItems, "ustensiles");