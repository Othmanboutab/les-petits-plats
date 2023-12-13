import {
  getAllIngredients,
  getAllUstensils,
  getAllAppliances,
} from "../utils/data.js";

export const customFilters = [
  {
    defaultValue: "Ingredients",
    color: "#3282F7",
    placeholder: "Rechercher un ingrédient",
    data: getAllIngredients(),
  },
  {
    defaultValue: "Appliance",
    color: "#68D9A4",
    placeholder: "Rechercher un appareil",
    data: getAllAppliances(),
  },
  {
    defaultValue: "Ustensils",
    color: "#ED6454",
    placeholder: "Rechercher un ustensil",
    data: getAllUstensils(),
  },
];
