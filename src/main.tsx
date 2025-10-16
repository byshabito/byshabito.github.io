import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";

// Initialize theme early to avoid FOUC
try {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const useDark = stored ? stored === "dark" : !!prefersDark;
  document.documentElement.classList.toggle("dark", useDark);
} catch {}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
