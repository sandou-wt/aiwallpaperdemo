import { getOpenAIClient } from "@/service/openai";
import { url } from "inspector";

export async function POST(req: Request) {
  const { description } = await req.json();

  const client = getOpenAIClient();

  const result = await client.images.generate({
    prompt: `genarate a desktop wallpaper about: ${description}`,
    model: "dall-e-3",
    n: 1,
    quality: "hd",
    response_format: "url",
    size: "1792x1024",
    style: "natural",
  });

  console.log("genarate wallpaper result: ", result);

  return Response.json({
    code: 0,
    message: "ok",
    data: {
      img_url: "http://xxxxx.com/xxx.png",
    },
  });
}
