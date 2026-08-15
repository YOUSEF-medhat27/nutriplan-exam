// ============= STATE MANAGEMENT =============

import { displayFoodLog } from "./components.js";

export const API_BASE = "https://nutriplan-api.vercel.app/api";

export const FOODLOG_KEY = "nutriplan_foodlog";

export const DAILY_GOALS = {
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 65
};

export const categoryIcons = {
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

export const categoryColors = {
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

// كل المتغيرات اللي كانت بتتغير (reassign) في الكود الأصلي (recipes = ...، currentMeal = ...، إلخ)
// اتحطت جوه object واحد اسمه state، عشان باقي الملفات تقدر تعدلها:
// JS مبيسمحش تعدل متغير let متجاب بـ import من ملف تاني مباشرة،
// لكن بيسمح تعدل property جوه object متجاب بالـ import.
// ده التغيير الميكانيكي الوحيد المطلوب في الكود الأصلي.
export const state = {
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
    return d.toISOString().split("T")[0]; // "2026-08-15"
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
