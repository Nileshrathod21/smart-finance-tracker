export default function ExpenseList({ items = [], onDelete = () => {} }) {
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h3 className="font-semibold mb-3">Recent Expenses</h3>
      <ul className="space-y-2">
        {items.length === 0 && (
          <li className="text-sm text-gray-500">No expenses yet</li>
        )}
        {items.map((it) => (
          <li
            key={it.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <div className="font-medium">
                {it.category} — ${it.amount}
              </div>
              <div className="text-xs text-gray-500">
                {it.note} • {it.date}
              </div>
            </div>
            <div>
              <button
                onClick={() => onDelete(it.id)}
                className="text-sm text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
