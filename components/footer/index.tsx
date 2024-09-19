export default function Footer() {
  return (
    <section>
      <div className="w-screen flex-col px-6 py-20 lg:flex lg:px-10 xl:px-24">
        <div className="lg:flex lg:flex-row lg:justify-between">
          <div>
            <p>AI Wallpaper</p>
            <p className="font-inter mt-4 max-w-[350px] text-base font-light text-gray-500">
              Generate beautiful wallpapers with AI.
            </p>
          </div>
        </div>
        <div className="mx-auto my-12 w-full border border-[#E4E4E7] lg:my-5"></div>
        <div>
          <p className="font-inter text-center text-sm text-gray-500 lg:mt-0">
            © Copyright 2024.{" "}
            <a
              href="https://aiwallpaper.shop"
              target="_blank"
              className="text-primary hidden md:inline-block"
            >
              aiwallpaper.shop
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
