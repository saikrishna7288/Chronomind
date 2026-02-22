import Conversion from "../models/Conversion.js";
import { generateContent } from "../services/aiService.js";

export const convertText = async (req, res) => {
  try {
    const { topic, mode } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // 🔥 Generate AI content
    const generatedText = await generateContent(topic, mode);

    // Save to DB
    const conversion = await Conversion.create({
      user: req.user._id,
      topic,
      mode,
      generatedText,
    });

    res.status(200).json(conversion);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};