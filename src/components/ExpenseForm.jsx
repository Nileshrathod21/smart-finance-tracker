import { useState } from 'react';
import { format } from 'date-fns';

export default function ExpenseForm({ onAdd }) {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const submit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd({ category, amount: Number(amount), note, date });
    setAmount('');
    setNote('');
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded shadow-sm space-y-3"
    >
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-1/2"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Rent</option>
          <option>Other</option>
        </select>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount"
          className="border p-2 rounded w-1/2"
        />
      </div>
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Note (optional)"
        className="w-full border p-2 rounded"
      />
      <div className="flex items-center justify-between">
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="border p-2 rounded"
        />
        <button className="px-4 py-2 bg-amber-500 text-white rounded">
          Add Expense
        </button>
      </div>
    </form>
  );
}
