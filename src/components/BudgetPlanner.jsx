import { useState } from 'react';

export default function BudgetPlanner({ onSave = () => {}, budget = {} }) {
  const [income, setIncome] = useState(budget.income || '');
  // keep the JSON as editable text to avoid parse errors while typing
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
    } catch (e) {
      setError('Invalid JSON in category limits. Please fix the syntax.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="font-semibold mb-3">Budget Planner</h4>
      <div className="space-y-3">
        <input
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Monthly income"
          className="border p-2 rounded w-full"
        />
        <div className="text-sm text-gray-600">
          Category limits (JSON for demo)
        </div>
        <textarea
          value={limitsText}
          onChange={(e) => setLimitsText(e.target.value)}
          className="border p-2 rounded w-full font-mono"
          rows={6}
        />
        {error && <div className="text-sm text-red-500">{error}</div>}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-amber-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
