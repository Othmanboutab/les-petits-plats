import { recipes } from '../../data/recipes.js'


export function getAllIngredients() {
    const allIngredients = [];

    recipes.forEach(recipe => {
        const ingredients = recipe.ingredients;

        ingredients.forEach(ingredientData => {
            const ingredient = ingredientData.ingredient;
            if (ingredient && !allIngredients.includes(ingredient.toLowerCase())) {
                allIngredients.push(ingredient.toLowerCase());
            }
        });
    });

    return allIngredients;
}

export function getAllUstensils() {
    let allUstensils = [];

    recipes.forEach(recipe => {
        const ustensils = recipe.ustensils;

        if (ustensils) {
            ustensils.forEach(ustensil => {
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

    recipes.forEach(recipe => {
        const appliance = recipe.appliance;
        if (appliance && !allAppliances.includes(appliance)) {
            allAppliances.push(appliance);
        }
    });

    return allAppliances;
}
