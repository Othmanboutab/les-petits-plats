import { createCards } from '../utils/cards.js'


export function buildFilter(name, placeholder, values, parent) {
    let select = document.createElement('select')

    select.name = name;
    select.id = name

    let placeHolderOption = document.createElement("option");
    placeHolderOption.value = "";
    placeHolderOption.text = placeholder;
    placeHolderOption.disabled = true;
    placeHolderOption.selected = true;
    placeHolderOption.hidden = true;

    select.appendChild(placeHolderOption)

    for (const val of values) {
        let option = document.createElement("option");
        option.value = val;
        option.text = val;
        option.classList.add('option')
        select.appendChild(option);
    }

    parent.append(select)
}


export function filterAndDisplayRecipes(filteredRecipes) {
    const cardsContainer = document.querySelector(".cards-container");
    cardsContainer.innerHTML = "";
    createCards(filteredRecipes);
}

export function recipeIngredientsInclude(recipe, searchTerm) {
    let j = 0;
    while (j < recipe.ingredients.length) {
        if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchTerm)) {
            return true;
        }
        j++;
    }
    return false;
}


export function utensilsIngredientsInclude(recipe, searchTerm) {
    let j = 0;
    while (j < recipe.ustensils.length) {
        if (recipe.ustensils[j].toLowerCase().includes(searchTerm)) {
            return true;
        }
        j++;
    }
    return false;
}

export function addButton(container, text, color, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.backgroundColor = color;
    button.addEventListener("click", onClick);
    const deleteIcon = document.createElement('span')
    deleteIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>'
    button.appendChild(deleteIcon)
    container.appendChild(button);
}