// ============= ENTRY POINT =============
import { getRecipes, getCategories, getareas, getdetails, getproducts } from "./ui/mealdb.js";
import { displayFoodLog, updateLogMealDisplay, displayproduct } from "./ui/components.js";
import { state, clearTodayFoodLog, addToFoodLog } from "./ui/appState.js";


window.getdetails = getdetails;


let recipesGrid = document.getElementById("recipes-grid");
let searchInput = document.getElementById("search-input");
let listbtn = document.getElementById("list-view-btn");
let gridbtn = document.getElementById("grid-view-btn");



searchInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        let searchValue = searchInput.value;

        getRecipes(searchValue);

    }

});


getRecipes("beef");


listbtn.addEventListener("click", function () {

    recipesGrid.classList.remove(
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-4"
    );

    recipesGrid.classList.add("grid-cols-2");

  
    listbtn.classList.add("bg-white", "rounded-md");
    gridbtn.classList.remove("bg-white", "rounded-md");

});


gridbtn.addEventListener("click", function () {

  
    recipesGrid.classList.remove("grid-cols-2");

    recipesGrid.classList.add(
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-4"
    );

  
    gridbtn.classList.add("bg-white", "rounded-md");
    listbtn.classList.remove("bg-white", "rounded-md");

});


getCategories();


getareas();




let navLinks = document.querySelectorAll(".nav-link");

let sections = document.querySelectorAll(
    "#meals-section, #products-section, #foodlog-section"
);

navLinks.forEach(function (link) {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        let sectionId = link.dataset.section;

        sections.forEach(function (section) {

            section.classList.add("hidden");

        });

        document
            .getElementById(sectionId)
            .classList.remove("hidden");

        navLinks.forEach(function (nav) {

            nav.classList.remove(
                "bg-emerald-50",
                "text-emerald-700"
            );

            nav.classList.add(
                "text-gray-600"
            );

        });

        link.classList.remove(
            "text-gray-600"
        );

        link.classList.add(
            "bg-emerald-50",
            "text-emerald-700"
        );

    });

});


// ************************الصفحه التانيه

let productsearch = document.getElementById("product-search-input");
let productsearchbtn = document.getElementById("search-product-btn");
let productcard = document.getElementById("products-grid");


let nutriButtons = document.querySelectorAll(".nutri-score-filter");

nutriButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let grade = button.dataset.grade;

        nutriButtons.forEach(function(btn) {

            btn.classList.remove(
                "border-2",
                "border-indigo-500"
            );

        });

        button.classList.add(
            "border-2",
            "border-indigo-500"
        );



        if (grade === "") {

            state.products = state.allProducts;

        } else {

            state.products = state.allProducts.filter(function(product) {

                return product.nutritionGrade.toLowerCase() === grade;

            });

        }


        displayproduct();

    });

});


productsearchbtn.addEventListener("click", function () {

    let search = productsearch.value.trim();

    if (search === "") {
        return;
    }

    getproducts(search);

});



// *********صفحه logfood

let clearFoodlogBtn = document.getElementById("clear-foodlog");

if (clearFoodlogBtn) {
    clearFoodlogBtn.addEventListener("click", function () {
        clearTodayFoodLog();
    });
}


displayFoodLog();


let logMealModal = document.getElementById("log-meal-modal");
let logMealSuccessModal = document.getElementById("logmeal-success-modal");


if (logMealModal) {

    document.getElementById("logmeal-decrease").addEventListener("click", function () {

        if (state.logMealServings > 1) {
            state.logMealServings--;
            updateLogMealDisplay();
        }

    });

    document.getElementById("logmeal-increase").addEventListener("click", function () {

        state.logMealServings++;
        updateLogMealDisplay();

    });


  
    document.getElementById("logmeal-cancel").addEventListener("click", function () {

        logMealModal.classList.add("hidden");

    });


   document.getElementById("logmeal-confirm").addEventListener("click", function () {

      
        addToFoodLog({
            type: "meal",
            name: state.currentMeal.name,
            thumbnail: state.currentMeal.thumbnail,
            servings: state.logMealServings,
            calories: state.currentNutrition.calories * state.logMealServings,
            protein: state.currentNutrition.protein * state.logMealServings,
            carbs: state.currentNutrition.carbs * state.logMealServings,
            fat: state.currentNutrition.fat * state.logMealServings
        });

        logMealModal.classList.add("hidden");


        
        document.getElementById("logmeal-success-text").innerText =
            `${state.currentMeal.name} (${state.logMealServings} serving) has been added to your daily log.`;


  
        document.getElementById("logmeal-success-calories").innerText =
            `+${state.currentNutrition.calories * state.logMealServings} calories`;


        logMealSuccessModal.classList.remove("hidden");

        setTimeout(function () {

            logMealSuccessModal.classList.add("hidden");

        }, 2000);
    }); 

}


let sidebar = document.getElementById("sidebar");
let sidebarOverlay = document.getElementById("sidebar-overlay");
let headerMenuBtn = document.getElementById("header-menu-btn");
let sidebarCloseBtn = document.getElementById("sidebar-close-btn");

function openSidebar() {
    sidebar.classList.add("sidebar-open");
    sidebarOverlay.classList.add("active");
}

function closeSidebar() {
    sidebar.classList.remove("sidebar-open");
    sidebarOverlay.classList.remove("active");
}

headerMenuBtn.addEventListener("click", function () {
    openSidebar();
});

sidebarCloseBtn.addEventListener("click", function () {
    closeSidebar();
});

sidebarOverlay.addEventListener("click", function () {
    closeSidebar();
});