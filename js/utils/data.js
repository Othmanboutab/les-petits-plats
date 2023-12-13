import recipes from '../../data/recipes.js';

export function getAllIngredients() {
  const allIngredients = [];

  recipes.forEach((recipe) => {
    const { ingredients } = recipe;

    ingredients.forEach((ingredientData) => {
      const { ingredient } = ingredientData;
      if (ingredient && !allIngredients.includes(ingredient.toLowerCase())) {
        allIngredients.push(ingredient.toLowerCase());
      }
    });
  });

  return allIngredients;
}

export function getAllUstensils() {
  const allUstensils = [];

  recipes.forEach((recipe) => {
    const { ustensils } = recipe;

    if (ustensils) {
      ustensils.forEach((ustensil) => {
        if (!allUstensils.includes(ustensil)) {
          allUstensils.push(ustensil);
        }
      });
    }
  });

  return allUstensils;
}

export function getAllAppliances() {
  const allAppliances = [];

  recipes.forEach((recipe) => {
    const { appliance } = recipe;
    if (appliance && !allAppliances.includes(appliance)) {
      allAppliances.push(appliance);
    }
  });

  return allAppliances;
}
