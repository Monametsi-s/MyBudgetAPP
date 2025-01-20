"use strict";

const errorMesgEl = document.querySelector('.error_message');
const budgetInputEl = document.querySelector('.budget_input');
const expensesInputEl = document.querySelector('.expensess_input');
const expensesAmountEl = document.querySelector('.expensess_amount');
const tableRecordEl = document.querySelector('.table_data');
const cardsContainer = document.querySelector('.cards');

// cards content
const budgetCardEl = document.querySelector('.budget_card');
const expensesCardEl = document.querySelector('.expenses_card');
const balanceCardEl = document.querySelector('.balance_card');

let itemList = [];
let itemID = 1;

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
            amount: parseFloat(expenseAmountValue).toFixed(2) // Use captured amount
        };

        itemList.push(expense); // Add to itemList
        itemID++; // Increment itemID
        expensesInputEl.value = ""; // Reset input field
        expensesAmountEl.value = ""; // Reset input field

        insertExpense(expense); // Add to table
        showBalance(); // Update balance
    }
}


//===============Add Expenses to Table================
function insertExpense(expenseParam) {
    const html = `<ul class="tbl_tr_content">
                    <li data-id= ${expenseParam.id}>${expenseParam.id}</li>
                    <li>${expenseParam.description}</li>
                    <li><span>$</span>${expenseParam.amount}</li>
                    <li>
                        <button type="button" class="btn_edit">Edit</button>
                        <button class="btn_delete" type="button">Delete</button>
                    </li>
                </ul>  `;
tableRecordEl.insertAdjacentHTML('beforeend', html);
//==================Edit and Delete Button================

const btnEdit = document.querySelectorAll('.btn_edit');
const btnDelete = document.querySelectorAll('.btn_delete');
const content_id = document.querySelectorAll('.tbl_tr_content');

// ==============Button Edit Function================

btnEdit.forEach((btnEdit) => {
    btnEdit.addEventListener('click', (e) => {
        let id;})

        content_id.forEach((ids) => {
            console.log(ids);
        });
    });
}
            //btnEdit.forEach((btn, index) => {
            //     btn.addEventListener('click', () => {
            //         editExpense(index);
            //     });
            // });


// ===============Budget Function===============
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
        total = itemList.reduce((acc, curr) => { acc += curr.amount;
            return parseFloat(acc).toFixed(2);
         }, 0);
    }
    expensesCardEl.textContent = total;
    console.log(total);
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
