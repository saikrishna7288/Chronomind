import axios from "axios";

export const generateContent = async (topic, mode) => {

  let systemPrompt = `
You are an expert teacher.
Always respond in plain text only.
Do NOT use markdown symbols like #, *, -, _, etc.
Do NOT use special characters.
Use simple English.
`;

  let userPrompt = "";

  if (mode === "story") {
    userPrompt = `
Explain the topic "${topic}" as:

1. A short summary (5–8 lines)
2. Then a detailed explanation in storytelling style
3. Use real life examples
4. Make it engaging like a teacher explaining in class
`;
  }

  if (mode === "chunks") {
    userPrompt = `
Explain the topic "${topic}" as:

1. A short summary (5–8 lines)
2. Then break into structured revision points
3. Use numbered points instead of symbols
4. Keep it crisp and exam-focused
`;
  }

  const response = await axios.post(
    "https://router.huggingface.co/v1/chat/completions",
    {
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};