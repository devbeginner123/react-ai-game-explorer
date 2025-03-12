
const API_URL = "https://api.llama-api.com/chat/completions";
const API_KEY = import.meta.env.VITE_LLAMA_API_KEY;

export const generateGameRecommendation = async (prompt) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch LLaMA recommendation");
    }

    const data = await response.json();
    const recommendedText = data.choices[0]?.message?.content;

    return recommendedText;
  } catch (error) {
    console.error("AI Error:", error);
    return "Oops! AI is taking a nap 😴";
  }
};
