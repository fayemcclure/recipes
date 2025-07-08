import recipes from './recipes.mjs';
function random(num) {
    return Math.floor(Math.random() * num);
}
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}
function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tags">${tag}</span>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += `<span aria-hidden="true" class="${i <= rating ? 'icon-star' : 'icon-star-empty'}">${i <= rating ? '⭐' : '☆'}</span>`;
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
  return `
    <img src="images/${recipe.image}" alt="${recipe.name}"/>
    <div class="content">
        ${tagsTemplate(recipe.tags)}
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p>${recipe.description}</p>
    </div>
  `;
}
function renderRecipes(recipeList) {
    const output = document.querySelector("#recipe");
    output.innerHTML = recipeList.map(recipeTemplate).join('');
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}
function filterRecipes(query) {
    return recipes
    .filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.recipeIngredient?.find(item => item.toLowerCase().includes(query)) ||
        recipe.tags.find(tag => tag.toLowerCase().includes(query))
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}
function searchHandler(e) {
    e.preventDefault();
    const query = document.querySelector("#search").value.toLowerCase();
    const filtered = filterRecipes(query);
    renderRecipes(filtered);
}

document.querySelector(".search-form").addEventListener("submit", searchHandler);

init();