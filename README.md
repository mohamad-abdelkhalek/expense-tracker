# Expense Tracker

This project is an expense tracker website built with JavaScript that allows users to manage their personal finances by adding, editing, deleting, and filtering transactions. It supports both income and expense transactions, allowing users to track their budget and view it in real-time.

## Features

- **Add Transactions**: Users can add both income and expense transactions, specifying the amount, type (income/expense), date, and notes.
- **Edit Transactions**: Existing transactions can be edited, allowing users to update the amount, type, date, and notes.
- **Delete Transactions**: Users can delete transactions they no longer need.
- **View Total Budget**: The total budget is dynamically calculated by summing all income and subtracting all expenses.
- **Filter Transactions**: Transactions can be filtered by type (income/expense), amount (min-max or max-min), and date range (start and end date).
- **Persistent Data**: Transactions are stored in the browser's local storage, meaning they persist even when the user reloads the page.

## How It Works

The website relies on JavaScript to manage transactions and update the user interface. It stores the transactions in the browser's local storage to ensure data is retained between sessions. When a user adds, edits, or deletes a transaction, the data is updated in local storage, and the displayed list of transactions is refreshed.

### Key JavaScript Functions

- **addTransaction**: Adds a new transaction or updates an existing one.
- **applyDropdownFilter**: Filters transactions based on the selected dropdown option (income, expense, amount, or date range).
- **displayTransaction**: Displays the list of transactions and updates the total budget.
- **updateLocalStorage**: Saves the transactions to local storage.
- **editTransaction**: Fills the form with existing transaction details for editing.
- **deleteTransaction**: Removes a transaction from the list.

## Technologies Used

- **HTML**: For the basic structure of the website.
- **CSS**: For styling the website and making it responsive.
- **JavaScript**: For managing transactions, updating the user interface, and handling user interactions.
- **LocalStorage**: For saving transaction data persistently in the user's browser.

## Usage

### Clone the repository
```bash
git clone https://github.com/mohamad-abdelkhalek/expense-tracker.git
cd expense-tracker

