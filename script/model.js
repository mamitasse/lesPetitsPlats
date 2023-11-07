class Model {
    constructor(recipes) {
      this.recipes = recipes;
    }
  
    // Méthode pour obtenir les recettes
    getRecipes() {
      return this.recipes;
    }

    // Méthode pour récupérer la liste des ingrédients
    getIngredientsList() {
        // Créez un tableau vide pour stocker la liste des ingrédients
        const ingredientsList = [];

        // Parcourez toutes les recettes
        this.recipes.forEach((recipe) => {
            // Parcourez les ingrédients de chaque recette
            recipe.ingredients.forEach((ingredient) => {

                // Vérifiez si l'ingrédient existe déjà dans la liste
                const existingIngredient = ingredientsList.find((item) => item.ingredient === ingredient.ingredient);
 console.log(ingredientsList)
                if (existingIngredient) {
                    // Si l'ingrédient existe déjà, mettez à jour la quantité si nécessaire
                    existingIngredient.quantity += ingredient.quantity;
                } else {
                    // Sinon, ajoutez l'ingrédient à la liste
                    ingredientsList.push({
                        ingredient: ingredient.ingredient,
                        quantity: ingredient.quantity,
                    });
                }
            });
        });

        return ingredientsList;
       
    }
}

 


