import recipes from "../../data/recipes.js";
import { createCards } from "./cards.js";
import { colors } from "../config/color.js";
import { customFilters } from "../config/filtresList.js";

const selectedFiltresDiv = document.getElementById("selected-filtres-list");

let appliedFiltres = [];
let selectedValues = [];

export function setupFiltres() {
  for (let i = 0; i < customFilters.length; i++) {
    createCustomFiltre(customFilters[i]);
  }
}
export function updateFilteredRecipes(searchValue) {
  const filters = {
    ingredients: [],
    appliance: [],
    ustensils: [],
  };

  // Fill the filters array with selected values
  if (selectedValues) {
    for (let i = 0; i < selectedValues.length; i++) {
      const value = selectedValues[i];
      if (value.selectedId === "ingredients") {
        filters.ingredients.push(value);
      } else if (value.selectedId === "appliance") {
        filters.appliance.push(value);
      } else if (value.selectedId === "ustensils") {
        filters.ustensils.push(value);
      }
    }
  }

  const normalizedSearchValue = (searchValue || "").toLowerCase();

  const filteredRecipes = [];
  if (recipes) {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];

      const matchIngredient =
        !filters.ingredients.length ||
        (() => {
          for (let j = 0; j < filters.ingredients.length; j++) {
            const filter = filters.ingredients[j];
            if (
              filter.selectedValue === "ingredients" ||
              recipe.ingredients.some(
                (recipeIngredient) =>
                  recipeIngredient.ingredient.toLowerCase() ===
                  filter.selectedValue.toLowerCase()
              )
            ) {
              continue;
            } else {
              return false;
            }
          }
          return true;
        })();

      const matchAppliance =
        !filters.appliance.length ||
        (() => {
          for (let j = 0; j < filters.appliance.length; j++) {
            const filter = filters.appliance[j];
            if (
              filter.selectedValue === "appliance" ||
              filter.selectedValue.toLowerCase() ===
                recipe.appliance.toLowerCase()
            ) {
              continue;
            } else {
              return false;
            }
          }
          return true;
        })();

      const matchUstensils =
        !filters.ustensils.length ||
        (() => {
          for (let j = 0; j < filters.ustensils.length; j++) {
            const filterUstensil = filters.ustensils[j];
            if (
              filterUstensil.selectedValue === "ustensils" ||
              recipe.ustensils.some(
                (recipeUstensil) =>
                  recipeUstensil.toLowerCase() ===
                  filterUstensil.selectedValue.toLowerCase()
              )
            ) {
              continue;
            } else {
              return false;
            }
          }
          return true;
        })();

      const matchSearch =
        normalizedSearchValue.length > 3
          ? normalizedSearchValue === "" ||
            recipe.name.toLowerCase().includes(normalizedSearchValue)
          : true;

      if (matchIngredient && matchAppliance && matchUstensils && matchSearch) {
        filteredRecipes.push(recipe);
      }
    }
  }

  updateFiltres(filteredRecipes);

  const notFoundContainer = document.querySelector(".not-found-container");
  notFoundContainer.style.display = filteredRecipes.length ? "none" : "flex";

  createCards(filteredRecipes);
}
function capitalize(str) {
  let capitalizedStr = "";

  for (let i = 0; i < str.length; i++) {
    if (i === 0) {
      capitalizedStr += str[i].toUpperCase();
    } else {
      capitalizedStr += str[i].toLowerCase();
    }
  }

  return capitalizedStr;
}
function getFiltreValue(selector) {
  const element = document.querySelector(selector);
  return element ? element.value.toLowerCase() : null;
}
function createCustomFiltre(props) {
  const { defaultValue, placeholder, data, color } = props;

  const filtreContainer = document.getElementById("filtres");
  const customSelect = document.createElement("div");
  customSelect.classList.add("custom-select");
  customSelect.id = defaultValue;
  customSelect.style.backgroundColor = color;
  const container = document.createElement("div");
  container.classList.add("container");
  customSelect.appendChild(container);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.value = defaultValue;
  container.appendChild(input);

  const arrow = document.createElement("span");
  arrow.classList.add("arrow");
  container.appendChild(arrow);

  const optionsListSelector = document.createElement("ul");
  optionsListSelector.style.backgroundColor = color;
  customSelect.appendChild(optionsListSelector);

  filtreContainer.appendChild(customSelect);

  const options = {
    id: defaultValue,
    optionsList: data,
  };
  updateOptionsList(optionsListSelector, options, 30, input); // Affichez initialement seulement 30 options

  // Ajoutez un gestionnaire d'événements pour ouvrir/fermer la liste d'options
  input.addEventListener("click", () => {
    customSelect.classList.toggle("open");
  });

  // Ajoutez un gestionnaire d'événements pour la recherche
  input.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.toLowerCase().includes(searchValue)) {
        filteredData.push(item);
      }
    }

    const options = {
      id: defaultValue,
      optionsList: filteredData,
    };
    updateOptionsList(optionsListSelector, options, 30, input);
  });

  document.addEventListener("click", (event) => {
    let { target } = event;
    while (target !== null && target !== customSelect) {
      target = target.parentNode;
    }
    if (target === null) {
      customSelect.classList.remove("open");
    }
  });
}
function createDeleteIcon(value) {
  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
  deleteIcon.dataset.value = value.toLowerCase();
  return deleteIcon;
}
function resetFiltres(filtreValue, label) {
  const labelToSelector = {
    ingredients: "#Ingredients input",
    appliance: "#Appliance input",
    ustensils: "#Ustensils input",
  };
  const inputElement = document.querySelector(labelToSelector[label]);

  // Utiliser une boucle for pour filtrer les éléments sélectionnés
  const updatedSelectedValues = [];
  for (let i = 0; i < selectedValues.length; i++) {
    const s = selectedValues[i];
    if (!(s.selectedValue === filtreValue && s.selectedId === label)) {
      updatedSelectedValues.push(s);
    }
  }
  selectedValues = updatedSelectedValues;

  if (inputElement) {
    inputElement.value = selectedValues.length
      ? selectedValues
          .filter((item) => item?.selectedId === label)
          .map((s) => s?.selectedValue)
      : capitalize(label);
  }

  // Utiliser une boucle for pour filtrer les filtres appliqués
  const updatedAppliedFiltres = [];
  for (let i = 0; i < appliedFiltres.length; i++) {
    const f = appliedFiltres[i];
    if (JSON.stringify(f?.filtreValue) !== JSON.stringify(filtreValue)) {
      updatedAppliedFiltres.push(f);
    }
  }
  appliedFiltres = updatedAppliedFiltres;
}
function createButton(value, bgColor, label) {
  const button = document.createElement("button");
  button.textContent = capitalize(value);
  button.classList.add("tag");
  button.style.backgroundColor = bgColor;

  const deleteIcon = createDeleteIcon(value);

  // Ajouter un gestionnaire d'événements sans utiliser la flèche
  deleteIcon.addEventListener("click", () => {
    resetFiltres(value, label);
    button.remove();
    updateFilteredRecipes();
  });

  button.appendChild(deleteIcon);
  return button;
}
function addButton(container, filtre) {
  const { filtreValue, label } = filtre;
  const currentBgColor = colors[label] || "#000000";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttonsContainer");

  for (let i = 0; i < filtreValue.length; i++) {
    const value = filtreValue[i];
    const button = createButton(value, currentBgColor, label);
    buttonsContainer.appendChild(button);
  }

  container.appendChild(buttonsContainer);
}
function showSelectedFiltres() {
  selectedFiltresDiv.innerHTML = "";

  for (let i = 0; i < selectedValues.length; i++) {
    const value = selectedValues[i];
    addButton(selectedFiltresDiv, {
      filtreValue: [value.selectedValue],
      label: value.selectedId,
    });
  }
}
function addFiltre(filtre, label) {
  const filtresToExclude = ["", "ingredients", "appliance", "ustensils"];
  const updatedAppliedFiltres = [];

  // Utiliser une boucle for pour parcourir les filtres existants
  for (let i = 0; i < appliedFiltres.length; i++) {
    const applied = appliedFiltres[i];
    if (applied.label !== label) {
      updatedAppliedFiltres.push(applied);
    }
  }

  // Vérifier si filtre est défini et n'est pas dans la liste des filtres à exclure
  if (filtre && !filtresToExclude.includes(filtre)) {
    updatedAppliedFiltres.push({ filtreValue: filtre.split(";"), label });
  }

  // Remplacer appliedFiltres par la nouvelle version
  appliedFiltres = updatedAppliedFiltres;
}
function applyFiltres() {
  for (let i = 0; i < customFilters.length; i++) {
    const filter = customFilters[i];
    const filterValue = getFiltreValue(`#${filter.defaultValue} input`);
    addFiltre(filterValue, filter.defaultValue);
  }

  showSelectedFiltres();
  updateFilteredRecipes();
}
function updateOptionsList(listElement, optionsData, limit, input) {
  listElement.innerHTML = "";
  const customSelect = document.querySelector(".custom-select");

  const { optionsList, id } = optionsData;

  const notItemsFound = document.createElement("span");
  notItemsFound.classList.add("not-found");

  notItemsFound.textContent = "";

  if (!optionsList.length) {
    notItemsFound.textContent = "Aucun filtre trouvé";
  } else {
    let allEmpty = true;

    for (let i = 0; i < optionsList.length; i++) {
      const element = optionsList[i];
      if (element !== "") {
        allEmpty = false;
        break;
      }
    }

    if (allEmpty) {
      notItemsFound.textContent = "Aucun filtre trouvé";
    }
  }
  notItemsFound.style.display = notItemsFound.textContent ? "flex" : "none";

  listElement.appendChild(notItemsFound);

  for (let i = 0; i < Math.min(optionsList.length, limit); i++) {
    const item = optionsList[i];
    let checkIfItemSelected = false;

    for (let j = 0; j < selectedValues.length; j++) {
      const s = selectedValues[j];
      if (s.selectedValue.toLowerCase() === item.toLowerCase()) {
        checkIfItemSelected = true;
        break;
      }
    }

    if (!checkIfItemSelected) {
      const option = document.createElement("li");
      option.textContent = item;
      option.setAttribute("data-value", item.toLowerCase());
      option.setAttribute("data-id", id.toLowerCase());
      listElement.appendChild(option);

      option.addEventListener("click", function () {
        const selectedValue = this.getAttribute("data-value");
        const selectedId = this.getAttribute("data-id");

        selectedValues.push({ selectedValue, selectedId });

        const filteredData = [];
        for (let j = 0; j < selectedValues.length; j++) {
          const s = selectedValues[j];
          if (s.selectedId.toLowerCase() === id.toLowerCase()) {
            filteredData.push(s.selectedValue);
          }
        }

        input.value = filteredData.join(", ");
        customSelect.classList.remove("open");
        applyFiltres();
      });
    }
  }
}
function updateCustomFiltre(selector, placeholder, data) {
  const customFilter = document.querySelector(selector);
  const input = customFilter.querySelector("input");
  input.placeholder = placeholder;
  const options = {
    id: placeholder,
    optionsList: data,
  };
  const optionsList = customFilter.querySelector("ul");
  updateOptionsList(optionsList, options, 30, input);
}
function updateFiltres(filteredRecipes) {
  const uniqueFilters = {
    Ingredients: new Set(),
    Appliance: new Set(),
    Ustensils: new Set(),
  };

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
      uniqueFilters.Ingredients.add(ingredient.ingredient.toLowerCase());
    }

    uniqueFilters.Appliance.add(recipe.appliance.toLowerCase());

    for (let k = 0; k < recipe.ustensils.length; k++) {
      const ustensil = recipe.ustensils[k];
      uniqueFilters.Ustensils.add(ustensil.toLowerCase());
    }
  }

  for (let l = 0; l < customFilters.length; l++) {
    const filter = customFilters[l];
    const uniqueValues = Array.from(uniqueFilters[filter.defaultValue]);
    updateCustomFiltre(
      `#${filter.defaultValue}`,
      filter.defaultValue,
      uniqueValues
    );
  }
}
