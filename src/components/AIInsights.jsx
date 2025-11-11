import { useEffect, useState } from 'react';
import { getAISuggestions } from '../hooks/useFetchAI';

export default function AIInsights({ summary }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    let mounted = true;
    async function fetchAI() {
      if (!summary) return;
      setLoading(true);
      try {
        const res = await getAISuggestions(summary);
        if (mounted) setText(res || 'No suggestions');
      } catch (e) {
        if (mounted) setText('AI unavailable — configure API key');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchAI();
    return () => {
      mounted = false;
    };
  }, [summary]);

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="font-semibold mb-3">AI Insights</h4>
      {loading ? (
        <div className="text-sm text-gray-500">Analyzing...</div>
      ) : (
        <div className="text-sm whitespace-pre-wrap">{text}</div>
      )}
    </div>
  );
}
