export function recipeIngredientsInclude(recipe, searchTerm) {
    return recipe.ingredients.some(ingredient =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
    );
}

export function recipeUstensilsInclude(recipe, searchTerm) {
    return recipe.ustensils.some(ustensil =>
        ustensil.toLowerCase().includes(searchTerm)
    );
}
