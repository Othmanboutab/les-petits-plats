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
export function recipeUstensilsInclude(recipe, searchTerm) {
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
