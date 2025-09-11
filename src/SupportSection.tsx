import React, { useMemo, useState } from "react";
import { Bitcoin, Coffee, Check, ExternalLink, Zap, Coins } from "lucide-react";

export type SupportSectionProps = {
  /** Chaturbate username, used to build https://chaturbate.com/<username>/ */
  chaturbateUsername?: string;
  /** Full custom URL to your CB profile/room (overrides chaturbateUsername) */
  chaturbateUrl?: string;

  /** Buy Me a Coffee username, used to build https://buymeacoffee.com/<username> */
  buyMeACoffeeUsername?: string;
  /** Full custom URL to your BMaC page (overrides buyMeACoffeeUsername) */
  buyMeACoffeeUrl?: string;

  /** Lightning address (name@domain), LNURL (lnurl1...), or invoice (lnbc...) */
  lightning?: string;
  /** On-chain Bitcoin address (bc1..., 1..., 3...) */
  onchainAddress?: string;

  /** Optional heading text */
  title?: string;
  /** Optional className to style the wrapper */
  className?: string;
};

function buildCbUrl(username?: string, override?: string) {
  if (override) return override;
  if (!username) return undefined;
  return `https://chaturbate.com/${encodeURIComponent(username)}/`;
}

function buildBmacUrl(username?: string, override?: string) {
  if (override) return override;
  if (!username) return undefined;
  return `https://buymeacoffee.com/${encodeURIComponent(username)}`;
}

function ensureLightningUri(input?: string) {
  if (!input) return undefined;
  const s = input.trim();
  // Accept invoice (lnbc...), lnurl1..., or lightning address name@domain.
  if (s.startsWith("lightning:")) return s;
  return `lightning:${s}`;
}

function ensureBitcoinUri(addr?: string) {
  if (!addr) return undefined;
  const s = addr.trim();
  if (s.startsWith("bitcoin:")) return s;
  return `bitcoin:${s}`;
}

export default function SupportSection({
  chaturbateUsername,
  chaturbateUrl,
  buyMeACoffeeUsername,
  buyMeACoffeeUrl,
  lightning,
  onchainAddress,
  title = "Support my work",
  className = "",
}: SupportSectionProps) {
  const [btcMode, setBtcMode] = useState<"lightning" | "onchain">("lightning");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cbHref = useMemo(() => buildCbUrl(chaturbateUsername, chaturbateUrl), [chaturbateUsername, chaturbateUrl]);
  const bmacHref = useMemo(() => buildBmacUrl(buyMeACoffeeUsername, buyMeACoffeeUrl), [buyMeACoffeeUsername, buyMeACoffeeUrl]);

  const lightningUri = useMemo(() => ensureLightningUri(lightning), [lightning]);
  const onchainUri = useMemo(() => ensureBitcoinUri(onchainAddress), [onchainAddress]);

  function copy(text: string, key: string) {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1600);
    });
  }

  const showLightning = btcMode === "lightning";
  const activeValue = showLightning ? (lightning || "") : (onchainAddress || "");
  const activeUri = showLightning ? lightningUri : onchainUri;

  const handleCopy = () => copy(activeValue, btcMode + "-copy");
  const handleKeyCopy: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <section id="support" className={`w-full ${className}`}>
      <style>{`
        .shb-scrollhide { -ms-overflow-style: none; scrollbar-width: none; }
        .shb-scrollhide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">{title}</h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-5 sm:mb-6">
          Your support means a lot to me and helps me continue doing it.<br/>You can support me via Chaturbate tokens, Buy Me a Coffee, or Bitcoin.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Chaturbate */}
          <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] hover:border-pink-300 dark:hover:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300">
                <Coins className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Chaturbate Tokens</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Tip tokens on my Chaturbate room.
            </p>
            {cbHref ? (
              <a
                href={cbHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Visit my Chaturbate room (opens in new tab)"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[13px] min-h-[40px] text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <ExternalLink className="h-4 w-4" />
                Visit my room
              </a>
            ) : (
              <div className="text-xs text-amber-600 dark:text-amber-400">Set <code>chaturbateUsername</code> or <code>chaturbateUrl</code> prop.</div>
            )}
          </div>

          {/* Buy Me a Coffee */}
          <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] hover:border-pink-300 dark:hover:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300">
                <Coffee className="h-4 w-4" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Buy Me a Coffee</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Quick one-time support.
            </p>
            {bmacHref ? (
              <a
                href={bmacHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open Buy Me a Coffee (opens in new tab)"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[13px] min-h-[40px] text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
              >
                <ExternalLink className="h-4 w-4" />
                Open Buy Me a Coffee
              </a>
            ) : (
              <div className="text-xs text-amber-600 dark:text-amber-400">Set <code>buyMeACoffeeUsername</code> or <code>buyMeACoffeeUrl</code> prop.</div>
            )}
          </div>

          {/* Bitcoin */}
          <div className="sm:col-span-2 group rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] hover:border-pink-300 dark:hover:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300">
                  <Bitcoin className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Bitcoin</h3>
              </div>

              <div className="inline-flex rounded-xl border border-pink-300 dark:border-pink-500 bg-pink-50/60 dark:bg-pink-500/10 backdrop-blur p-0.5 text-[12px] font-medium">
                <button
                  type="button"
                  onClick={() => setBtcMode("lightning")}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition-colors duration-200 ${
                    showLightning
                      ? "bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-sm"
                      : "text-pink-800 dark:text-pink-100 hover:bg-pink-100/70 dark:hover:bg-pink-500/20"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" /> Lightning
                </button>
                <button
                  type="button"
                  onClick={() => setBtcMode("onchain")}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 transition-colors duration-200 ${
                    !showLightning
                      ? "bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-sm"
                      : "text-pink-800 dark:text-pink-100 hover:bg-pink-100/70 dark:hover:bg-pink-500/20"
                  }`}
                >
                  <Bitcoin className="h-3.5 w-3.5" /> On‑chain
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                  {showLightning ? "Lightning address / invoice" : "On‑chain address"}
                </div>
                {activeValue ? (
                  <div className="flex flex-col gap-2">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={handleCopy}
                      onKeyDown={handleKeyCopy}
                      aria-label="Copy address to clipboard"
                      className="group relative w-full max-w-full overflow-x-auto shb-scrollhide rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 hover:ring-pink-300/70 dark:hover:ring-pink-500/40 cursor-pointer touch-pan-x transition-all duration-200"
                      title="Click to copy"
                    >
                      <code className="inline-block text-sm whitespace-nowrap px-2 py-2 select-all">
                        {activeValue}
                      </code>
                      <span
                        className={`pointer-events-none absolute top-1 right-2 inline-flex items-center gap-1 rounded-md bg-white/80 dark:bg-gray-900/80 backdrop-blur px-2 py-1 text-xs text-green-700 dark:text-green-300 transition-opacity ${
                          copiedKey === btcMode + "-copy" ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden="true"
                      >
                        <Check className="h-3.5 w-3.5" /> Copied
                      </span>
                    </div>
                    <span className="sr-only" aria-live="polite">{copiedKey ? "Copied to clipboard" : ""}</span>
                  </div>
                ) : (
                  <div className="text-xs text-amber-600 dark:text-amber-400">
                    {showLightning ? (
                      <>Set the <code>lightning</code> prop (address, LNURL, or invoice).</>
                    ) : (
                      <>Set the <code>onchainAddress</code> prop.</>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 sm:self-stretch sm:items-end sm:justify-end">
                {showLightning && lightning && lightning.startsWith("lnbc") && (
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 px-2 py-1">Invoice may expire</span>
                )}

                {activeUri && (
                  <a
                    href={activeUri}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[13px] min-h-[40px] text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] sm:mt-auto"
                    aria-label="Open in compatible wallet"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in wallet
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
