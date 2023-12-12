import { recipes } from '../../data/recipes.js'


export function getAllIngredients() {
    const allIngredients = [];

    // Parcours de chaque recette
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const ingredients = recipe.ingredients;

        // Parcours de chaque ingrédient dans la recette
        for (let j = 0; j < ingredients.length; j++) {
            const ingredient = ingredients[j].ingredient;
            if (ingredient && !allIngredients.includes(ingredient.toLowerCase())) {
                allIngredients.push(ingredient.toLowerCase());
            }
        }
    }

    return allIngredients

}

export function getAllUstensils() {
    let allUstensils = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const ustensils = recipe.ustensils;

        if (ustensils) {
            // Parcours de chaque ustensil dans la recette
            for (let j = 0; j < ustensils.length; j++) {
                const ustensil = ustensils[j];
                // Ajout de l'ustensil au tableau allUstensils s'il n'est pas déjà présent
                if (!allUstensils.includes(ustensil)) {
                    allUstensils.push(ustensil);
                }
            }
        }
    }
    return allUstensils;
}


export function getAllAppliances() {
    const allAppliances = [];

    // Parcours de chaque recette
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const appliance = recipe.appliance;

        if (appliance) {
            // Ajout de l'appliance au tableau allAppliances s'il n'est pas déjà présent
            if (!allAppliances.includes(appliance)) {
                allAppliances.push(appliance);
            }
        }
    }

    return allAppliances
}