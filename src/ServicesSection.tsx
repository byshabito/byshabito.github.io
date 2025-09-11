import React, { useState } from "react";
import { Code2, ScrollText } from "lucide-react";

export type ServiceConfig = {
  title: string;
  description?: string;
  includes?: string[];
  /** Starting price in platform tokens */
  priceTokens: number | string;
  /** Starting price in USD */
  priceUSD: number | string;
};

export type ServicesSectionProps = {
  appService?: ServiceConfig;
  bioService?: ServiceConfig;
  /** Where the CTA points, typically your Contact section anchor */
  contactHref?: string;
  /** Customize the CTA label */
  ctaLabel?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

function formatNumber(n: number | string) {
  if (typeof n === "string") return n;
  try {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
  } catch {
    return String(n);
  }
}

type PriceMode = "tokens" | "usd";

export default function ServicesSection({
  contactHref = "#contact",
  ctaLabel = "Contact me",
  title = "Services",
  subtitle = "I offer two custom services to make you stand out.",
  appService = {
    title: "Custom Chaturbate App",
    description: "Tailored features for your stream and needs.",
    includes: [
      "Tip menu, goals, games, etc",
      "Utilities tailored to you",
      "Add-ons: OBS overlays",
    ],
    priceTokens: 1000,
    priceUSD: 50,
  },
  bioService = {
    title: "Custom Bio Design",
    description: "Unique design that conveys you style.",
    includes: [
      "Unique, personalized design",
      "Clean, mobile-friendly and reponsive design",
      "Pinned links to socials and other sites",
    ],
    priceTokens: 750,
    priceUSD: 35,
  },
  className = "",
}: ServicesSectionProps) {
  const cards = [
    {
      icon: Code2,
      ...appService,
    },
    {
      icon: ScrollText,
      ...bioService,
    },
  ];

  // Per-card price mode store (defaults to 'tokens')
  const [priceModes, setPriceModes] = useState<Record<number, PriceMode>>({});
  const modeFor = (i: number): PriceMode => priceModes[i] ?? "tokens";
  const toggleMode = (i: number) =>
    setPriceModes((prev) => ({ ...prev, [i]: modeFor(i) === "tokens" ? "usd" : "tokens" }));

  return (
    <section id="services" className={`w-full ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">{title}</h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">{subtitle}</p>
        )}

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {cards.map((card, idx) => {
            const Icon = card.icon as React.ComponentType<{ className?: string }>;
            const priceTokens = formatNumber(card.priceTokens);
            const priceUSD = formatNumber(card.priceUSD);
            const mode = modeFor(idx);

            return (
              
              
              <article
                key={idx}
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] hover:border-pink-300 dark:hover:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500"
              >
                {/** ---------- PRICE CHIP REUSABLE ---------- */}
                {(() => {
                  const Chip = ({ className = "", compact = false }: { className?: string; compact?: boolean }) => (
                    <button
                      type="button"
                      onClick={() => toggleMode(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleMode(idx); }
                      }}
                      title="Click to toggle price"
                      aria-label="Toggle starting price between tokens and USD"
                      aria-pressed={mode === "usd"}
                      className={[
                        "inline-flex items-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors",
                        "border-pink-300 dark:border-pink-500",
                        "bg-pink-50/90 dark:bg-pink-500/15",
                        "text-pink-800 dark:text-pink-100",
                        compact ? "px-2 py-0.5 text-[10px] rounded-md" : "px-2.5 py-1 text-[11px]",
                        className,
                      ].join(" ")}
                    >
                      {mode === "tokens"
                        ? <>From <span className="mx-1 font-semibold">{priceTokens}</span> tokens</>
                        : <>From <span className="mx-1 font-semibold">${priceUSD}</span></>}
                    </button>
                  );
                  return (
                    <>
                      {/** ---------- DESKTOP HEADER (Icon | Title | Price) ---------- */}
                      <div className="hidden sm:flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        {/* Title + spacer */}
                        <div className="flex-1 min-w-0">
                          <h3 className="leading-tight sm:leading-normal font-medium text-gray-900 dark:text-gray-100 truncate">{card.title}</h3>
                        </div>
                        {/* Price (right) */}
                        <Chip />
                      </div>

                      {/** ---------- MOBILE HEADER (two rows, only flex) ---------- */}
                                            <div className="sm:hidden flex items-center gap-1.5">
                        {/* Left: icon spanning the height of title + price */}
                        <div className="">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        {/* Right column: title (top) + price (below) */}
                        <div className="flex-1 flex flex-col gap-0">
                          <div className="flex">
                            <h3 className="flex-1 min-w-0 font-medium text-gray-900 dark:text-gray-100 truncate">
                              {card.title}
                            </h3>
                          </div>
                          <div className="mt-0">
                            <Chip compact className="w-fit" />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/** ---------- BODY (Description + Includes) ---------- */}
                <div className="mt-2 sm:mt-3 flex flex-col gap-2">
                  {card.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{card.description}</p>
                  )}

                  {card.includes && card.includes.length > 0 && (
                    <ul className="text-sm text-gray-800 dark:text-gray-100/90 space-y-1">
                      {card.includes.map((line, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="select-none text-pink-300 dark:text-pink-400/70">•</span>
                          <span className="min-w-0 flex-1">{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/** ---------- CTA ---------- */}
                <div className="mt-3">
                  <a
                    href={contactHref}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-medium min-h-[44px] text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 dark:from-pink-500 dark:via-rose-400 dark:to-orange-400 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
                    aria-label={`${title} – ${card.title}`}
                  >
                    {ctaLabel}
                  </a>
                </div>
              </article>
    

            );
          })}
        </div>
      </div>
    </section>
  );
}