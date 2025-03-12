const API_KEY = import.meta.env.VITE_LLAMA_API_KEY;
const MODEL_URL = "https://api.deepinfra.com/v1/inference/meta-llama/Meta-Llama-3-8B-Instruct";

export const generateGameRecommendation = async (prompt) => {
  try {
    const requestPrompt = `
      Recommend me only game titles separated by commas based on this preference:
      "${prompt}".
      Only return the game titles, no explanation, no numbering.
    `;

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        input: `<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n\n${requestPrompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
        stop: ["<|eot_id|>"]
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("AI Response:", data);

    if (!data || !data.results || data.results.length === 0) {
      throw new Error("Failed to fetch LLaMA recommendation");
    }

    const recommendation = data.results[0].generated_text.trim();

    const cleanRecommendation = recommendation
      .replace(/\n/g, "") 
      .replace(/\d+\.\s?/g, "") 
      .replace(/\s*,\s*/g, ","); 

    return cleanRecommendation;
  } catch (error) {
    console.error("AI Error:", error);
    return "Oops! AI is taking a nap 😴";
  }
};
