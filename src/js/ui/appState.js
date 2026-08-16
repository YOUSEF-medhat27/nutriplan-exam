// ============= STATE MANAGEMENT =============

import { displayFoodLog } from "./components.js";

export let API_BASE = "https://nutriplan-api.vercel.app/api";

export let FOODLOG_KEY = "nutriplan_foodlog";

export let DAILY_GOALS = {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65
};

export let categoryIcons = {
    Beef: "fa-drumstick-bite",
    Chicken: "fa-drumstick-bite",
    Dessert: "fa-cake-candles",
    Lamb: "fa-drumstick-bite",
    Pasta: "fa-bowl-food",
    Pork: "fa-bacon",
    Seafood: "fa-fish",
    Side: "fa-bowl-food",
    Vegan: "fa-leaf",
    Vegetarian: "fa-seedling",
    Breakfast: "fa-egg",
    Goat: "fa-drumstick-bite"
};

export let categoryColors = {
    Beef: "bg-red-500",
    Chicken: "bg-orange-500",
    Dessert: "bg-pink-500",
    Lamb: "bg-orange-500",
    Pasta: "bg-amber-500",
    Pork: "bg-red-500",
    Seafood: "bg-sky-500",
    Side: "bg-emerald-500",
    Vegan: "bg-green-500",
    Vegetarian: "bg-lime-500",
    Breakfast: "bg-yellow-500",
    Goat: "bg-orange-500"
};

export let state = {
    recipes: [],
    categories: [],
    areas: [],
    currentMeal: null,
    currentNutrition: null,
    allProducts: [],
    products: [],
    logMealServings: 1
};


export function getTodayKey() {
    let d = new Date();
    return d.toISOString().split("T")[0]; 
}

export function getFoodLog() {
    let data = localStorage.getItem(FOODLOG_KEY);
    return data ? JSON.parse(data) : [];
}

function saveFoodLog(log) {
    localStorage.setItem(FOODLOG_KEY, JSON.stringify(log));
}


export function addToFoodLog(entry) {

    let log = getFoodLog();

    entry.id = Date.now();
    entry.date = getTodayKey();

    log.push(entry);

    saveFoodLog(log);

    displayFoodLog();
}

export function removeFromFoodLog(id) {

    let log = getFoodLog().filter(function (item) {
        return item.id !== id;
    });

    saveFoodLog(log);

    displayFoodLog();
}

export function clearTodayFoodLog() {

    let log = getFoodLog().filter(function (item) {
        return item.date !== getTodayKey();
    });

    saveFoodLog(log);

    displayFoodLog();
}

