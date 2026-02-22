import OpenAI from "openai";

export const generateContent = async (topic, mode) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt =
    mode === "story"
      ? `Explain ${topic} as an engaging story for students.`
      : `Break ${topic} into short, clear revision chunks with headings and bullet points.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an educational content creator." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};