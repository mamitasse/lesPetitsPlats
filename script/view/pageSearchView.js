class ListRecipesView {
  constructor() {
    this.inputHeader = document.querySelector(".inputHeader");
    this.searchButton = document.querySelector(".searchButton");
    const searchForm = document.querySelector(".formHeader");
    const hour = document.querySelector(".temps");

    //ecouteur d'evenement submit
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      const query = this.inputHeader.value;
    });

    // Écoute de l'événement de recherche
    const searchButton = document.querySelector(".searchButton");
    const inputHeader = document.querySelector(".inputHeader");

    searchButton.addEventListener("click", () => {
      const query = inputHeader.value;
      controller.handleSearch(query);
    });
  }

  // Je crée une fonction pour afficher les recettes
  displayRecipesInfos(data) {
    // Je récupère la référence de l'élément HTML où vous souhaitez afficher la liste des recettes
    const recipeSection = document.querySelector(".recipes-cards");

    if (data && data.recipes) {
      data.recipes.forEach((recipe) => {
        const recipeElement = document.createElement("article");
        recipeElement.classList.add("recipe");

        recipeElement.innerHTML = `
        <div class="time">${recipe.time}min</div>
         <img src="assets/photos_les_petits_plats/${
           recipe.image
         }" alt="recette ${recipe.id}" />
            
            <h2>${recipe.name}</h2>
            <h3>RECETTE</h3>
            <p class="recettes">${recipe.description}</p>
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

  // Mettez à jour l'affichage des recettes
  updateRecipesDisplay(data) {
    const recipeSection = document.querySelector(".recipes-cards");
    recipeSection.innerHTML = ""; // Efface le contenu précédent

    if (data && data.recipes) {
      data.recipes.forEach((recipe) => {
        const recipeElement = document.createElement("article");
        recipeElement.classList.add("recipe");

        recipeElement.innerHTML = `
        <div class="time">${recipe.time}min</div>
        <img src="assets/photos_les_petits_plats/${
          recipe.image
        }" alt="recette ${recipe.id}" />
            <h2>${recipe.name}</h2>
            <h3>RECETTE</h3>
            <p class="recettes">${recipe.description}</p>
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
    const dropdownContent = document.querySelector(
      `[data-dropdown-content='${button.getAttribute("data-dropdown-target")}']`
    );
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
