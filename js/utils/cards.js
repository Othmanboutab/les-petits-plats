export function createCards(recipes) {
    // Récupération du conteneur des cartes
    const cardsContainer = document.querySelector(".cards-container");

    cardsContainer.innerHTML = '';
    // Parcours de chaque recette
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        // Création de la structure de la carte
        const listItem = document.createElement('div');
        listItem.setAttribute('class', 'listItem');

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        listItem.append(card);

        const image = document.createElement('div');
        image.setAttribute('class', 'image');
        card.append(image);

        const detail = document.createElement('div');
        detail.setAttribute('class', 'detail');
        card.append(detail);

        const nameTime = document.createElement('div');
        nameTime.setAttribute('class', 'name-time');
        detail.append(nameTime);

        // Affichage du nom de la recette
        const name = document.createElement('span');
        name.setAttribute('class', 'name');
        name.innerText = recipe?.name;
        nameTime.append(name);

        // Affichage du temps de préparation
        const timeContainer = document.createElement('span');
        timeContainer.setAttribute('class', 'timeContainer');
        timeContainer.innerHTML = `<span class="time-container"><i class="fa-regular fa-clock"></i><span class="time">${recipe?.time}</span>min</span>`;
        nameTime.append(timeContainer);

        // Affichage des ingrédients
        const ingredientsDesc = document.createElement('div');
        ingredientsDesc.setAttribute('class', 'ingredients-desc');
        detail.append(ingredientsDesc);

        const ingredients = document.createElement('span');
        ingredients.setAttribute('class', 'ingredients');

        // Parcours de chaque ingrédient dans la recette
        for (let j = 0; j < recipe?.ingredients?.length; j++) {
            const ingredient = recipe.ingredients[j];

            // Construction de la balise HTML pour l'ingrédient
            const ingredientElement = document.createElement('span');
            ingredientElement.setAttribute('class', 'ingredient');

            // Ajout de l'ingrédient avec sa quantité et unité (si disponibles)
            ingredientElement.innerHTML = `
                <span class="ingredient">${ingredient?.ingredient}</span>
                ${ingredient?.quantity ? `:<span class="quantity">${ingredient?.quantity}</span>` : ''}
                ${ingredient?.unit ? `<span class="unit">${ingredient?.unit}</span>` : ''}
            `;

            ingredients.appendChild(ingredientElement);
        }

        ingredientsDesc.append(ingredients);

        // Affichage de la description de la recette
        const description = document.createElement('span');
        description.setAttribute('class', 'description');
        description.innerText = recipe?.description;
        ingredientsDesc.append(description);

        // Ajout de la carte au conteneur
        cardsContainer.append(listItem);
    }
}