import { ExternalLink, Mail } from "lucide-react";
import { GitHub } from "./Icons";

export type ToolItem = {
  id?: string;
  name: string;
  logoUrl?: string; // Optional; falls back to first letter avatar
  description: string;
  href?: string; // Optional link to the tool (website, store page, etc.)
  repoUrl?: string; // Optional GitHub repo link
};

export type ToolsGalleryProps = {
  tools: ToolItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  /** Used for fallback mail link when a tool has no href/repoUrl */
  contactEmail?: string;
};

function InitialAvatar({ name }: { name: string }) {
  const letter = name?.trim()?.charAt(0)?.toUpperCase() || "T";
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-orange-100 text-pink-700 dark:from-pink-500/10 dark:to-orange-500/10 dark:text-pink-300 font-semibold">
      {letter}
    </div>
  );
}

function buildInquiryMailto(email: string, toolName: string) {
  const subject = `Question about \"${toolName}\"`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export default function ToolsGallery({ tools, title = "Other Tools", subtitle, className = "", contactEmail }: ToolsGalleryProps) {
  const contactMail = contactEmail?.trim();

  return (
    <section id="tools" className={`w-full ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">{title}</h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">{subtitle}</p>
        )}

        {tools?.length ? (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const key = tool.id || tool.href || tool.repoUrl || tool.name;
              const hasLogo = Boolean(tool.logoUrl);
              const hasAnyLink = Boolean(tool.href || tool.repoUrl);
              const mailto = !hasAnyLink && contactMail ? buildInquiryMailto(contactMail, tool.name) : undefined;
              const titleHref = tool.href || tool.repoUrl || mailto; // prefer site, then repo, else email

              return (
                <article
                  key={key}
                  className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 shadow-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-900/80 hover:border-pink-300 dark:hover:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3">
                    {/* Logo */}
                    {hasLogo ? (
                      <img
                        src={tool.logoUrl}
                        alt={`${tool.name} logo`}
                        className="h-10 w-10 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 ring-1 ring-transparent group-hover:ring-pink-300/70 dark:group-hover:ring-pink-500/40 transition-colors duration-200"
                        loading="lazy"
                      />
                    ) : (
                      <InitialAvatar name={tool.name} />
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {titleHref ? (
                          <a
                            href={titleHref}
                            target={tool.href || tool.repoUrl ? "_blank" : undefined}
                            rel={tool.href || tool.repoUrl ? "noreferrer noopener" : undefined}
                            className="rounded-sm outline-none focus:ring-2 focus:ring-pink-500"
                            aria-label={`Open ${tool.name}`}
                            title={tool.name}
                          >
                            {tool.name}
                          </a>
                        ) : (
                          <span title={tool.name}>{tool.name}</span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{tool.description}</p>

                      {(tool.href || tool.repoUrl || mailto) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {/* Primary action: Visit or Email fallback (gradient) */}
                          {(tool.href || mailto) && (
                            <a
                              href={tool.href || mailto}
                              target={tool.href ? "_blank" : undefined}
                              rel={tool.href ? "noreferrer noopener" : undefined}
                              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] min-h-[34px] text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-600 hover:via-orange-500 hover:to-rose-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99]"
                              aria-label={`Open ${tool.name}`}
                            >
                              {tool.href ? <ExternalLink className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                              {tool.href ? "Visit" : "Email me"}
                            </a>
                          )}

                          {/* Secondary action: GitHub (outlined with pink tint) */}
                          {tool.repoUrl && (
                            <a
                              href={tool.repoUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-pink-300 dark:border-pink-500 px-3 py-1.5 text-[13px] min-h-[34px] text-pink-800 dark:text-pink-100 bg-pink-50/70 dark:bg-pink-500/10 hover:bg-pink-100/80 dark:hover:bg-pink-500/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                              aria-label={`${tool.name} GitHub repository`}
                            >
                              <GitHub className="h-4 w-4" />
                              GitHub
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-sm text-gray-600 dark:text-gray-400">
            No tools yet — add some via the <code>tools</code> prop.
          </div>
        )}
      </div>
    </section>
  );
}
