import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-8 xl:px-20">
            <a href="/" className="text-xl font-medium flex items-center">
              <img
                src="https://aiwallpaper.shop/logo.png"
                className="w-10 h-10 rounded-full mr-3"
                alt="logo"
              />
              <span className="font-bold text-primary text-2xl">
                AI Wallpaper
              </span>
            </a>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3">
              <div className="hidden md:block mr-8">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            <a href="#" className="absolute right-5 lg:hidden"></a>
          </div>
        </nav>
      </div>
    </header>
  );
}
