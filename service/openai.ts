import OpenAI from "openai";

export function getOpenAIClient(): OpenAI {
  const openai = new OpenAI({
    baseURL: "https://api.gptsapi.net/v1",
    apiKey: process.env["OPENAI_API_KEY"],
  });
  return openai;
}
