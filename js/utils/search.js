import recipes from "../../data/recipes.js";
import { handleRecipeFilteringAndDisplay } from "./filtre.js";

export function setupSearch() {
  const searchInput = document.getElementById("search-bar");
  searchInput.addEventListener("input", () => {
    handleRecipeFilteringAndDisplay(searchInput.value.toLowerCase(), recipes);
  });
}
