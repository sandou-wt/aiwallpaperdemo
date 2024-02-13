import Header from "@/components/header";
import Footer from "@/components/footer";
import Wallpapers from "@/components/wallpapers";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Wallpapers />
      <Footer />
    </div>
  );
}
