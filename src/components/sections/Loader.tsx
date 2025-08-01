"use client";

import { useEffect, useState } from "react";
import { LogoIcon } from "@/assets/icons/Logo";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (!isPageLoaded) return;
    const minTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldUnmount(true);
      }, 500);
    }, 1500);

    return () => clearTimeout(minTimer);
  }, [isPageLoaded]);

  if (shouldUnmount) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-foreground transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <LogoIcon
        className="size-50 md:size-100"
        rotation={1.5}
        animate="power2.inOut"
      />
    </div>
  );
}
