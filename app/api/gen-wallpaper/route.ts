import { downloadAndUploadImage } from "@/lib/s3";
import { insertWallpaper } from "@/models/wallpaper";
import { getOpenAIClient } from "@/service/openai";
import { Wallpaper } from "@/types/wallpaper";
import { url } from "inspector";
import { ImageGenerateParams } from "openai/resources/images.mjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { insertUser } from "@/models/user";
import { User } from "@/types/user";
import { respData, respErr } from "@/lib/resp";
import { saveUser } from "@/service/user";
export async function POST(req: Request) {
  const { description } = await req.json();

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }

  const user_email = user.emailAddresses[0].emailAddress;

  const nickname = user.firstName;
  const avatarUrl = user.imageUrl;
  const userInfo: User = {
    email: user_email,
    nickname: nickname || "",
    avatar_url: avatarUrl,
  };

  await saveUser(userInfo);

  const client = getOpenAIClient();
  const img_size = "1792x1024";
  const llm_name = "dall-e-3";
  const llm_params: ImageGenerateParams = {
    prompt: `genarate a desktop wallpaper about: ${description}`,
    model: llm_name,
    n: 1,
    quality: "hd",
    response_format: "url",
    size: img_size,
    style: "vivid",
  };
  const result = await client.images.generate(llm_params);

  console.log("genarate wallpaper result: ", result);

  const raw_img_url = result.data[0].url; // openai dall-e img url
  if (!raw_img_url) {
    return Response.json({
      code: -1,
      message: "generate wallpaper failed",
    });
  }

  const img_name = encodeURIComponent(description);
  const s3_img = await downloadAndUploadImage(
    raw_img_url,
    process.env.AWS_BUCKET || "aiwallpaper-sandou-demo",
    `wallpapers/${img_name}.png`
  );
  const img_url = s3_img.Location;
  console.log("s3_url:", img_url);

  // const user_email = "sandouer@gmail.com"; //写死一个邮箱
  const created_at = new Date().toISOString();
  const user_avatar =
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yYkxPUzRwVWVQbFJyekZ4TEhrYU9rZHU1U0oifQ";

  const user_nickname = "Admin";
  const wallpaper: Wallpaper = {
    user_email: user_email,
    img_description: description,
    img_size: img_size,
    img_url: img_url,
    llm_name: llm_name,
    llm_params: JSON.stringify(llm_params),
    created_at: created_at,
    user_avatar: user_avatar,
    user_nickname: user_nickname,
  };
  await insertWallpaper(wallpaper);
  console.log("Data saved successfully.");

  return Response.json({
    code: 0,
    message: "ok",
    data: wallpaper,
  });
}
