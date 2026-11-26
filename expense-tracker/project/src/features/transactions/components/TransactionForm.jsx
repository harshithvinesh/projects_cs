import { useEffect, useState } from 'react'
import { createTransaction, updateTransaction } from '../../../api/index.js'
import { inputDateToIso, isoDateInput } from '../../../lib/dates.js'
import { rupeesToPaise } from '../../../lib/money.js'
import Button from '../../../components/ui/Button.jsx'
import Modal from '../../../components/ui/Modal.jsx'
import Toggle from '../../../components/ui/Toggle.jsx'
import './transactions.css'

const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Rent', 'Entertainment', 'Health', 'Education']
const incomeCategories = ['Salary', 'Freelance', 'Other']
const emptyForm = { title: '', amount: '', type: 'expense', category: 'Food', date: isoDateInput(), note: '' }

export default function TransactionForm({ open, transaction, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm); const [loading, setLoading] = useState(false); const [error, setError] = useState('')
  useEffect(() => { if (open) setForm(transaction ? { ...transaction, amount: `${Math.floor(transaction.amountPaise / 100)}.${String(transaction.amountPaise % 100).padStart(2, '0')}`, date: isoDateInput(new Date(transaction.date)) } : emptyForm) }, [open, transaction])
  const categories = form.type === 'income' ? incomeCategories : expenseCategories
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const changeType = (type) => setForm((current) => ({ ...current, type, category: type === 'income' ? 'Salary' : 'Food' }))
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); const payload = { title: form.title, amountPaise: rupeesToPaise(form.amount), type: form.type, category: form.category, date: inputDateToIso(form.date), ...(form.note ? { note: form.note } : {}) }; try { const saved = transaction ? await updateTransaction(transaction.id, payload) : await createTransaction(payload); onSaved(saved); onClose() } catch (caught) { setError(caught.error?.message || 'Could not save this transaction.') } finally { setLoading(false) } }
  return <Modal open={open} title={transaction ? 'Edit transaction' : 'Add transaction'} onClose={onClose}><form className="transaction-form" onSubmit={submit}><label className="form-label">Title<input className="form-input" value={form.title} onChange={update('title')} placeholder="e.g. Weekly groceries" required /></label><label className="form-label">Amount in rupees<div className="amount-input"><span>₹</span><input className="form-input" value={form.amount} onChange={update('amount')} placeholder="0.00" inputMode="decimal" required /></div></label><div className="form-label">Type<Toggle value={form.type} onChange={changeType} options={[{ value: 'expense', label: 'Expense' }, { value: 'income', label: 'Income' }]} /></div><div className="form-two"><label className="form-label">Category<select className="form-select" value={form.category} onChange={update('category')}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label className="form-label">Date<input className="form-input" type="date" value={form.date} onChange={update('date')} required /></label></div><label className="form-label">Note <span className="optional">Optional</span><textarea className="form-textarea" value={form.note} onChange={update('note')} placeholder="Add a little context" rows="3" /></label>{error && <p className="form-error">{error}</p>}<div className="form-actions"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit" loading={loading}>Save transaction</Button></div></form></Modal>
}
