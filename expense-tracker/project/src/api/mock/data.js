const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Rent', 'Entertainment', 'Health', 'Education']
const incomeCategories = ['Salary', 'Freelance', 'Other']
const titles = {
  Food: ['Brunch at Greenhouse', 'Weekly groceries', 'Coffee & pastry', 'Dinner with friends'],
  Transport: ['Metro recharge', 'Cab to office', 'Fuel top-up', 'Airport ride'],
  Shopping: ['Home essentials', 'New sneakers', 'Books & stationery', 'Weekend market'],
  Bills: ['Electricity bill', 'Mobile plan', 'Internet subscription', 'Water bill'],
  Rent: ['Monthly rent', 'Parking space'],
  Entertainment: ['Cinema tickets', 'Concert night', 'Streaming subscription', 'Weekend getaway'],
  Health: ['Pharmacy', 'Yoga membership', 'Doctor appointment'],
  Education: ['Online course', 'Workshop ticket', 'Learning materials'],
  Salary: ['Monthly salary'], Freelance: ['Brand project', 'Consulting invoice'], Other: ['Cashback received', 'Gift received'],
}

function makeTransactions() {
  const result = []
  const now = new Date()
  for (let index = 0; index < 150; index += 1) {
    const monthOffset = index % 12
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthOffset, (index * 7) % 26 + 1, 8, 30))
    const type = index % 7 === 0 ? 'income' : 'expense'
    const categories = type === 'income' ? incomeCategories : expenseCategories
    const category = categories[index % categories.length]
    const base = type === 'income' ? 480000 + (index % 4) * 125000 : 8500 + (index % 8) * 5400
    const titleOptions = titles[category]
    result.push({
      id: `tx-${index + 1}`,
      title: titleOptions[index % titleOptions.length],
      amountPaise: base + (index % 5) * 1199,
      type,
      category,
      date: date.toISOString(),
      note: index % 5 === 0 ? 'Planned monthly expense' : undefined,
    })
  }
  return result.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const mockState = {
  transactions: makeTransactions(),
  user: { id: 'user-1', username: 'Aarav', email: 'aarav@example.com', name: 'Aarav Mehta', avatar: 'AM' },
}

export { expenseCategories, incomeCategories }
