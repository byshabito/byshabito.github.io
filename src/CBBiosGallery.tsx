import React from "react";

export type CBBioItem = {
  id?: string;
  name: string;
  /** Image preview of the bio */
  previewUrl?: string;
  /** Single tag: Custom | Premade | etc. */
  tag?: "Custom" | "Premade" | string;
  /** Optional per-bio theme color (any valid CSS color) */
  themeColor?: string;
  /** Link to the model's CB room */
  href: string;
};

export type CBBiosGalleryProps = {
  bios: CBBioItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

function FallbackPreview({ name, themeColor }: { name: string; themeColor?: string }) {
  const letter = name?.trim()?.charAt(0)?.toUpperCase() || "B";
  const accent = themeColor?.trim() || "#e5e7eb"; // Tailwind gray-200 fallback

  const bgStyle: React.CSSProperties = {
    backgroundColor: accent,
    backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(0,0,0,0.12))",
  };

  return (
    <div className="absolute inset-0 isolate" style={bgStyle}>
      {/* subtle dot pattern for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.6)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-semibold text-gray-800/80 dark:text-white/80 drop-shadow select-none">{letter}</span>
      </div>
    </div>
  );
}

export default function CBBiosGallery({ bios, title = "Chaturbate Bios", subtitle, className = "" }: CBBiosGalleryProps) {
  return (
    <section id="bios" className={`w-full ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">{title}</h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">{subtitle}</p>
        )}

        {bios?.length ? (
          <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-4">
            {bios.map((bio) => {
              const key = bio.id || bio.href || bio.name;
              const tag = bio.tag?.trim();
              const accent = bio.themeColor?.trim();

              return (
                <a
                  key={key}
                  href={bio.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full sm:w-[32%] group relative block overflow-hidden rounded-2xl border p-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/70 dark:bg-gray-900/70 hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] ring-1 ring-transparent hover:ring-pink-300/70 dark:hover:ring-pink-500/40"
                  aria-label={`Open ${bio.name}'s Chaturbate room`}
                  style={accent ? { borderColor: accent } : undefined}
                >
                  {/* Background image / fallback fills the card */}
                  {bio.previewUrl ? (
                    <img
                      src={bio.previewUrl}
                      alt={`${bio.name} bio preview`}
                      className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <FallbackPreview name={bio.name} themeColor={accent} />
                  )}

                  {/* Subtle overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Top-right tag chip with pink accent */}
                  {tag && (
                    <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-lg border border-pink-300 dark:border-pink-500 bg-pink-50/90 dark:bg-pink-500/15 text-pink-800 dark:text-pink-100 backdrop-blur px-2 py-0.5 text-[11px] transition-colors duration-200">
                      {tag}
                    </span>
                  )}

                  {/* Bottom-left name */}
                  <div className="relative z-10 flex h-48 sm:h-56 items-end p-4 sm:p-5">
                    <div className="min-w-0">
                      <h3 className="max-w-full truncate text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] text-lg font-semibold">
                        {bio.name}
                      </h3>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-sm text-gray-600 dark:text-gray-400">
            No bios yet — add some via the <code>bios</code> prop.
          </div>
        )}
      </div>
    </section>
  );
}
