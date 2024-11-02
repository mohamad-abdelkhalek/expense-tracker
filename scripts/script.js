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

form.addEventListener('submit', addTransaction);

function addTransaction(event) {
    event.preventDefault();
    
    // Capture form data
    const transaction = {
        id: Date.now(),
        amount: parseFloat(amountInput.value),
        type: typeInput.value,
        date: dateInput.value,
        notes: notesInput.value
    };

    // Add transaction to list
    transactions.push(transaction);
    updateLocalStorage();
    displayTransaction();

    // Clear form
    form.reset();

}

function displayTransaction() {
    // Reset list and total
    transactionsList.innerHTML = '';
    totalBudget = 0;

    // Loop through transactions to display and calculate total budget
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add('transaction-item', transaction.type);
        listItem.innerHTML = `
            ${transaction.date} - ${transaction.notes || ''} - $${transaction.amount.toFixed(2)}
            <button onclick="deleteTransaction(${transaction.id})">X</button>
        `;
        transactionsList.appendChild(listItem);

        // Update total budget
        totalBudget += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    });

    // Display total budget
    totalBudgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    displayTransaction();
}

displayTransaction();