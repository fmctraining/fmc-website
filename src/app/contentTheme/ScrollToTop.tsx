"use client";

import { useLayoutEffect } from "react";

// https://discord.com/channels/679514959968993311/679514959968993476/1396963062111797328
export function ScrollToTop() {
  useLayoutEffect(() => {
    const observer = new MutationObserver(() => window.scrollTo(0, 0));
    const main = document.querySelector("main");

    if (main) {
      observer.observe(main, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return null;
}