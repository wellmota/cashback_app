//Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Load categories
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

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

    // add the expense amount
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`

    //Add remove icon

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "Remover despesa")

    // Add the expense icon to the list
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Create a new div element
    expenseList.append(expenseItem)

    // Clear the form
    formClear()
    // Update Totals
    updateTotals()
  } catch (error) {
    alert("Erro ao adicionar despesa")
    console.log(error)
  }
}

// Update totals

function updateTotals() {
  try {
    const items = expenseList.children

    // Calculate total of items
    expenseQuantity.textContent = `${items.length}
    ${items.length > 1 ? "despesas" : "despesa"}
    `

    // Calculate total amount
    let total = 0

    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount")

      // Remove any non-digit character
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".")

      // Convert the value to number
      value = parseFloat(value)

      //Verify if value is a number
      if (isNaN(value)) {
        return alert("Erro ao calcular o total, o valor não é um número")
      }
      total += Number(value)
    }

    // Add span element to total
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Add total to expensesTotal formated text
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Clear the expenses content
    expensesTotal.innerHTML = ""

    // Add the symbol and total to expensesTotal
    expensesTotal.append(symbolBRL, total)

    // expensesTotal.textContent = formatCurrencyBRL(total)
  } catch (error) {
    alert("Não foi possível atualizar os totais")
    console.log(error)
  }
}

// Remove expense

expenseList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-icon")) {
    // get the parent element
    const item = event.target.closest(".expense")
    // remove the item
    item.remove()
  }

  // Update totals
  updateTotals()
})

function formClear() {
  expense.value = ""
  category.value = ""
  amount.value = ""
}
