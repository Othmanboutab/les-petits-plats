import { updateFilteredRecipes } from "./filtre.js";

export function setupSearch() {
  const searchInput = document.getElementById("search-bar");
  searchInput.addEventListener("input", () => {
    updateFilteredRecipes(searchInput.value);
  });
}
