class Model {
  constructor(recipes) {
      this.recipes = recipes;
  }

  // Méthode pour obtenir les recettes
  getRecipes() {
      return this.recipes;
  }
 // Nouvelle méthode pour obtenir toutes les recettes
 getAllRecipes() {
  return this.recipes;
}

getUniqueItems() {
  const ingredients = [];
  const appareils = [];
  const ustensiles = [];

  this.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });

    if (!appareils.includes(recipe.appliance)) {
      appareils.push(recipe.appliance);
    }

    recipe.ustensils.forEach((ustensil) => {
      if (!ustensiles.includes(ustensil)) {
        ustensiles.push(ustensil);
      }
    });
  });

  // Tri par ordre alphabétique et ignore la casse
  ingredients.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  appareils.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  ustensiles.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  return {
    ingredients,
    appareils,
    ustensiles,
  };
}




}                                                                       