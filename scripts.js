//Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Load categories
const expenseList = document.querySelector("ul")

// Allow only numbers
amount.oninput = () => {
  // Remove any non-digit character
  let value = amount.value.replace(/\D/g, "")

  // Convert the value to number
  value = Number(value) / 100

  // Update the number to BRL currency
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  // Format the value to BRL currency
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

// Submit form
form.onsubmit = (event) => {
  // Prevent the form from submitting
  event.preventDefault()
  // Create a new expense object
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  // Add the new expense to the list
  expenseAdd(newExpense)
}

// Add new expense function
function expenseAdd(newExpense) {
  try {
    // Create a new list item
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Add the expense item to the list
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)

    // Add the expense icon to the list
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Create expense div
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Add the expense category
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Add the expense name
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Add name and category to expense div
    expenseInfo.append(expenseName, expenseCategory)

    // Add the expense icon to the list
    expenseItem.append(expenseIcon, expenseInfo)

    // Create a new div element
    expenseList.append(expenseItem)
  } catch (error) {
    alert("Erro ao adicionar despesa")
    console.log(error)
  }
}
