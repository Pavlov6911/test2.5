const OPENROUTER_API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generateAIResponse(prompt: string) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://rmhub.com',
        'X-Title': 'RMHub Mods'
      },
      body: JSON.stringify({
        model: 'google/gemini-pro',
        messages: [
          {
            role: 'system',
            content: 'You are RMHub AI, an expert in FiveM mods and gaming. Help users find, understand, and work with mods.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Response Error:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}
