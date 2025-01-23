"use strict";

const errorMesgEl = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expensesInputEl = document.querySelector('.expensess_input');
const expensesAmountEl = document.querySelector('.expensess_amount');
const tableRecordEl = document.querySelector('.table_data');

// Cards content
const budgetCardEl = document.querySelector('.budget_card');
const expensesCardEl = document.querySelector('.expenses_card');
const balanceCardEl = document.querySelector('.balance_card');

let itemList = [];
let itemID = 1;
let editingId = null;

// =========== Button EVENTS ============
function btnEvents() {
    const btnBudgetCal = document.querySelector('#btn_budget');
    const btnExpensesCal = document.querySelector('#btn_expenses');

    btnBudgetCal.addEventListener('click', (e) => {
        e.preventDefault();
        budgetFun();
    });

    btnExpensesCal.addEventListener('click', (e) => {
        e.preventDefault();
        expensesFun();
    });

    // Event delegation for Edit/Delete buttons
    tableRecordEl.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('btn_delete')) {
            handleDelete(target);
        } else if (target.classList.contains('btn_edit')) {
            handleEdit(target);
        }
    });
}

document.addEventListener('DOMContentLoaded', btnEvents);

function handleDelete(button) {
    const row = button.closest('.tbl_tr_content');
    const id = parseInt(row.querySelector('li[data-id]').dataset.id);
    row.remove();
    itemList = itemList.filter(item => item.id !== id);
    showBalance();
}

function handleEdit(button) {
    const row = button.closest('.tbl_tr_content');
    const id = parseInt(row.querySelector('li[data-id]').dataset.id);
    const expense = itemList.find(item => item.id === id);
    
    if (expense) {
        expensesInputEl.value = expense.description;
        expensesAmountEl.value = expense.amount;
        editingId = id;
    }
}

function expensesFun() {
    const expenseDescValue = expensesInputEl.value;
    const expenseAmountValue = expensesAmountEl.value;

    if (!expenseDescValue || !expenseAmountValue || expenseAmountValue <= 0) {
        return errorMessage("Please Enter valid description and amount");
    }

    const amount = parseFloat(expenseAmountValue);

    if (editingId !== null) {
        // Update existing expense
        const index = itemList.findIndex(item => item.id === editingId);
        if (index !== -1) {
            itemList[index] = {
                ...itemList[index],
                description: expenseDescValue,
                amount: amount
            };
            
            // Update DOM
            const row = tableRecordEl.querySelector(`li[data-id="${editingId}"]`).closest('.tbl_tr_content');
            row.children[1].textContent = expenseDescValue;
            row.children[2].innerHTML = `<span>$</span>${amount.toFixed(2)}`;
            editingId = null;
        }
    } else {
        // Add new expense
        const expense = {
            id: itemID,
            description: expenseDescValue,
            amount: amount
        };
        itemList.push(expense);
        insertExpense(expense);
        itemID++;
    }

    expensesInputEl.value = "";
    expensesAmountEl.value = "";
    showBalance();
}

function insertExpense(expenseParam) {
    const html = `<ul class="tbl_tr_content">
                    <li data-id="${expenseParam.id}">${expenseParam.id}</li>
                    <li>${expenseParam.description}</li>
                    <li><span>$</span>${expenseParam.amount.toFixed(2)}</li>
                    <li>
                        <button type="button" class="btn_edit">Edit</button>
                        <button class="btn_delete" type="button">Delete</button>
                    </li>
                </ul>`;
    tableRecordEl.insertAdjacentHTML('beforeend', html);
}

// =============== Budget Function ================
function budgetFun() {
    const budgetValue = budgetInputEl.value;

    if (budgetValue === '') {
        return errorMessage("Please Enter Budget");
    } else if (budgetValue < 0) {
        return errorMessage("Please Enter Budget more than 0");
    } else {
        budgetCardEl.textContent = parseFloat(budgetValue).toFixed(2);
        budgetInputEl.value = "";
        showBalance();
    }
}

// ======== Error Message function ==========
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
        total = itemList.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    }
    expensesCardEl.textContent = total.toFixed(2);
    return total;
}

// Convert itemList to CSV format
function convertToCSV(itemList) {
    const headers = ['ID', 'Description', 'Amount'];
    const rows = itemList.map(item => [item.id, item.description, item.amount]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.join(',') + '\n';
    });

    return csvContent;
}

// Create a downloadable link for the CSV file
function downloadCSV(itemList) {
    const csvContent = convertToCSV(itemList);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
}

// Add event listener to the download button
document.getElementById('downloadBtn').addEventListener('click', () => {
    downloadCSV(itemList);
});