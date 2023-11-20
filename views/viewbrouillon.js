class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
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
            recipeIngredient.ingredient
              .toLowerCase()
              .includes(ingredient.toLowerCase())
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

    console.log("Filtered Recipes:", filteredRecipes);

    // Retournez le tableau de recettes filtrées
    return { recipes: filteredRecipes };
  }

  // Nouvelle méthode pour mettre à jour l'affichage des recettes
  updateRecipesDisplay(data) {
    this.view.updateRecipesDisplay(data);
  }

 // Nouvelle méthode pour gérer la recherche
// Nouvelle méthode pour gérer la recherche
handleSearch(query) {
  // Récupérez les éléments sélectionnés
  const selectedIngredients = this.view.getSelectedItems("ingredients");
  const selectedAppareils = this.view.getSelectedItems("appareils");
  const selectedUstensiles = this.view.getSelectedItems("ustensiles");

  console.log("Selected Ingredients:", selectedIngredients);
  console.log("Selected Appareils:", selectedAppareils);
  console.log("Selected Ustensiles:", selectedUstensiles);

  // Obtenez toutes les recettes en utilisant la référence du contrôleur (this)
  const allRecipes = this.model.getRecipes();

  console.log("All Recipes:", allRecipes);

  // Filtrez les recettes en fonction de la recherche
  let filteredBySearch = allRecipes.filter((recipe) => {
    const isInNameOrDescription =
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase());

    // Vérifiez si la recette contient au moins un ingrédient, un appareil ou un ustensile sélectionné
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

    // Retournez true si la recette correspond à la recherche et aux sélections
    return isInNameOrDescription && hasSelectedIngredients && hasSelectedAppareils && hasSelectedUstensiles;
  });

  // Filtrer les recettes en fonction des sélections
  const filteredRecipes = this.filterRecipes(
    selectedIngredients,
    selectedAppareils,
    selectedUstensiles
  );

  // Combiner les résultats des deux filtres
  const finalFilteredRecipes = filteredBySearch.filter((recipeBySearch) =>
    filteredRecipes.recipes.some((recipe) => recipe.id === recipeBySearch.id)
  );

  console.log("Filtered by Search:", filteredBySearch);
  console.log("Filtered Recipes:", filteredRecipes);

  // Mettez à jour l'affichage des recettes avec le résultat filtré
  this.view.updateRecipesDisplay({ recipes: finalFilteredRecipes });
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