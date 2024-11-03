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
        transactions.push(transaction);
    }

    // Add transaction to list
    // transactions.push(transaction);
    updateLocalStorage();
    displayTransaction();

    form.reset();

}

function applyDropdownFilter() {
    const filterOption = document.getElementById('filter-dropdown').value;
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    let filteredTransactions = [...transactions];

    // Filter by type or amount based on dropdown selection
    switch (filterOption) {
        case "income":
            filteredTransactions = filteredTransactions.filter(transaction => transaction.type === "income");
            break;
        case "expense":
            filteredTransactions = filteredTransactions.filter(transaction => transaction.type === "expense");
            break;
        case "min-max":
            filteredTransactions.sort((a, b) => a.amount - b.amount);
            break;
        case "max-min":
            filteredTransactions.sort((a, b) => b.amount - a.amount);
            break;
        default:
            break;
    }

    // Filter by date range if both dates are provided
    if (!isNaN(startDate) && !isNaN(endDate)) {
        filteredTransactions = filteredTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    displayTransaction(filteredTransactions);
}


function displayTransaction(transactionList = transactions) {
    transactionsList.innerHTML = '';
    totalBudget = 0;

    transactionList.forEach(transaction => {
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

    // occupy the form with transaction data to edit it
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    dateInput.value = transaction.date;
    notesInput.value = transaction.notes;

    editTransactionId = id;
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    displayTransaction();
}

displayTransaction();