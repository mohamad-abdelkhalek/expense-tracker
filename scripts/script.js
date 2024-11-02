// Variables to store transactions and total budget
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let totalBudget = 0;

let editTransactionId = null; // To track if we are editing a transaction

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
        id: editTransactionId || Date.now(),
        amount: parseFloat(amountInput.value),
        type: typeInput.value,
        date: dateInput.value,
        notes: notesInput.value
    };

    if (editTransactionId) {
        // Edit existing transaction
        transactions = transactions.map(t => (t.id === editTransactionId ? transaction : t));
        editTransactionId = null; // Reset after editing
    } else {
        // Add new transaction
        transactions.push(transaction);
    }

    // Add transaction to list
    // transactions.push(transaction);
    updateLocalStorage();
    displayTransaction();

    // Clear form
    form.reset();

}

function displayTransaction() {
    transactionsList.innerHTML = '';
    totalBudget = 0;

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add('transaction-item', transaction.type);
        listItem.innerHTML = `
            ${transaction.date} - ${transaction.notes || ''} - $${transaction.amount.toFixed(2)}
            <div>
                <button onclick="editTransaction(${transaction.id})" class="icon-button">
                    <i class="fas fa-pen"></i>
                </button>
                <button onclick="deleteTransaction(${transaction.id})" class="icon-button">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        transactionsList.appendChild(listItem);

        totalBudget += transaction.type === 'income' ? transaction.amount : -transaction.amount;
    });

    totalBudgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
}


function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Populate the form with transaction data
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    dateInput.value = transaction.date;
    notesInput.value = transaction.notes;

    // Set the transaction ID to indicate editing mode
    editTransactionId = id;
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    displayTransaction();
}

displayTransaction();