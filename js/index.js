import recipes from '../data/recipes.js';
import { createCards } from './utils/cards.js';
import { setupFiltres } from './utils/filtre.js';
import { setupSearch } from './utils/search.js';


setupFiltres();
setupSearch();
createCards(recipes);
