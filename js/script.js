"use strict";

const errorMesgEl = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expensesInputEl = document.querySelector('.expensess_input');
const expensesAmountEl = document.querySelector('.expensess_amount');
const tableRecordEl = document.querySelector('.tbl_data');
const cardsContainer = document.querySelector('.cards');


//cards content
const budgetCardEl = document.querySelector('.budget_card');
const expensesCardEl = document.querySelector('.expenses_card');
const balanceCardEl = document.querySelector('.balance_card');

let itemList = [];
let itemID = 0;

// ===========Button EVENTS============
function btnEvents() {
    const btnBudgetCal = document.querySelector('#btn_budget');
    const btnExpensesCal = document.querySelector('#btn_expenses');

    // ===============Budget Event===============
    btnBudgetCal.addEventListener('click', (e) => {
        e.preventDefault();
        budgetFun();
    });

    // ===============Expenses Event===============
    btnExpensesCal.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('expenses');
    });
}
// ======= Calling Btns Events ==========
document.addEventListener('DOMContentLoaded', btnEvents);

// ===============Budget Function===============
function budgetFun() {
    const budgetValue = budgetInputEl.value;
    if (budgetValue === '') {
        errorMessage("Please Enter Budget");
    }else if(budgetValue < 0){
        errorMessage("Please Enter Budget more than 0");
    }
    else {
        budgetCardEl.textContent = budgetValue;
        budgetInputEl.value = "";
        showBalance();
    }

// ========Error Message function==========
function errorMessage(message) {
    errorMesgEl.innerHTML = message;
    errorMesgEl.classList.add('error');
    errorMesgEl.innerHTML = `<p>${message}</p>`;
    errorMesgEl.classList.add('error');
    setTimeout(() => {errorMesgEl.classList.remove('error')}, 2500);
} 



function showBalance() {
    const expenses = totalExpenses();
}

function totalExpenses() {

}
}
