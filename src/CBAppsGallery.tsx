export type CBAppItem = {
  id?: string;
  name: string;
  logoUrl?: string; // Optional; falls back to an initial avatar
  description: string;
  tag?: "Free" | "General" | "Custom" | string; // Single tag only
  href: string; // Link to app detail/install page
};

export type CBAppsGalleryProps = {
  apps: CBAppItem[];
  title?: string;
  subtitle?: string;
  className?: string;
};

function InitialAvatar({ name }: { name: string }) {
  const letter = name?.trim()?.charAt(0)?.toUpperCase() || "A";
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300 font-semibold">
      {letter}
    </div>
  );
}

export default function CBAppsGallery({ apps, title = "Chaturbate Apps", subtitle, className = "" }: CBAppsGalleryProps) {
  return (
    <section id="apps" className={`w-full ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">{title}</h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">{subtitle}</p>
        )}

        {apps?.length ? (
          <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-4">
            {apps.map((app) => {
              const key = app.id || app.href || app.name;
              const showLogo = Boolean(app.logoUrl);
              const tag = app.tag?.trim();

              return (
                <a
                  key={key}
                  href={app.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full sm:w-[32%] group relative block rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/80 hover:border-pink-300 dark:hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
                  aria-label={`Open ${app.name} on Chaturbate`}
                >
                  {/* Top-right tag chip */}
                  {tag && (
                    <span className="absolute top-3 right-3 inline-flex items-center rounded-lg border border-pink-300 dark:border-pink-500 bg-pink-50/90 dark:bg-pink-500/15 px-2 py-0.5 text-[11px] text-pink-800 dark:text-pink-100 backdrop-blur transition-colors duration-200">
                      {tag}
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    {/* Logo (fallback to first letter) */}
                    {showLogo ? (
                      <img
                        src={app.logoUrl}
                        alt={`${app.name} logo`}
                        className="h-10 w-10 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 ring-1 ring-transparent group-hover:ring-pink-300/70 dark:group-hover:ring-pink-500/40 transition-colors duration-200"
                        loading="lazy"
                      />
                    ) : (
                      <InitialAvatar name={app.name} />
                    )}

                    <div className="min-w-0 flex-1 pr-12">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{app.name}</h3>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {app.description}
                      </p>
                    </div>
                  </div></a>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-sm text-gray-600 dark:text-gray-400">
            No apps yet — add some via the <code>apps</code> prop.
          </div>
        )}
      </div>
    </section>
  );
}
