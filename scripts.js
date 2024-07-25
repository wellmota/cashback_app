//Select form elements
const amount = document.getElementById("amount")

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
