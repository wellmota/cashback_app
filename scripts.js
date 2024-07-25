//Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

  console.log(newExpense)
}
