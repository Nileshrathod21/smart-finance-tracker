import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ChartComponent from '../components/ChartComponent';
import BudgetPlanner from '../components/BudgetPlanner';
import AIInsights from '../components/AIInsights';
import { useState, useMemo } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [budget, setBudget] = useState({ income: 0, limits: {} });

  // Add new expense
  const add = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setItems([newItem, ...items]);
  };

  // Delete expense
  const del = (id) => setItems(items.filter((i) => i.id !== id));

  // --- Calculate spending by category ---
  const byCategory = useMemo(() => {
    return items.reduce((acc, i) => {
      const key = (i.category || '').toString().toLowerCase();
      const amt = Number(i.amount) || 0;
      acc[key] = (acc[key] || 0) + amt;
      return acc;
    }, {});
  }, [items]);

  // --- Build data for chart ---
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

  // --- Total spent and remaining balance ---
  const totalSpent = items.reduce((sum, i) => sum + i.amount, 0);
  const remainingBudget = budget.income - totalSpent;

  // --- Category-based balance check ---
  const categoryBalance = Object.keys(budget.limits || {}).map((cat) => {
    const spent = byCategory[cat] || 0;
    const limit = budget.limits[cat];
    return {
      category: cat,
      limit,
      spent,
      remaining: limit - spent,
      over: spent > limit,
    };
  });

  const summary = JSON.stringify(byCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="app-container">
        <Navbar />

        <main className="max-w-7xl mx-auto p-4 grid gap-6 md:grid-cols-3">
          {/* Left Side - Input Section */}
          <section className="md:col-span-1 space-y-4">
            <ExpenseForm onAdd={add} />
            <BudgetPlanner budget={budget} onSave={(b) => setBudget(b)} />

            {/* Saved Budget Card */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
              <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                💰 Budget Summary
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total Budget: ₹{budget.income || 0}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total Spent: ₹{totalSpent}
              </p>
              <p
                className={`text-sm font-semibold ${
                  remainingBudget < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                Remaining Balance: ₹{remainingBudget}
              </p>

              <hr className="my-3 border-gray-300 dark:border-gray-700" />

              {/* Category Breakdown */}
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {categoryBalance.map((c) => (
                  <div
                    key={c.category}
                    className={`flex justify-between items-center p-2 rounded-md ${
                      c.over
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-green-100 dark:bg-green-900/20'
                    }`}
                  >
                    <span className="capitalize">{c.category}</span>
                    <span>
                      ₹{c.spent} / ₹{c.limit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Side - Charts, List, AI */}
          <section className="md:col-span-2 space-y-4">
            <ChartComponent byCategory={byCategory} trend={trend} />
            <ExpenseList items={items} onDelete={del} />
            <AIInsights summary={summary} />
          </section>
        </main>
      </div>
    </div>
  );
}
