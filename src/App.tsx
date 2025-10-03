import { Mail } from "lucide-react";
import SupportSection from "./SupportSection";
import ContactSection from "./ContactSection";
import CBAppsGallery, { type CBAppItem } from "./CBAppsGallery";
import CBBiosGallery, { type CBBioItem } from "./CBBiosGallery";
//import ToolsGallery, { type ToolItem } from "./ToolsGallery";
import ServicesSection from "./ServicesSection";
import { 
  Chaturbate, 
  GitHub, 
  Instagram, 
  Nostr, 
  Threads, 
  X 
} from "./Icons";

export default function ShabitoLanding() {
  const apps: CBAppItem[] = [
    {
      name: "ShowMoji",
      logoUrl: "/assets/apps/showmoji.svg",
      description: "Clear status emojis and smart hashtag rotation in your subject line.",
      tag: "Free",
      href: "https://chaturbate.com/v2apps/apps/57d31a05-showmoji",
    },
    {
      name: "FollowMeter",
      logoUrl: "/assets/apps/followmeter.svg",
      description: "Live follower tracker and notifier.",
      tag: "Free",
      href: "https://chaturbate.com/v2apps/apps/4fc060e7-followmeter",
    },
    {
      name: "Menuless",
      logoUrl: "/assets/apps/menuless.svg",
      description: "No menu notifier.",
      tag: "Free",
      href: "https://chaturbate.com/v2apps/apps/3341b550-menuless",
    },
  ];
  const bios: CBBioItem[] = [
    {
      name: "Violeta Rain",
      previewUrl: "/assets/bios/violetarainn.webp",
      tag: "Custom",
      themeColor: "#fe4e27",
      href: "https://chaturbate.com/violetarainn/",
    },
    {
      name: "Ema Delacroix",
      previewUrl: "/assets/bios/emadelacroix.webp",
      tag: "Custom",
      themeColor: "#f01818",
      href: "https://chaturbate.com/emadelacroix/",
    },
    {
      name: "Lilith Nocturne",
      previewUrl: "/assets/bios/lilith_nocturne.webp",
      tag: "Custom",
      themeColor: "#5e00ff",
      href: "https://chaturbate.com/lilith_nocturne/",
    },
  ];
  /*
  const tools: ToolItem[] = [
    {
      name: "CamKeeper",
      logoUrl: "",
      description:
        "Power bookmarks for cam rooms: quick access, tags, notes, and power-user filters beyond native browser bookmarks.",
      href: "",
      repoUrl: "https://github.com/byshabito/camkeeper",
    },
    {
      name: "RoomPulse",
      description:
        "Local-first analytics for a Chaturbate room with real-time tracking and easy CSV export.",
      href: "",
      repoUrl: "https://github.com/byshabito/roompulse",
    },
    {
      name: "BioCraft",
      description:
        "Ready-to-use bios, premium templates, and an updater tool so models can refresh links and text quickly.",
    },
    {
      name: "CB Kit",
      description:
        " A modular and lightweight toolkit for building Chaturbate apps with ease. ",
      href: "",
      repoUrl: "https://github.com/byshabito/cbkit",
    },
  ];
  */

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100 selection:bg-pink-500/20 selection:text-white antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-pink-100/50 dark:border-pink-900/30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 dark:bg-gray-900/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            className="group rounded-md outline-none focus:ring-2 focus:ring-pink-500"
          >
            <div className="flex items-center gap-2">
              <img
                src="assets/shabito.jpg"
                alt="Shabito"
                className="h-7 w-7 rounded-2xl bg-gray-900 text-white ring-1 ring-transparent transition-all duration-200 group-hover:ring-pink-300/70 dark:group-hover:ring-pink-500/40"
              />
              <span className="font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                Shabito
              </span>
            </div>
          </a>

          {/* Links */}
          <nav className="hidden sm:flex items-center gap-5 text-sm">
            {[
              { href: "#services", label: "Services" },
              { href: "#apps", label: "Apps" },
              { href: "#bios", label: "Bios" },
              /*{ href: "#tools", label: "Tools" },*/
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200 rounded-md outline-none focus:ring-2 focus:ring-pink-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center rounded-xl px-3 py-1.5 text-sm text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
          >
            Contact
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden isolate">
        {/* base gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0
                     [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
                     bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(236,72,153,0.20),transparent_60%),radial-gradient(900px_500px_at_-10%_110%,rgba(249,115,22,0.18),transparent_60%)] 
                     dark:bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(236,72,153,0.14),transparent_60%),radial-gradient(900px_500px_at_-10%_110%,rgba(249,115,22,0.14),transparent_60%)]"
        />
        {/* faint grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.10] dark:opacity-[0.08]
                     [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]
                     [background-image:linear-gradient(to_right,rgba(236,72,153,0.20)_1px,transparent_1px),
                                        linear-gradient(to_bottom,rgba(249,115,22,0.18)_1px,transparent_1px)]
                     [background-size:24px_24px]"
        />

        <div className="mx-auto w-full px-4 py-16 sm:py-24 relative z-10 flex flex-col items-center text-center">
          <div className="max-w-3xl flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 dark:from-pink-400 dark:via-rose-400 dark:to-orange-300">
              Apps, Bios and Tools for Chaturbate
            </h1>

            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              I create apps, biographies and tools that helps you stand out and
              grow on Chaturbate.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Primary CTA – gradient + motion */}
              <a
                href="#contact"
                className="inline-flex items-center rounded-2xl px-5 py-2.5 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
              >
                Get in touch
              </a>

              {/* Secondary CTA – pink outline/tint */}
              <a
                href="#apps"
                className="inline-flex items-center rounded-2xl border border-pink-300 dark:border-pink-500 px-5 py-2.5 text-pink-800 dark:text-pink-100 bg-pink-50/70 dark:bg-pink-500/10 hover:bg-pink-100/80 dark:hover:bg-pink-500/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                See my work
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection className="pt-16" />

      <CBAppsGallery
        className="pt-16"
        title="Chaturbate Apps"
        subtitle="Collection of apps I've built for CB."
        apps={apps}
      />

      <CBBiosGallery
        className="pt-16"
        title="Chaturbate Bios"
        subtitle="Browse a selection of bios I've designed."
        bios={bios}
      />

      {/* 
      <ToolsGallery
        className="pt-16"
        title="More Tools"
        subtitle="A few utilities and extensions I built."
        tools={tools}
        contactEmail="tools@shabito.net"
      />
      */}

      <ContactSection
        className="pt-16"
        title="Work with me"
        subtitle="Do you like the apps or bios and want your own one? Get in touch and let's built yours."
        email="hello@shabito.net"
        xHandle="byshabito"
        instagramHandle="by_shabito"
      />

      <SupportSection
        className="pt-16"
        chaturbateUsername="shabito"
        buyMeACoffeeUsername="shabito"
        lightning="lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhx6rpvf5hgmc5nxh8w"
        onchainAddress="bc1qe5zla3dvldndd36rseq47kdgl65xh7q6f0v64h"
      />

      {/* Footer */}
      <footer className="mt-8 border-t border-pink-100/50 dark:border-pink-900/30 supports-[backdrop-filter]:bg-white/70 bg-white/80 dark:bg-gray-900/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Shabito. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:hello@shabito.net"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Email"
              title="Email"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>

            <a
              href="https://x.com/byshabito"
              target="_blank"
              rel="noreferrer noopener"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="X"
              title="X"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300" />
              <span className="sr-only">X</span>
            </a>

            <a
              href="https://instagram.com/by_shabito"
              target="_blank"
              rel="noreferrer noopener"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300" />
              <span className="sr-only">Instagram</span>
            </a>

            <a
              href="https://threads.com/by_shabito"
              target="_blank"
              rel="noreferrer noopener"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Threads"
              title="Threads"
            >
              <Threads className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300" />
              <span className="sr-only">Threads</span>
            </a>

            <a
              href="https://chaturbate.com/shabito"
              target="_blank"
              rel="noreferrer noopener"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Chaturbate"
              title="Chaturbate"
            >
              <Chaturbate className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300" />
              <span className="sr-only">Chaturbate</span>
            </a>

            <a
              href="https://nostr.com/shabito@shabito.net"
              target="_blank"
              rel="noreferrer noopener"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Nostr"
              title="Nostr"
            >
              <Nostr className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300" />
              <span className="sr-only">Nostr</span>
            </a>

            <a
              href="https://github.com/byshabito"
              target="_blank"
              rel="noreferrer noopener"
              className="p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHub className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-300" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
