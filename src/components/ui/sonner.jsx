"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--card-bg)",
        "--normal-text": "var(--text-colour)",
        "--normal-border": "var(--button-hover)",
      }}
      {...props}
    />
  );
};

export { Toaster };
