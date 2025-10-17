import React, { useMemo } from "react";
import { Mail } from "lucide-react";
import { X, Instagram, Threads } from "./Icons";

export type ContactSectionProps = {
  email?: string;
  emailUrl?: string;
  xHandle?: string;
  xUrl?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  threadsHandle?: string;
  threadsUrl?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

function normHandle(h?: string) {
  return h?.replace(/^@+/, "");
}

function buildXUrl(handle?: string, override?: string) {
  if (override) return override;
  const h = normHandle(handle);
  if (!h) return undefined;
  return `https://x.com/${encodeURIComponent(h)}`;
}

function buildIgUrl(handle?: string, override?: string) {
  if (override) return override;
  const h = normHandle(handle);
  if (!h) return undefined;
  return `https://instagram.com/${encodeURIComponent(h)}`;
}

function buildThreadsUrl(handle?: string, override?: string) {
  if (override) return override;
  const h = normHandle(handle);
  if (!h) return undefined;
  return `https://www.threads.com/@${encodeURIComponent(h)}`;
}

function buildMailto(email?: string, override?: string) {
  if (override) return override;
  if (!email) return undefined;
  return `mailto:${email}`;
}

export default function ContactSection({
  email,
  emailUrl,
  xHandle,
  xUrl,
  instagramHandle,
  instagramUrl,
  threadsHandle,
  threadsUrl,
  title = "Contact",
  subtitle = "Pick whatever works for you — email or DMs.",
  className = "",
}: ContactSectionProps) {
  const mailto = useMemo(() => buildMailto(email, emailUrl), [email, emailUrl]);
  const xHref = useMemo(() => buildXUrl(xHandle, xUrl), [xHandle, xUrl]);
  const igHref = useMemo(
    () => buildIgUrl(instagramHandle, instagramUrl),
    [instagramHandle, instagramUrl]
  );
  const threadsHref = useMemo(
    () => buildThreadsUrl(threadsHandle, threadsUrl),
    [threadsHandle, threadsUrl]
  );

  const xDisplay = useMemo(
    () => (xHandle ? `@${normHandle(xHandle)}` : undefined),
    [xHandle]
  );
  const igDisplay = useMemo(
    () => (instagramHandle ? `@${normHandle(instagramHandle)}` : undefined),
    [instagramHandle]
  );
  const threadsDisplay = useMemo(
    () => (threadsHandle ? `@${normHandle(threadsHandle)}` : undefined),
    [threadsHandle]
  );

  const items: Array<{
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    ariaLabel: string;
    external?: boolean;
  }> = [];

  if (mailto && email)
    items.push({
      href: mailto,
      label: email,
      Icon: Mail as any,
      ariaLabel: `Email ${email}`,
    });
  if (xHref && xDisplay)
    items.push({
      href: xHref,
      label: xDisplay,
      Icon: X as any,
      ariaLabel: `Open X profile ${xDisplay} in new tab`,
      external: true,
    });
  if (threadsHref && threadsDisplay)
    items.push({
      href: threadsHref,
      label: threadsDisplay,
      Icon: Threads as any,
      ariaLabel: `Open Threads profile ${threadsDisplay} in new tab`,
      external: true,
    });
  if (igHref && igDisplay)
    items.push({
      href: igHref,
      label: igDisplay,
      Icon: Instagram as any,
      ariaLabel: `Open Instagram profile ${igDisplay} in new tab`,
      external: true,
    });

  return (
    <section id="contact" className={`w-full ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">
            {subtitle}
          </p>
        )}

        {items.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {items.map(({ href, label, Icon, ariaLabel, external }) => (
              <a
                key={ariaLabel}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                aria-label={ariaLabel}
                title={label}
                className="inline-flex items-center gap-2 rounded-xl border border-pink-300 dark:border-pink-500 bg-pink-50/90 dark:bg-pink-500/15 px-3 py-1.5 text-[13px] min-h-[36px] text-pink-800 dark:text-pink-100 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transform transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] ring-1 ring-transparent hover:ring-pink-300/70 dark:hover:ring-pink-500/40"
              >
                <Icon className="h-4 w-4 shrink-0 opacity-90" />
                <span className="truncate max-w-[52ch] sm:max-w-[60ch]">
                  {label}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-xs text-amber-600 dark:text-amber-400">
            Set <code>email</code> and/or <code>xHandle</code> /{" "}
            <code>instagramHandle</code> props.
          </div>
        )}
      </div>
    </section>
  );
}
