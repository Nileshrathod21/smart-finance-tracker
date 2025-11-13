import { useState } from 'react';

export default function BudgetPlanner({ onSave = () => {}, budget = {} }) {
  const [income, setIncome] = useState(budget.income || '');
  const [limitsText, setLimitsText] = useState(() => {
    try {
      return JSON.stringify(budget.limits || {}, null, 2);
    } catch {
      return '{}';
    }
  });
  const [error, setError] = useState('');

  const handleSave = () => {
    try {
      const parsed = limitsText.trim() ? JSON.parse(limitsText) : {};
      setError('');
      onSave({ income: Number(income) || 0, limits: parsed });
    } catch {
      setError('⚠️ Invalid JSON syntax — please fix it before saving.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto transition-all">
      <h4 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
        🧮 Budget Planner
      </h4>

      <div className="space-y-4">
        {/* Monthly Income */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1 text-sm">
            Monthly Budget / Income
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="e.g. 10000"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2 rounded w-full focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
        </div>

        {/* JSON Input */}
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1 text-sm">
            Category Limits (JSON Format)
          </label>
          <textarea
            value={limitsText}
            onChange={(e) => setLimitsText(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2 rounded w-full font-mono text-sm resize-none focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Example: {'{ "food": 3000, "travel": 2000, "rent": 4000 }'}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-sm text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded">
            {error}
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all"
          >
            💾 Save Budget
          </button>
        </div>
      </div>
    </div>
  );
}
