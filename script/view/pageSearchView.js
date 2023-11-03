class ListRecipesView {
// Je crée une fonction pour afficher les recettes
  displayRecipesInfos(data) {
    // Je récupère la référence de l'élément HTML où vous souhaitez afficher la liste des recettes
    const recipeSection = document.querySelector(".recipes-cards");

    if (data && data.recipes) {
      data.recipes.forEach((recipe) => {
        const recipeElement = document.createElement("article");
        recipeElement.classList.add("recipe");

        recipeElement.innerHTML = `
        
          
          <img src="assets/photos_les_petits_plats/${
            recipe.image
          }" alt="recette ${recipe.id}" />
            <h2>${recipe.name}</h2>
            <h3>RECETTE</h3>
            <p class="recettes">${recipe.description}
           
            <h3>INGREDIENTS</h3>
            <div class="ingredients">
            ${recipe.ingredients
              .map(
                (ingredient) => `
              <p>${ingredient.ingredient}<br>
              ${ingredient.quantity}${
                  ingredient.unit ? ` ${formatUnit(ingredient.unit)}` : ""
                }</p>`
              )
              .join("")}
          </div>
           
          `;
        recipeSection.appendChild(recipeElement);
      });
    }
  }
  displayIngredientsList(recipes) {
    // Récupérer tous les ingrédients de toutes les recettes
    const allIngredients = recipes.flatMap((recipe) => recipe.ingredients);
    // Extraire uniquement les noms des ingrédients sans doublons
    const uniqueIngredients = [...new Set(allIngredients.map((ingredient) => ingredient.ingredient))];

    // Afficher la liste d'ingrédients dans un élément HTML, par exemple une liste non ordonnée
    const ingredientsList = document.querySelector(".ingredients-list");
    if (ingredientsList) {
        uniqueIngredients.forEach((ingredient) => {
            const listItem = document.createElement("li");
            listItem.textContent = ingredient;
            ingredientsList.appendChild(listItem);
        });
    }
}
}
// Methode pour formater l'unité
function formatUnit(unit) {
    if (unit === "grammes") {
        return "gr";
    } else if (unit === "cuillères à soupe") {
        return "cs";
    } else {
        return unit;
    }
    
}
function manageDropdowns() {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    dropdownButtons.forEach((button) => {
        const dropdownContent = document.querySelector(`[data-dropdown-content='${button.getAttribute("data-dropdown-target")}']`);
        const chevron = button.querySelector(".chevron");

        button.addEventListener("click", () => {
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
                chevron.classList.remove("rotate");
            } else {
                dropdownContent.style.display = "block";
                chevron.classList.add("rotate");
            }
        });
    });
}

manageDropdowns();
