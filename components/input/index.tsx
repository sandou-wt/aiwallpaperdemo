"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { Wallpaper } from "@/types/wallpaper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  setWallpapers: Dispatch<SetStateAction<Wallpaper[]>>;
}

export default function WallpaperGenerator({ setWallpapers }: Props) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null);

  const requestGenWallpaper = async function () {
    const params = {
      description: description,
    };

    setLoading(true); //开始请求时将加载状态设置为true

    const result = await fetch("/api/gen-wallpaper", {
      method: "POST",
      body: JSON.stringify(params),
    });

    const { data } = await result.json();

    setLoading(false); //请求结束后将加载状态重置为false

    if (data) {
      console.log("new wallpaper:", data);

      const wallpaper: Wallpaper = data;
      setWallpaper(wallpaper);

      if (wallpaper) {
        setWallpapers((wallpapers: Wallpaper[]) => [wallpaper, ...wallpapers]);
      }
    }
  };

  const handleSubmit = async function () {
    // if (!description) {
    //   toast.error("invalid image description");
    //   inputRef.current?.focus();
    //   return;
    // }

    // requestGenWallpaper();
    if (!description) {
      alert("invalid image description");
      return;
    }

    await requestGenWallpaper();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={() => {
          return false;
        }}
      >
        <Input
          type="text"
          placeholder="Wallpaper description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          ref={inputRef}
        />
        <Button type="button" disabled={loading} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>
    </div>
  );
}
