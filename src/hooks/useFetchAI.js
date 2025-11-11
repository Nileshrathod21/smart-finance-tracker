import axios from 'axios';

/**
 * getAISuggestions(summary)
 * summary: string (e.g. JSON or short text summary of expenses)
 * returns: AI text reply
 * Note: For safety, in production call your own backend to hold the OpenAI key server-side.
 */
export const getAISuggestions = async (summary) => {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key)
    throw new Error(
      'OpenAI API key not configured. Set VITE_OPENAI_API_KEY in .env'
    );

  const payload = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `Analyze my expenses and suggest actionable tips. Summary: ${summary}`,
      },
    ],
    max_tokens: 400,
  };

  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    payload,
    { headers: { Authorization: `Bearer ${key}` } }
  );
  return res.data?.choices?.[0]?.message?.content ?? null;
};
