"use strict";

const errorMesgEl = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expensesInputEl = document.querySelector('.expensess_input');
const expensesAmountEl = document.querySelector('.expensess_amount');
const tableRecordEl = document.querySelector('.tbl_data');
const cardsContainer = document.querySelector('.cards');

// cards content
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
        expensesFun();
    });
}

// ======= Calling Btns Events ==========
document.addEventListener('DOMContentLoaded', btnEvents);

// ========= Expenses Function =============
function expensesFun() {
    const expenseDescValue = expensesInputEl.value; // Capture input value
    const expenseAmountValue = expensesAmountEl.value; // Capture input value

    if (expenseDescValue === '' || expenseAmountValue === '' || expenseAmountValue <= 0) {
        return errorMessage("Please Enter Expense Description and correct amount"); // Error for empty description or amount
    } else {
        const expense = {
            id: itemID, // Use current itemID
            description: expenseDescValue, // Use captured description
            amount: parseFloat(expenseAmountValue) // Use captured amount
        };

        expensesInputEl.value = ""; // Reset input field
        expensesAmountEl.value = ""; // Reset input field
        itemList.push(expense); // Add to itemList
        itemID++; // Increment itemID


        insertExpense(expense); // Add to table
        showBalance(); // Update balance
    }
}


//===============Add Expenses to Table================
function insertExpense(expenseParam) {
    const html = `<ul class="tbl_tr_content">
                    <li>${expenseParam.id}</li>
                    <li>${expenseParam.description}</li>
                    <li><span>$</span>${expenseParam.amount}</li>
                    <li>
                        <button type="button" class="btn_edit">Edit</button>
                        <button class="btn_delete" type="button">Delete</button>
                    </li>
                </ul>  `;
                tableRecordEl.insertAdjacentHTML('beforeend', html);
}


// ===============Budget Function===============
function budgetFun() {
    const budgetValue = budgetInputEl.value;

    if (budgetValue === '') {
        return errorMessage("Please Enter Budget");
    } else if (budgetValue < 0) {
        return errorMessage("Please Enter Budget more than 0");
    } else {
        budgetCardEl.textContent = budgetValue;
        budgetInputEl.value = "";
        showBalance();
    }
}

// ========Error Message function==========
function errorMessage(message) {
    errorMesgEl.innerHTML = `<p>${message}</p>`;
    errorMesgEl.classList.add('error');
    setTimeout(() => {
        errorMesgEl.classList.remove('error');
    }, 2500);
}

// Function to show balance
function showBalance() {
    const expenses = totalExpenses();
    const total = parseFloat(budgetCardEl.textContent) - expenses;
    balanceCardEl.textContent = total.toFixed(2);
}

// Function to calculate total expenses
function totalExpenses() {
    let total = 0;

    if (itemList.length > 0) {
        total = itemList.reduce((acc, curr) => acc + curr.amount, 0);
    }
    return total;
}
