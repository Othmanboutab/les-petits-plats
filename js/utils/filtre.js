import { recipeUstensilsInclude } from './recipeUtils.js';
import {
  getAllIngredients,
  getAllUstensils,
  getAllAppliances,
} from './data.js';
import recipes from '../../data/recipes.js';
import { updateCustomFiltre, updateOptionsList } from './update.js';
import { createCards } from './cards.js';

const selectedFiltresDiv = document.getElementById('selected-filtres-list');

let appliedFiltres = [];

export function createCustomFiltre(defaultValue, placeholder, data, bgColor) {
  const filtreContainer = document.getElementById('filtres');
  const customSelect = document.createElement('div');
  customSelect.classList.add('custom-select');
  customSelect.id = defaultValue;
  customSelect.style.backgroundColor = bgColor;

  const container = document.createElement('div');
  container.classList.add('container');
  customSelect.appendChild(container);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.value = defaultValue;
  container.appendChild(input);

  const arrow = document.createElement('span');
  arrow.classList.add('arrow');
  container.appendChild(arrow);

  const optionsList = document.createElement('ul');
  optionsList.style.backgroundColor = bgColor;
  customSelect.appendChild(optionsList);

  filtreContainer.appendChild(customSelect);

  updateOptionsList(optionsList, data, 30, input); // Affichez initialement seulement 10 options

  // Ajoutez un gestionnaire d'événements pour ouvrir/fermer la liste d'options
  input.addEventListener('click', () => {
    customSelect.classList.toggle('open');
  });

  // Ajoutez un gestionnaire d'événements pour la recherche
  input.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();

    const filteredData = data.filter((item) => item.toLowerCase().includes(searchValue));

    // Mettez à jour la liste des options en fonction des résultats filtrés
    updateOptionsList(optionsList, filteredData, 30, input);
  });

  document.addEventListener('click', (event) => {
    if (!customSelect.contains(event.target)) {
      customSelect.classList.remove('open');
    }
  });
}
export function applyFiltres() {
  const ingredientsFiltre = getFiltreValue('#Ingredients input');
  const applianceFiltre = getFiltreValue('#Appliance input');
  const ustensilsFiltre = getFiltreValue('#Ustensils input');

  addFiltre(ingredientsFiltre, 'Ingredients');
  addFiltre(applianceFiltre, 'Appliance');
  addFiltre(ustensilsFiltre, 'Ustensils');

  showSelectedFiltres();
  updateFilteredRecipes();
}
export function setupFiltres() {
  createCustomFiltre(
    'Ingredients',
    'Rechercher un ingrédient',
    getAllIngredients(),
    '#3282F7',
  );
  createCustomFiltre(
    'Appliance',
    'Rechercher un appareil',
    getAllAppliances(),
    '#68D9A4',
  );
  createCustomFiltre(
    'Ustensils',
    'Rechercher un ustensil',
    getAllUstensils(),
    '#ED6454',
  );
}
export function getFiltreValue(selector) {
  const element = document.querySelector(selector);
  return element ? element.value.toLowerCase() : null;
}
export function addFiltre(filtre, label) {
  const filtresToExclude = ['', 'ingredients', 'appliance', 'ustensils'];
  const indexToRemove = appliedFiltres.findIndex(
    (applied) => applied.label === label,
  );

  if (indexToRemove !== -1) {
    appliedFiltres = appliedFiltres.filter((_, i) => i !== indexToRemove);
  }

  if (filtre && !filtresToExclude.includes(filtre)) {
    appliedFiltres.push({ filtreValue: filtre, label });
  }
}
export function resetFiltres(filtre) {
  const { label, filtreValue } = filtre;
  const labelToSelector = {
    Ingredients: '#Ingredients input',
    Appliance: '#Appliance input',
    Ustensils: '#Ustensils input',
  };

  const selector = labelToSelector[label];
  if (selector) {
    document.querySelector(selector).value = '';
  }

  appliedFiltres = appliedFiltres.filter((f) => f?.filtreValue !== filtreValue);
}
export function updateFilteredRecipes(searchValue) {
  const ingredientsFiltre = getFiltreValue('#Ingredients input');
  const applianceFiltre = getFiltreValue('#Appliance input');
  const ustensilsFiltre = getFiltreValue('#Ustensils input');

  const normalizedSearchValue = searchValue || '';

  const filteredRecipes = recipes.filter((recipe) => {
    const matchIngredient = ingredientsFiltre === 'ingredients'
      || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(ingredientsFiltre));

    const matchAppliance = applianceFiltre === 'appliance'
      || recipe.appliance.toLowerCase().includes(applianceFiltre);

    const matchUstensils = ustensilsFiltre === 'ustensils'
      || recipeUstensilsInclude(recipe, ustensilsFiltre);

    const matchSearch = normalizedSearchValue.length > 3
      ? normalizedSearchValue === ''
      || recipe.name.toLowerCase().includes(normalizedSearchValue)
      : true;

    return matchIngredient && matchAppliance && matchUstensils && matchSearch;
  });

  updateFiltres(filteredRecipes);

  const notFoundContainer = document.querySelector('.not-found-container');
  notFoundContainer.style.display = filteredRecipes.length ? 'none' : 'flex';

  createCards(filteredRecipes);
}
export function updateFiltres(filteredRecipes) {
  const uniqueIngredients = [];
  const uniqueAppliance = [];
  const uniqueUstensils = [];

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const lowerCasedIngredient = ingredient.ingredient.toLowerCase();
      if (!uniqueIngredients.includes(lowerCasedIngredient)) {
        uniqueIngredients.push(lowerCasedIngredient);
      }
    });

    const lowerCasedAppliance = recipe.appliance.toLowerCase();
    if (!uniqueAppliance.includes(lowerCasedAppliance)) {
      uniqueAppliance.push(lowerCasedAppliance);
    }

    recipe.ustensils.forEach((ustensil) => {
      if (!uniqueUstensils.includes(ustensil)) {
        uniqueUstensils.push(ustensil);
      }
    });
  });

  updateCustomFiltre('#Ingredients', 'Ingredients', uniqueIngredients);
  updateCustomFiltre('#Appliance', 'Appliance', uniqueAppliance);
  updateCustomFiltre('#Ustensils', 'Ustensils', uniqueUstensils);
}
export function addButton(container, filtre) {
  const { filtreValue, label } = filtre;

  const colors = {
    Ingredients: '#3282F7',
    Appliance: '#68D9A4',
    Ustensils: '#ED6454',
  };

  const currentBgColor = colors[label] || '#000000'; // Couleur par défaut si le label n'est pas reconnu

  const button = document.createElement('button');
  button.textContent = filtreValue;
  button.classList.add('tag');
  button.style.backgroundColor = currentBgColor;

  const deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
  deleteIcon.addEventListener('click', () => {
    resetFiltres(filtre);
    container.removeChild(button);
    updateFilteredRecipes();
  });

  button.appendChild(deleteIcon);
  container.appendChild(button);
}
export function showSelectedFiltres() {
  selectedFiltresDiv.innerHTML = '';

  appliedFiltres.forEach((appliedFiltre) => {
    addButton(selectedFiltresDiv, appliedFiltre);
  });
}
