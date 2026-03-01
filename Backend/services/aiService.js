import axios from "axios";

export const generateContent = async (content) => {

  const wordCount = content.trim().split(/\s+/).length;

  let prompt = "";

  // If user pasted large content → Summarize
  if (wordCount > 100) {

    prompt = `
You are an expert teacher.

Summarize the following content clearly.

1. Give a short summary in 6-8 lines.
2. Then list important key points.
3. Use simple English.
4. Do not use special symbols.
5. Start directly with the content.

Content:
${content}
`;

  } else {

    // If user entered keyword → Explain

    prompt = `
You are an expert teacher.

Explain the topic "${content}" clearly.

1. Give a short introduction.
2. Then explain in detail.
3. Use real-life examples.
4. Use simple English.
5. Minimum 250 words.
6. Do not use special symbols.
7. Start directly with the content.

Topic:
${content}
`;

  }

  const response = await axios.post(
    "https://router.huggingface.co/v1/chat/completions",
    {
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1200
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );
  const aiText = response.data.choices[0].message.content;
  return aiText;
  //return response.data.choices[0].message.content;
};