// ============= API MODULE =============
import { API_BASE, state } from "./appState.js";
import {
    displayRecipes, displayCategories, displayMealDetails,
    displayareas, displayNutrition, displayproduct
} from "./components.js";


export async function getRecipes(search) {

    let response = await fetch(
        `${API_BASE}/meals/search?q=${search}&page=1&limit=25`
    );

    let data = await response.json();

    console.log(data.results);

    state.recipes = data.results;

    displayRecipes();
}

area
export async function getCategories() {

    let response = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/categories"
    );

    let data = await response.json();

    console.log(data);

    state.categories = data.results;

    let newCategories = [];

    for (let i = 0; i < state.categories.length; i++) {

        if (
            state.categories[i].name !== "Miscellaneous" &&
            state.categories[i].name !== "Starter"
        ) {
            newCategories.push(state.categories[i]);
        }

    }

    state.categories = newCategories;

    displayCategories();
}


export async function getdetails(recipeid) {

    let response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/${recipeid}`
    );

    let data = await response.json();

    let meal = data.result;

    console.log(meal);
    state.currentMeal = meal;

    displayMealDetails(meal);

    getNutrition(meal);
}


export async function getareas() {

    let response = await fetch(
        `${API_BASE}/meals/areas`
    );

    let data = await response.json();

    state.areas = data.results;

    displayareas();
}


export async function getNutrition(meal) {

    let ingredients = meal.ingredients.map(function(item) {

        return `${item.measure} ${item.ingredient}`;

    });


    let response = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "x-api-key": "PWh35noNM4J3mq6zPzS3aO8MaNxALuk4r9t5bM2u"
            },

            body: JSON.stringify({

                recipeName: meal.name,

                ingredients: ingredients

            })
        }
    );


    let data = await response.json();

    console.log("Nutrition:", data);


    displayNutrition(data);
}


export async function getproducts(search) {

    let response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/search?q=${search}`
    );

    let data = await response.json();

    state.products = data.results;

    state.allProducts = data.results;

    displayproduct();
}
