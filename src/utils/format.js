const formatCurrency = (currency) => {
  const formatted = currency.toLocalString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
  return formatted
}

export {
  formatCurrency
}
