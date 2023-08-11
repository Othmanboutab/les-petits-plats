import { recipes } from '../data/recipes.js'
import { buildFilter, addButton, filterAndDisplayRecipes, recipeIngredientsInclude, utensilsIngredientsInclude } from './utils/filter.js'
import { createCards } from './utils/cards.js'
import { getAllIngredients, getAllUtensils, getAllAppliances } from './utils/data.js';


// build filters
buildFilter('filterIngredient', "Ingredients", getAllIngredients(), document.querySelector('.filter-ingredient'));
buildFilter('filterAppliance', "Appareils", getAllAppliances(), document.querySelector('.filter-appliance'));
buildFilter('filterUtensils', "Ustensils", getAllUtensils(), document.querySelector('.filter-utensils'));


const displayCards = () => {
    // Récupération des éléments HTML nécessaires
    const searchInput = document.getElementById("search-bar");
    const filterIngredientSelect = document.querySelector("#filterIngredient");
    const filterApplianceSelect = document.querySelector("#filterAppliance");
    const filterUtensilsSelect = document.querySelector("#filterUtensils");

    // Initialisation de l'affichage des cartes
    createCards(recipes);

    // Fonction pour appliquer les filtres
    function applyFilters() {
        // Récupération des valeurs des filtres
        const searchedValue = searchInput.value.toLowerCase();
        const ingredientValue = filterIngredientSelect.value.toLowerCase();
        const applianceValue = filterApplianceSelect.value.toLowerCase();
        const utensilsValue = filterUtensilsSelect.value.toLowerCase();

        // Récupération de l'élément HTML pour afficher les filtres choisis
        const selectedFiltersDiv = document.getElementById("selectedFilters");
        selectedFiltersDiv.innerHTML = ""; // Efface les boutons précédents

        // Ajout de boutons pour chaque filtre choisi
        if (ingredientValue !== "") {
            addButton(selectedFiltersDiv, ingredientValue, '#3282F7', () => {
                filterIngredientSelect.value = "";
                applyFilters();
            });
        }
        if (applianceValue !== "") {
            addButton(selectedFiltersDiv, applianceValue, '#68D9A4', () => {
                filterApplianceSelect.value = "";
                applyFilters();
            });
        }
        if (utensilsValue !== "") {
            addButton(selectedFiltersDiv, utensilsValue, '#ED6454', () => {
                filterUtensilsSelect.value = "";
                applyFilters();
            });
        }

        // Filtrage des recettes en fonction des critères sélectionnés
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            let matchSearch = false;
            let matchIngredient = false;
            let matchAppliance = false;
            let matchUtensils = false;

            // Vérification des conditions de filtre pour chaque recette
            if (searchedValue.length > 3) {
                matchSearch =
                    recipe.name.toLowerCase().includes(searchedValue) ||
                    recipe.description.toLowerCase().includes(searchedValue) ||
                    recipeIngredientsInclude(recipe, searchedValue);
            } else {
                matchSearch = true;
            }

            if (ingredientValue !== "") {
                // Vérification si l'ingrédient est présent dans la recette
                let j = 0;
                while (j < recipe.ingredients.length) {
                    if (recipe.ingredients[j].ingredient.toLowerCase().includes(ingredientValue)) {
                        matchIngredient = true;
                        break;
                    }
                    j++;
                }
            } else {
                matchIngredient = true;
            }

            // Vérification si l'appareil est présent dans la recette
            if (applianceValue !== "") {
                matchAppliance =
                    recipe.appliance.toLowerCase().includes(applianceValue)
            } else {
                matchAppliance = true;
            }

            // Vérification si les ustensiles sont présents dans la recette
            if (utensilsValue !== "") {
                matchUtensils =
                    utensilsIngredientsInclude(recipe, utensilsValue);
            } else {
                matchUtensils = true;
            }

            // Si toutes les conditions de filtre sont satisfaites, ajouter la recette aux recettes filtrées
            if (matchSearch && matchIngredient && matchAppliance && matchUtensils) {
                filteredRecipes.push(recipe);
            }
        }

        // Affichage des recettes filtrées
        filterAndDisplayRecipes(filteredRecipes);
    }

    // Ajout des événements "input" aux éléments de filtre pour appliquer les filtres
    searchInput.addEventListener("input", applyFilters);
    filterIngredientSelect.addEventListener("input", applyFilters);
    filterApplianceSelect.addEventListener("input", applyFilters);
    filterUtensilsSelect.addEventListener("input", applyFilters);
}


displayCards()
