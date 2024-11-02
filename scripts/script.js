// Variables to store transactions and total budget
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let totalBudget = 0;

const form = document.getElementById('form');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const dateInput = document.getElementById('date');
const notesInput = document.getElementById('notes');
const transactionsList = document.getElementById('transactions');
const totalBudgetDisplay = document.getElementById('total-budget');