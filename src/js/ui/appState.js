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
    Beef: "#ef4444",
    Chicken: "#f97316",
    Dessert: "#ec4899",
    Lamb: "#f97316",
    Pasta: "#f59e0b",
    Pork: "#ef4444",
    Seafood: "#0ea5e9",
    Side: "#10b981",
    Vegan: "#22c55e",
    Vegetarian: "#84cc16",
    Breakfast: "#eab308",
    Goat: "#f97316"
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

