export function createCards(recipes) {

    const cardsContainer = document.querySelector(".cards-container");

    for (let i = 0; i < recipes.length; i++) {
        const listItem = document.createElement('div');
        listItem.setAttribute('class', 'listItem')


        const card = document.createElement('div');
        card.setAttribute('class', 'card')
        listItem.append(card)


        const image = document.createElement('div');
        image.setAttribute('class', 'image')
        card.append(image)

        const detail = document.createElement('div');
        detail.setAttribute('class', 'detail')
        card.append(detail)

        const nameTime = document.createElement('div');
        nameTime.setAttribute('class', 'name-time')
        detail.append(nameTime)

        const name = document.createElement('span');
        name.setAttribute('class', 'name')
        name.innerText = recipes[i]?.name
        nameTime.append(name)

        const timeContainer = document.createElement('span');
        timeContainer.setAttribute('class', 'timeContainer')
        timeContainer.innerHTML = `<span class="time-container"><i class="fa-regular fa-clock"></i><span class="time">${recipes[i]?.time}</span>min</span>`
        nameTime.append(timeContainer)

        const ingredientsDesc = document.createElement('div');
        ingredientsDesc.setAttribute('class', 'ingredients-desc')
        detail.append(ingredientsDesc)

        const ingredients = document.createElement('span');
        ingredients.setAttribute('class', 'ingredients')

        recipes[i]?.ingredients?.forEach(ingredient => {
            ingredients.innerHTML += `
        <span class="ingredient">
        <span class="ingredient">${ingredient?.ingredient}</span>
        ${ingredient?.quantity ? `:<span class="quantity">${ingredient?.quantity}</span>` : ''}
        ${ingredient?.unit ? `<span class="unit">${ingredient?.unit}</span>` : ''}
    </span>
            `
        })
        ingredientsDesc.append(ingredients)

        const description = document.createElement('span');
        description.setAttribute('class', 'description')
        description.innerText = recipes[i]?.description
        ingredientsDesc.append(description)

        cardsContainer.append(listItem)
    }

}