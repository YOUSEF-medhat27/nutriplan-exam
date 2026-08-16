// ============= UI COMPONENTS =============

import {
    state, categoryIcons, categoryColors, DAILY_GOALS,
    getFoodLog, getTodayKey, removeFromFoodLog
} from "./appState.js";

import { getRecipes } from "./mealdb.js";


let recipesGrid = document.getElementById("recipes-grid");
let recipesCount = document.getElementById("recipes-count");
let categoriesgrid = document.getElementById("meal-categories-section");
let searchsection = document.getElementById("search-filters-section");
let productsSection = document.getElementById("products-section");
let foodlogSection = document.getElementById("foodlog-section");
let mealDetails = document.getElementById("meal-details");
let logMealModal = document.getElementById("log-meal-modal");


export function displayRecipes() {

    let box = "";

    for (let i = 0; i < state.recipes.length; i++) {

        box += `
            <div  
            onclick="getdetails(${state.recipes[i].id})"
                class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-meal-id="${state.recipes[i].id}"
            >

                <div class="relative h-48 overflow-hidden">

                    <img
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src="${state.recipes[i].thumbnail}"
                        alt="${state.recipes[i].name}"
                        loading="lazy"
                    />

                    <div class="absolute bottom-3 left-3 flex gap-2">

                        <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                            ${state.recipes[i].category}
                        </span>

                        <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                            ${state.recipes[i].area}
                        </span>

                    </div>

                </div>


                <div class="p-4">

                    <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        ${state.recipes[i].name}
                    </h3>

                    <p class="text-xs text-gray-600 mb-3">
                        ${state.recipes[i].ingredients.length} ingredients
                    </p>

                    <div class="flex items-center justify-between text-xs">

                        <span class="font-semibold text-gray-900">
                            <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                            ${state.recipes[i].category}
                        </span>

                        <span class="font-semibold text-gray-500">
                            <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                            ${state.recipes[i].area}
                        </span>

                    </div>

                </div>

            </div>
        `;
    }

    recipesGrid.innerHTML = box;

    recipesCount.innerHTML = `Showing ${state.recipes.length} recipes`;
}


export function displayCategories() {

    let box = "";

    for (let i = 0; i < state.categories.length; i++) {

        let icon = categoryIcons[state.categories[i].name];

        let color = categoryColors[state.categories[i].name];

        box += `
    <div
        class="category-card flex items-center gap-3 px-3 py-2.5
        border border-gray-200
        rounded-xl
        cursor-pointer
        hover:shadow-sm
        transition-all"
        data-category="${state.categories[i].name}"
    >

        <div
            class="w-10 h-10
            rounded-lg
            ${color}
            flex items-center justify-center
            text-white
            shrink-0"
        >
            <i class="fa-solid ${icon}"></i>
        </div>

        <span class="font-semibold text-gray-900">
            ${state.categories[i].name}
        </span>

    </div>
`;
    }

    document.getElementById("categories-grid").innerHTML = box;


    let categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach(function (card) {

        card.addEventListener("click", function () {

            let category = card.dataset.category;

            getRecipes(category);

        });

    });
}


export function getYoutubeEmbedUrl(url) {

    if (!url) return "";

    let videoId = url.split("v=")[1];

    if (videoId) {
        videoId = videoId.split("&")[0];

        return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
}


export function displayMealDetails(meal) {

    mealDetails.innerHTML = `
 <div class="max-w-7xl mx-auto">

            <button
                id="back-to-meals-btn"
                class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
            >
                <i class="fa-solid fa-arrow-left"></i>
                <span>Back to Recipes</span>
            </button>


            <!-- Hero -->

            <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">

                <div class="relative h-80 md:h-96">

                    <img
                        src="${meal.thumbnail}"
                        alt="${meal.name}"
                        class="w-full h-full object-cover"
                    >

                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div class="absolute bottom-0 left-0 right-0 p-8">

                        <div class="flex items-center gap-3 mb-3">

                            <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                                ${meal.category}
                            </span>

                            <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                                ${meal.area}
                            </span>

                        </div>

                        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                            ${meal.name}
                        </h1>
                         <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>

                    </div>

                </div>

            </div>
<div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="52772"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

            <!-- Ingredients + Instructions -->

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div class="lg:col-span-2 space-y-8">


                    <!-- Ingredients -->

                    <div class="bg-white rounded-2xl shadow-lg p-6">

                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">

                            <i class="fa-solid fa-list-check text-emerald-600"></i>

                            Ingredients

                            <span class="text-sm font-normal text-gray-500 ml-auto">
                                ${meal.ingredients.length} items
                            </span>

                        </h2>


                 <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

    ${meal.ingredients.map(function (ingredient) {

        return `
            <div
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
            >
                <input
                    type="checkbox"
                    class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                />

                <span class="text-gray-700">
                    <span class="font-medium text-gray-900">
                        ${ingredient.measure}
                    </span>

                    ${ingredient.ingredient}
                </span>
            </div>
        `;

    }).join("")}

</div>


                    <!-- Instructions -->

                    <div class="mt-4 bg-white rounded-2xl shadow-lg p-6">

                        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">

                            <i class="fa-solid fa-shoe-prints text-emerald-600"></i>

                            Instructions

                        </h2>

                        <p class="text-gray-700 leading-relaxed">
                            ${meal.instructions}
                        </p>

                    </div>


                   <!-- Video -->
${meal.youtube ? `
    <div class="bg-white rounded-2xl shadow-lg p-6 mt-4">

        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-video text-red-500"></i>
            Video Tutorial
        </h2>

        <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            <iframe
                src="${getYoutubeEmbedUrl(meal.youtube)}"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div>

    </div>
` : ""}

                    
                </div>
                

            </div>

        </div>

          
          </div>
          <!-- RIGHT COLUMN -->

<div class="space-y-6 mt-4">

    <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">

            <i class="fa-solid fa-chart-pie text-emerald-600"></i>

            Nutrition Facts

        </h2>


        <div id="nutrition-facts-container">

            <p class="text-sm text-gray-500">
                Loading nutrition...
            </p>

        </div>

    </div>

</div>
        
    `;

   
    recipesGrid.parentElement.classList.add("hidden");

    mealDetails.classList.remove("hidden");

    categoriesgrid.classList.add("hidden");
    searchsection.classList.add("hidden");

    productsSection.classList.add("hidden");
    foodlogSection.classList.add("hidden");


   
    document
        .getElementById("back-to-meals-btn")
        .addEventListener("click", function () {

            mealDetails.classList.add("hidden");

           
            recipesGrid.parentElement.classList.remove("hidden");

            categoriesgrid.classList.remove("hidden");

           
            searchsection.classList.remove("hidden");


        });

    document
        .getElementById("log-meal-btn")
        .addEventListener("click", function () {

            openLogMealModal();

        });

}



export function displayareas() {

    let areascusines = document.getElementById("areascusines");

    let box = `
        <button
            class="area-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap"
            data-area="all"
        >
            All Cuisines
        </button>
    `;

    let first10Areas = state.areas.slice(0, 10);

    for (let i = 0; i < first10Areas.length; i++) {

        box += `
        <button
            class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            data-area="${first10Areas[i].name}"
        >
            ${first10Areas[i].name}
        </button>
    `;
    }

    areascusines.innerHTML = box;



    let areaButtons = document.querySelectorAll(".area-btn");

    areaButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            for (let i = 0; i < areaButtons.length; i++) {

                areaButtons[i].classList.remove(
                    "bg-emerald-600",
                    "text-white"
                );

                areaButtons[i].classList.add(
                    "bg-gray-100",
                    "text-gray-700"
                );
            }


            button.classList.remove(
                "bg-gray-100",
                "text-gray-700"
            );

            button.classList.add(
                "bg-emerald-600",
                "text-white"
            );


            let area = button.dataset.area;


            if (area === "all") {

                getRecipes("chicken");

            } else {

                getRecipes(area);

            }

        });

    });
}


export function displayNutrition(data) {

    let container = document.getElementById("nutrition-facts-container");
    if (!container) return;

    let nutrition = data.data || data;

    state.currentNutrition = nutrition.perServing;

    let totcalories = nutrition.totals.calories;
    let calories = nutrition.perServing.calories;
    let protein = nutrition.perServing.protein;
    let carbs = nutrition.perServing.carbs;
    let fat = nutrition.perServing.fat;
    let fiber = nutrition.perServing.fiber;

    container.innerHTML = `

        <p class="text-sm text-gray-500 mb-4">
            Per serving
        </p>


        <div class="text-center py-4 mb-4 bg-emerald-50 rounded-xl">

            <p class="text-sm text-gray-600">
                Calories per serving
            </p>

            <p class="text-4xl font-bold text-emerald-600">
                ${calories}
            </p>
            <p class="text-sm text-gray-600">
                Total: ${totcalories}
            </p>

        </div>


        <div class="space-y-4">

            <div class="flex items-center justify-between">
                <span class="text-gray-700">Protein</span>
                <span class="font-bold text-gray-900">${protein}g</span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-gray-700">Carbs</span>
                <span class="font-bold text-gray-900">${carbs}g</span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-gray-700">Fat</span>
                <span class="font-bold text-gray-900">${fat}g</span>
            </div>

            <div class="flex items-center justify-between">
                <span class="text-gray-700">Fiber</span>
                <span class="font-bold text-gray-900">${fiber}g</span>
            </div>

        </div>

    `;
}


export function displayproduct() {

    let box = "";

    for (let i = 0; i < state.products.length; i++) {

        box += `
        
        <div
            class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            data-barcode="${state.products[i].barcode}"
        >

            <div
                class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
            >

                <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${state.products[i].image}"
                    alt="${state.products[i].name}"
                    loading="lazy"
                />

                <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                >
                   Nutri-Score ${state.products[i].nutritionGrade}
                </div>

                <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                >
                    ${state.products[i].novaGroup}
                </div>

            </div>


            <div class="p-4">

                <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                >
                    ${state.products[i].brand}
                </p>


                <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                >
                    ${state.products[i].name}
                </h3>


                <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                >

                    <span>
                        <i class="fa-solid fa-weight-scale mr-1"></i>
                        250g
                    </span>

                    <span>
                        <i class="fa-solid fa-fire mr-1"></i>
                        ${state.products[i].nutrients.calories.toFixed(2)} kcal/100g
                    </span>

                </div>


                <div class="grid grid-cols-4 gap-1 text-center">

                    <div class="bg-emerald-50 rounded p-1.5">
                        <p class="text-xs font-bold text-emerald-700">
                            ${state.products[i].nutrients.protein.toFixed(2)}g
                        </p>
                        <p class="text-[10px] text-gray-500">
                            Protein
                        </p>
                    </div>


                    <div class="bg-blue-50 rounded p-1.5">
                        <p class="text-xs font-bold text-blue-700">
                            ${state.products[i].nutrients.carbs.toFixed(2)}g
                        </p>
                        <p class="text-[10px] text-gray-500">
                            Carbs
                        </p>
                    </div>


                    <div class="bg-purple-50 rounded p-1.5">
                        <p class="text-xs font-bold text-purple-700">
                            ${state.products[i].nutrients.fat.toFixed(2)}g
                        </p>
                        <p class="text-[10px] text-gray-500">
                            Fat
                        </p>
                    </div>


                    <div class="bg-orange-50 rounded p-1.5">
                        <p class="text-xs font-bold text-orange-700">
                            ${state.products[i].nutrients.sugar.toFixed(2)}g
                        </p>
                        <p class="text-[10px] text-gray-500">
                            Sugar
                        </p>
                    </div>

                </div>

            </div>

        </div>

        `;
    }

    document.getElementById("products-grid").innerHTML = box;
}


export function displayFoodLog() {

    let log = getFoodLog();
    let today = getTodayKey();

    let todayItems = log.filter(function (item) {
        return item.date === today;
    });

    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };

    todayItems.forEach(function (item) {
        totals.calories += Number(item.calories) || 0;
        totals.protein += Number(item.protein) || 0;
        totals.carbs += Number(item.carbs) || 0;
        totals.fat += Number(item.fat) || 0;
    });

    updateProgress("calories", totals.calories, DAILY_GOALS.calories, "kcal");
    updateProgress("protein", totals.protein, DAILY_GOALS.protein, "g");
    updateProgress("carbs", totals.carbs, DAILY_GOALS.carbs, "g");
    updateProgress("fat", totals.fat, DAILY_GOALS.fat, "g");


    let countEl = document.getElementById("logged-items-count");
    if (countEl) {
        countEl.innerText = `Logged Items (${todayItems.length})`;
    }

    let clearBtn = document.getElementById("clear-foodlog");
    if (clearBtn) {
        clearBtn.style.display = todayItems.length > 0 ? "inline-flex" : "none";
    }


    let listContainer = document.getElementById("logged-items-list");

    if (!listContainer) return;

    if (todayItems.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm">Add meals from the Meals page or scan products</p>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = todayItems.map(function (item) {
        return `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">

                <div class="flex items-center gap-3">
                    <img src="${item.thumbnail || ''}" class="w-12 h-12 rounded-lg object-cover bg-gray-200" alt="${item.name}">
                    <div>
                        <p class="font-semibold text-gray-900">${item.name}</p>
                        <p class="text-xs text-gray-500">
                            ${Math.round(item.calories)} kcal &middot;
                            P ${Math.round(item.protein)}g &middot;
                            C ${Math.round(item.carbs)}g &middot;
                            F ${Math.round(item.fat)}g
                        </p>
                    </div>
                </div>

                <button
                    class="remove-foodlog-item text-red-400 hover:text-red-600 px-2"
                    data-id="${item.id}"
                    title="Remove"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;
    }).join("");

    document.querySelectorAll(".remove-foodlog-item").forEach(function (btn) {
        btn.addEventListener("click", function () {
            let id = Number(btn.dataset.id);
            removeFromFoodLog(id);
        });
    });
}


export function updateProgress(key, current, goal, unit) {

    let textEl = document.getElementById(`foodlog-${key}-text`);
    let barEl = document.getElementById(`foodlog-${key}-bar`);

    if (textEl) {
        textEl.innerText = `${Math.round(current)} / ${goal} ${unit}`;
    }

    if (barEl) {
        let percent = Math.min((current / goal) * 100, 100);
        barEl.style.width = `${percent}%`;
    }
}


export function openLogMealModal() {

    if (!state.currentMeal || !state.currentNutrition) {

        return;
    }

    if (!logMealModal) {
        console.error("log-meal-modal مش موجود في الـ HTML، ضيفه الأول");
        return;
    }

    state.logMealServings = 1;

    document.getElementById("logmeal-image").src = state.currentMeal.thumbnail || "";
    document.getElementById("logmeal-name").innerText = state.currentMeal.name;

    updateLogMealDisplay();

    logMealModal.classList.remove("hidden");
}


export function updateLogMealDisplay() {

    document.getElementById("logmeal-servings").innerText = state.logMealServings;

    let calories = Math.round(state.currentNutrition.calories * state.logMealServings);
    let protein = Math.round(state.currentNutrition.protein * state.logMealServings);
    let carbs = Math.round(state.currentNutrition.carbs * state.logMealServings);
    let fat = Math.round(state.currentNutrition.fat * state.logMealServings);

    document.getElementById("logmeal-calories").innerText = calories;
    document.getElementById("logmeal-protein").innerText = protein + "g";
    document.getElementById("logmeal-carbs").innerText = carbs + "g";
    document.getElementById("logmeal-fat").innerText = fat + "g";
}
