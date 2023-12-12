import { applyFiltres } from './filtre.js'

export function updateCustomFiltre(selector, placeholder, data) {
    const customFilter = document.querySelector(selector);
    const input = customFilter.querySelector('input');
    input.placeholder = placeholder;

    const optionsList = customFilter.querySelector('ul');
    updateOptionsList(optionsList, data, 30, input);
}

export function updateOptionsList(listElement, optionsData, limit, input) {
    listElement.innerHTML = '';
    const customSelect = document.querySelector('.custom-select');

    optionsData.slice(0, limit).forEach(item => {
        const option = document.createElement('li');
        option.textContent = item;
        option.setAttribute('data-value', item.toLowerCase());
        listElement.appendChild(option);

        option.addEventListener('click', function () {
            const selectedValue = this.getAttribute('data-value');
            input.value = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1);
            customSelect.classList.remove('open');
            applyFiltres();
        });
    });
}
