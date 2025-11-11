import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function ChartComponent({ byCategory = {}, trend = {} }) {
  const pieData = {
    labels: Object.keys(byCategory),
    datasets: [
      {
        data: Object.values(byCategory),
        backgroundColor: [
          '#f59e0b',
          '#ef4444',
          '#3b82f6',
          '#10b981',
          '#8b5cf6',
        ],
      },
    ],
  };

  const lineData = {
    labels: trend.labels || [],
    datasets: [
      {
        label: 'Spending',
        data: trend.data || [],
        borderColor: '#ef4444',
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="font-semibold mb-3">Spending by Category</h4>
        <Pie data={pieData} />
      </div>
      <div className="bg-white p-4 rounded shadow-sm">
        <h4 className="font-semibold mb-3">Trend</h4>
        <Line data={lineData} />
      </div>
    </div>
  );
}
