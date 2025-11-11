import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ChartComponent from '../components/ChartComponent';
import BudgetPlanner from '../components/BudgetPlanner';
import AIInsights from '../components/AIInsights';
import { useState } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState({ income: '', limits: {} });

  const add = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setItems([newItem, ...items]);
  };

  const del = (id) => setItems(items.filter((i) => i.id !== id));

  // build a quick summary for charts / AI
  const byCategory = items.reduce((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + i.amount;
    return acc;
  }, {});
  const trend = {
    labels: items
      .slice()
      .reverse()
      .map((i) => i.date),
    data: items
      .slice()
      .reverse()
      .map((i) => i.amount),
  };
  const summary = JSON.stringify(byCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 grid gap-4 md:grid-cols-3">
        <section className="md:col-span-1 space-y-4">
          <ExpenseForm onAdd={add} />
          <BudgetPlanner budget={budget} onSave={(b) => setBudget(b)} />
          <div className="bg-white p-3 rounded shadow-sm">
            <h5 className="font-semibold">Saved Budget</h5>
            <div className="text-sm text-gray-700">Income: {budget.income}</div>
            <pre className="text-xs mt-2 p-2 bg-gray-50 rounded">
              {JSON.stringify(budget.limits, null, 2)}
            </pre>
          </div>
        </section>
        <section className="md:col-span-2 space-y-4">
          <ChartComponent byCategory={byCategory} trend={trend} />
          <ExpenseList items={items} onDelete={del} />
          <AIInsights summary={summary} />
        </section>
      </main>
    </div>
  );
}
