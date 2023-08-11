import { createCards } from '../utils/cards.js'


export function buildFilter(name, placeholder, values, parent) {
    // Créer un élément de sélection (liste déroulante)
    let select = document.createElement('select')

    // Définir le nom et l'ID de l'élément de sélection
    select.name = name;
    select.id = name

    // Créer une option de placeholder désactivée et sélectionnée par défaut
    let placeHolderOption = document.createElement("option");
    placeHolderOption.value = "";
    placeHolderOption.text = placeholder;
    placeHolderOption.disabled = true;
    placeHolderOption.selected = true;
    placeHolderOption.hidden = true;

    // Ajouter l'option de placeholder à l'élément de sélection
    select.appendChild(placeHolderOption)

    // Parcourir les valeurs et créer une option pour chaque valeur
    for (const val of values) {
        let option = document.createElement("option");
        option.value = val;
        option.text = val;
        option.classList.add('option')
        select.appendChild(option);
    }

    // Ajouter l'élément de sélection au parent spécifié
    parent.append(select)
}

export function filterAndDisplayRecipes(filteredRecipes) {
    const cardsContainer = document.querySelector(".cards-container");

    // Effacer le contenu actuel du conteneur de cartes
    cardsContainer.innerHTML = "";

    // Appeler la fonction createCards pour afficher les recettes filtrées dans le conteneur
    createCards(filteredRecipes);
}

export function recipeIngredientsInclude(recipe, searchTerm) {
    let j = 0;
    while (j < recipe.ingredients.length) {
        // Vérifie si le terme de recherche est inclus dans l'ingrédient actuel (en minuscules)
        if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchTerm)) {
            return true; // Si trouvé, renvoie true
        }
        j++;
    }
    return false; // Si le terme n'a pas été trouvé dans tous les ingrédients, renvoie false
}


export function utensilsIngredientsInclude(recipe, searchTerm) {
    let j = 0;
    while (j < recipe.ustensils.length) {
        // Vérifie si le terme de recherche est inclus dans l'ustensile actuel (en minuscules)
        if (recipe.ustensils[j].toLowerCase().includes(searchTerm)) {
            return true; // Si trouvé, renvoie true
        }
        j++;
    }
    return false; // Si le terme n'a pas été trouvé dans tous les ustensiles, renvoie false
}

export function addButton(container, text, color, onClick) {
    // Crée un élément bouton
    const button = document.createElement("button");
    button.textContent = text; // Définit le texte du bouton
    button.style.backgroundColor = color; // Définit la couleur d'arrière-plan du bouton
    button.addEventListener("click", onClick); // Ajoute l'événement clic au bouton

    // Crée un élément icône de suppression
    const deleteIcon = document.createElement('span')
    deleteIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'

    // Ajoute l'icône de suppression au bouton
    button.appendChild(deleteIcon);

    // Ajoute le bouton au conteneur spécifié
    container.appendChild(button);
}