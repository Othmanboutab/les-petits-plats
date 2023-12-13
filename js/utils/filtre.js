import recipes from '../../data/recipes.js';
import { createCards } from './cards.js';
import { colors } from '../config/color.js';
import { customFilters } from '../config/filtresList.js';

const selectedFiltresDiv = document.getElementById('selected-filtres-list');

let appliedFiltres = [];
let selectedValues = [];

export function setupFiltres() {
  customFilters.forEach(createCustomFiltre);
}
export function updateFilteredRecipes(searchValue) {
  const filters = {
    ingredients: selectedValues?.filter(
      (value) => value?.selectedId === 'ingredients',
    ),
    appliance: selectedValues?.filter(
      (value) => value?.selectedId === 'appliance',
    ),
    ustensils: selectedValues?.filter(
      (value) => value?.selectedId === 'ustensils',
    ),
  };

  const normalizedSearchValue = (searchValue || '').toLowerCase();

  const filteredRecipes = recipes?.filter((recipe) => {
    const matchIngredient = !filters.ingredients.length
      || filters.ingredients.every((filter) => (
        filter.selectedValue === 'ingredients'
        || recipe.ingredients.some(
          (recipeIngredient) => recipeIngredient.ingredient.toLowerCase()
            === filter.selectedValue.toLowerCase(),
        )
      ));

    const matchAppliance = !filters.appliance.length
      || filters.appliance.every((filter) => (
        filter.selectedValue === 'appliance'
        || filter.selectedValue.toLowerCase() === recipe.appliance.toLowerCase()
      ));

    const matchUstensils = !filters.ustensils.length
      || filters.ustensils.every((filterUstensil) => (
        filterUstensil.selectedValue === 'ustensils'
        || recipe.ustensils.some(
          (recipeUstensil) => recipeUstensil.toLowerCase()
            === filterUstensil.selectedValue.toLowerCase(),
        )
      ));
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
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function getFiltreValue(selector) {
  const element = document.querySelector(selector);
  return element ? element.value.toLowerCase() : null;
}
function createCustomFiltre(props) {
  const {
    defaultValue, placeholder, data, color,
  } = props;

  const filtreContainer = document.getElementById('filtres');
  const customSelect = document.createElement('div');
  customSelect.classList.add('custom-select');
  customSelect.id = defaultValue;
  customSelect.style.backgroundColor = color;
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

  const optionsListSelector = document.createElement('ul');
  optionsListSelector.style.backgroundColor = color;
  customSelect.appendChild(optionsListSelector);

  filtreContainer.appendChild(customSelect);

  const options = {
    id: defaultValue,
    optionsList: data,
  };
  updateOptionsList(optionsListSelector, options, 30, input); // Affichez initialement seulement 30 options

  // Ajoutez un gestionnaire d'événements pour ouvrir/fermer la liste d'options
  input.addEventListener('click', () => {
    customSelect.classList.toggle('open');
  });

  // Ajoutez un gestionnaire d'événements pour la recherche
  input.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = data.filter((item) => item.toLowerCase().includes(searchValue));
    const options = {
      id: defaultValue,
      optionsList: filteredData,
    };
    updateOptionsList(optionsListSelector, options, 30, input);
  });

  document.addEventListener('click', (event) => {
    if (!customSelect.contains(event.target)) {
      customSelect.classList.remove('open');
    }
  });
}
function createDeleteIcon(value) {
  const deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
  deleteIcon.setAttribute('data-value', value.toLowerCase());
  return deleteIcon;
}
function createButton(buttonsContainer, value, bgColor, label) {
  const button = document.createElement('button');
  button.textContent = capitalize(value);
  button.classList.add('tag');
  button.style.backgroundColor = bgColor;

  const deleteIcon = createDeleteIcon(value);
  deleteIcon.addEventListener('click', () => {
    resetFiltres(value, label);
    button.remove();
    buttonsContainer.remove();
    updateFilteredRecipes();
  });

  button.appendChild(deleteIcon);
  return button;
}
function addButton(container, filtre) {
  const { filtreValue, label } = filtre;
  const currentBgColor = colors[label] || '#000000';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttonsContainer');

  filtreValue.forEach((value) => {
    const button = createButton(buttonsContainer, value, currentBgColor, label);
    buttonsContainer.appendChild(button);
  });

  container.appendChild(buttonsContainer);
}
function resetFiltres(filtreValue, label) {
  const labelToSelector = {
    ingredients: '#Ingredients input',
    appliance: '#Appliance input',
    ustensils: '#Ustensils input',
  };
  const inputElement = document.querySelector(labelToSelector[label]);
  selectedValues = selectedValues.filter(
    (s) => s.selectedValue !== filtreValue,
  );

  if (inputElement) {
    inputElement.value = selectedValues.length
      ? selectedValues
        ?.filter((item) => item?.selectedId === label)
        .map((s) => s?.selectedValue)
      : capitalize(label);
  }
  appliedFiltres = appliedFiltres.filter(
    (f) => JSON.stringify(f?.filtreValue) !== JSON.stringify(filtreValue),
  );
}
function showSelectedFiltres() {
  selectedFiltresDiv.innerHTML = '';
  selectedValues.forEach((value) => {
    addButton(selectedFiltresDiv, {
      filtreValue: [value.selectedValue],
      label: value.selectedId,
    });
  });
}
function addFiltre(filtre, label) {
  const filtresToExclude = ['', 'ingredients', 'appliance', 'ustensils'];

  // Utiliser une approche plus fonctionnelle pour éviter la mutation directe
  appliedFiltres = appliedFiltres.filter((applied) => applied.label !== label);

  // Vérifier si filtre est défini et n'est pas dans la liste des filtres à exclure
  if (filtre && !filtresToExclude.includes(filtre)) {
    appliedFiltres.push({ filtreValue: filtre.split(';'), label });
  }
}
function applyFiltres() {
  customFilters.forEach((filter) => {
    const filterValue = getFiltreValue(`#${filter.defaultValue} input`);
    addFiltre(filterValue, filter.defaultValue);
  });

  showSelectedFiltres();
  updateFilteredRecipes();
}
function updateOptionsList(listElement, optionsData, limit, input) {
  listElement.innerHTML = '';
  const customSelect = document.querySelector('.custom-select');

  const { optionsList, id } = optionsData;

  const notItemsFound = document.createElement('span');
  notItemsFound.classList.add('not-found');

  notItemsFound.textContent = !optionsList.length || optionsList.every((element) => element === '')
    ? 'Aucun filtre trouvé'
    : '';
  notItemsFound.style.display = notItemsFound.textContent ? 'flex' : 'none';

  listElement.appendChild(notItemsFound);
  optionsList?.slice(0, limit).forEach((item) => {
    const checkIfItemSelected = item === ''
      || selectedValues.some(
        (s) => s.selectedValue.toLowerCase() === item.toLowerCase(),
      );
    if (!checkIfItemSelected) {
      const option = document.createElement('li');
      option.textContent = item;
      option.setAttribute('data-value', item.toLowerCase());
      option.setAttribute('data-id', id.toLowerCase());
      listElement.appendChild(option);

      option.addEventListener('click', function () {
        const selectedValue = this.getAttribute('data-value');
        const selectedId = this.getAttribute('data-id');

        selectedValues.push({ selectedValue, selectedId });

        const filteredData = selectedValues.filter(
          (s) => s.selectedId.toLowerCase() === id.toLowerCase(),
        );

        input.value = filteredData.map((item) => item.selectedValue).join(', ');
        customSelect.classList.remove('open');
        applyFiltres();
      });
    }
  });
}
function updateCustomFiltre(selector, placeholder, data) {
  const customFilter = document.querySelector(selector);
  const input = customFilter.querySelector('input');
  input.placeholder = placeholder;
  const options = {
    id: placeholder,
    optionsList: data,
  };
  const optionsList = customFilter.querySelector('ul');
  updateOptionsList(optionsList, options, 30, input);
}
function updateFiltres(filteredRecipes) {
  const uniqueFilters = {
    Ingredients: new Set(),
    Appliance: new Set(),
    Ustensils: new Set(),
  };

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      uniqueFilters.Ingredients.add(ingredient.ingredient.toLowerCase());
    });

    uniqueFilters.Appliance.add(recipe.appliance.toLowerCase());

    recipe.ustensils.forEach((ustensil) => {
      uniqueFilters.Ustensils.add(ustensil.toLowerCase());
    });
  });

  customFilters.forEach((filter) => {
    const uniqueValues = Array.from(uniqueFilters[filter.defaultValue]);
    updateCustomFiltre(
      `#${filter.defaultValue}`,
      filter.defaultValue,
      uniqueValues,
    );
  });
}
