const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseDate = document.getElementById('espense-date');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('expense-table-body');
const totalAmount = document.getElementById('total-amount');
const foodExpense = document.getElementById('food-expense');
const foodTotal = document.getElementById('food-total');
const travelExpense = document.getElementById('travel-expense');
const travelTotal = document.getElementById('travel-total');
const entertainmentExpense = document.getElementById('entertainment-expense');
const entertainmentTotal = document.getElementById('entertainment-total');
const otherExpense = document.getElementById('other-expense');
const otherTotal = document.getElementById('other-total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let allAmount = 0;

expenses.forEach(expense => {
    addExpenseToTable(expense);
});

let foodAmount = 0;
let travelAmount = 0;
let entertainmentAmount = 0;
let otherAmount = 0;

addBtn.addEventListener('click', function(){
    const expensename = expenseName.value;
    const expenseamount = Number(expenseAmount.value);
    const expensecategory = expenseCategory.value;
    const expensedate = expenseDate.value;

    if(expensename == "" || expenseamount <= 0 || expensecategory == ""){
        alert(`Invalid input`);
        return;
    }
    else{
        const newExpense = { expensename, expenseamount, expensecategory, expensedate };

        expenses.push(newExpense);
        allAmount += expenseamount;
        totalAmount.textContent = allAmount;

        const newRow = document.createElement('tr');

        newRow.innerHTML = `
        <td class="category">${expensecategory}</td>
        <td class="name">${expensename}</td>
        <td class="date">${expensedate}</td>
        <td class="amount">${expenseamount}</td>
        <td class="delete-btn"><button id="delete-btn">Delete</button></td>
        <td class="edit-btn"><button id="edit-btn">Edit</button></td>

        `;

        tableBody.appendChild(newRow);

        expenseName.value = '';
        expenseAmount.value = '';
        expenseCategory.value = '';
        expenseDate.value = '';

        saveExpensesToLocalStorage();

        
        if(expensecategory === "food"){
            foodAmount += expenseamount;
            foodTotal.textContent = `Total: ${foodAmount}`;
        }
        else if(expensecategory === "travel"){
            travelAmount += expenseamount;
            travelTotal.textContent = `Total: ${travelAmount}`;
        }
        else if(expensecategory === "entertainment"){
            entertainmentAmount += expenseamount;
            entertainmentTotal.textContent = `Total: ${entertainmentAmount}`;
        }
        else{
            otherAmount += expenseamount;
            otherTotal.textContent = `Total: ${otherAmount}`;
        }

        newRow.querySelector('.delete-btn').addEventListener('click', function(){
            deleteExpense(newRow, expenseamount, expensecategory);
        });
    
        newRow.querySelector('.edit-btn').addEventListener('click', function(){
            editExpense(newExpense, newRow);
        });
    
    }

    


});

function deleteExpense(row, amount, category){
    tableBody.removeChild(row);
    allAmount -= amount;
    totalAmount.textContent = allAmount;

    if(category === "food"){
        foodAmount -= amount;
        foodTotal.textContent = `Total: ${foodAmount}`;
    }
    else if(category === "travel"){
        travelAmount -= amount;
        travelTotal.textContent = `Total: ${travelAmount}`;
    }
    else if(category === "entertainment"){
        entertainmentAmount -= amount;
        entertainmentTotal.textContent = `Total: ${entertainmentAmount}`;
    }
    else{
        otherAmount -= amount;
        otherTotal.textContent = `Total: ${otherAmount}`;
    }

    expenses.splice(expenses.indexOf(row), 1);
    saveExpensesToLocalStorage();
}

function editExpense(expense, row){
    expenseName.value = expense.expensename;
    expenseAmount.value = expense.expenseamount;
    expenseCategory.value = expense.expensecategory;
    expenseDate.value = expense.expensedate;

    deleteExpense(row, expense.expenseamount, expense.expensecategory);
}

function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}