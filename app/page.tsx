"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Wallpapers from "@/components/wallpapers";
import Image from "next/image";
import Hero from "@/components/hero";
import Input from "@/components/input";
import { useEffect, useState } from "react";
import { Wallpaper } from "@/types/wallpaper";

export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const fetchWallpapers = async function () {
    const result = await fetch("http://localhost:3000/api/get-wallpapers");
    const { data } = await result.json();

    if (data) {
      setWallpapers(data);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);
  return (
    <div className="md:mt-16">
      <Header />
      <Hero />
      <div className="mx-auto my-4 flex max-w-lg justify-center">
        <Input setWallpapers={setWallpapers} />
      </div>
      <div className="pt-0">
        <Wallpapers wallpapers={wallpapers} />
      </div>
      <Footer />
    </div>
  );
}
