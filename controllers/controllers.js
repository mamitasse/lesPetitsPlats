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
    this.view.updateRecipesDisplay({ recipes, uniqueItems });
  }

  filterRecipes(selectedIngredients, selectedAppareils, selectedUstensiles) {
    // Obtenez toutes les recettes du modèle
    const allRecipes = this.model.getRecipes();

    // Filtrez les recettes en fonction des sélections
    const filteredRecipes = allRecipes.filter((recipe) => {
      // Vérifiez les ingrédients
      const hasSelectedIngredients =
        selectedIngredients.length === 0 ||
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.some((recipeIngredient) =>
            recipeIngredient.ingredient
              .toLowerCase()
              .includes(ingredient.toLowerCase())
          )
        );

      // Vérifiez les appareils
      const hasSelectedAppareils =
        selectedAppareils.length === 0 ||
        selectedAppareils.every((appareil) =>
          recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
        );

      // Vérifiez les ustensiles
      const hasSelectedUstensiles =
        selectedUstensiles.length === 0 ||
        selectedUstensiles.every((ustensile) =>
          recipe.ustensils.some((recipeUstensile) =>
            recipeUstensile.toLowerCase().includes(ustensile.toLowerCase())
          )
        );

      // Retournez true si la recette correspond à toutes les sélections
      return (
        hasSelectedIngredients && hasSelectedAppareils && hasSelectedUstensiles
      );
    });

    // Mettre à jour l'affichage des recettes avec le résultat filtré
    this.view.updateRecipesDisplay({ recipes: filteredRecipes });
    console.log(filteredRecipes);

    this.updateDropdownsBasedOnFilteredRecipes(filteredRecipes);

    // Retournez le tableau de recettes filtrées
    return filteredRecipes;
  }

  // Nouvelle méthode pour mettre à jour l'affichage des recettes
  updateRecipesDisplay(data) {
    this.view.updateRecipesDisplay(data);
  }

  // Méthode pour gérer la recherche principale
// Méthode pour gérer la recherche principale
handleSearch(query) {
  console.log("Query:", query);

  const normalizedQuery = this.normalizeString(query);
  console.log("Normalized Query:", normalizedQuery);

  // Filtrer les recettes en fonction de la requête
  let filteredRecipes = this.filterRecipes(
      this.view.getSelectedItems("ingredients"),
      this.view.getSelectedItems("appareils"),
      this.view.getSelectedItems("ustensiles")
  );
  
  filteredRecipes = this.filterByText(filteredRecipes, normalizedQuery);
  
  // Mettre à jour la liste des recettes filtrées par la recherche principale
  controller.filteredBySearch = filteredRecipes;

  // Mettre à jour l'affichage des recettes avec le résultat filtré
  this.view.updateRecipesDisplay({ recipes: filteredRecipes });
  console.log(filteredRecipes);

  this.updateDropdownsBasedOnFilteredRecipes(filteredRecipes);
}

filterByText(filteredRecipes, query) {
  return filteredRecipes.filter((recipe) => {
      const normalizedRecipeData = this.normalizeRecipeData(recipe);

      // Recherche dans le nom, la description et les ingrédients
      const nameMatches = normalizedRecipeData.name.includes(query);
      const descriptionMatches = normalizedRecipeData.description.includes(query);
      const ingredientsMatch = normalizedRecipeData.ingredients.some((ingredient) =>
          ingredient.includes(query)
      );

      // Retourne true si la requête correspond à une partie du nom, de la description ou des ingrédients
      return nameMatches || descriptionMatches || ingredientsMatch;
  });
}

  // Méthode pour normaliser une chaîne de caractères en minuscules sans accents
  normalizeString(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // Méthode pour normaliser les données de recette pour la recherche
  normalizeRecipeData(recipe) {
    const normalizedRecipe = {};

    normalizedRecipe.name = this.normalizeString(recipe.name);
    normalizedRecipe.description = this.normalizeString(recipe.description);
    normalizedRecipe.ingredients = recipe.ingredients.map((ingredient) =>
      this.normalizeString(ingredient.ingredient)
    );
    normalizedRecipe.appliance = this.normalizeString(recipe.appliance);
    normalizedRecipe.ustensils = recipe.ustensils.map((ustensil) =>
      this.normalizeString(ustensil)
    );

    return normalizedRecipe;
  }

  // Nouvelle méthode pour gérer le filtrage supplémentaire
  handleAdditionalFiltering() {
    // Utilisez les éléments sélectionnés pour filtrer les recettes
    const selectedIngredients = this.view.getSelectedItems("ingredients");
    const selectedAppareils = this.view.getSelectedItems("appareils");
    const selectedUstensiles = this.view.getSelectedItems("ustensiles");

    // Si des filtres de recherche sont appliqués, utilisez les recettes filtrées par la recherche principale
    const filteredRecipes =
      controller.filteredBySearch.length > 0
        ? controller.filteredBySearch
        : this.filterRecipes(
            selectedIngredients,
            selectedAppareils,
            selectedUstensiles
          );

    // Mise à jour de l'affichage des recettes avec le résultat filtré
    this.view.updateRecipesDisplay({ recipes: filteredRecipes });

    // Mettez à jour les listes déroulantes basées sur les recettes filtrées
    this.updateDropdownsBasedOnFilteredRecipes(filteredRecipes);
  }

  updateDropdownsBasedOnFilteredRecipes(allRecipes) {
    console.log("updateDropdownsBasedOnFilteredRecipes() ");
    // Utiliser les recettes filtrées au lieu de toutes les recettes
    // const allRecipes = this.filteredBySearch || [];
    console.log(allRecipes);
    let uniqueItems = {};
    // Extraire les ingrédients, appareils et ustensiles des recettes filtrées
    uniqueItems["ingredients"] = Array.from(
      new Set(
        allRecipes.flatMap((recipe) =>
          recipe.ingredients.map((ingredient) =>
            ingredient.ingredient.toLowerCase()
          )
        )
      )
    );

    uniqueItems["appareils"] = Array.from(
      new Set(allRecipes.map((recipe) => recipe.appliance.toLowerCase()))
    );

    uniqueItems["ustensiles"] = Array.from(
      new Set(
        allRecipes.flatMap((recipe) =>
          recipe.ustensils.map((ustensil) => ustensil.toLowerCase())
        )
      )
    );
    console.log(uniqueItems);
    this.view.updateDropdowns(uniqueItems, "ingredients");
    this.view.updateDropdowns(uniqueItems, "appareils");
    this.view.updateDropdowns(uniqueItems, "ustensiles");
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
