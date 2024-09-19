//todo:读取数据库加载壁纸列表，取代img_url中的mock值“xxx”

import { getWallpapers } from "@/models/wallpaper";
import { Wallpaper } from "@/types/wallpaper";
import { Adamina } from "next/font/google";

export async function GET(req: Request) {
  const wallpapers = await getWallpapers(1, 50);

  return Response.json({
    code: 0,
    message: "ok",
    data: wallpapers,
  });
}
