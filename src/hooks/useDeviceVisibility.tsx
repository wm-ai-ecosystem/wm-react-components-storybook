"use client";
import { useState, useEffect } from "react";

export const useDeviceVisibility = (devices?: ("xs" | "sm" | "md" | "lg" | "all")[]) => {
  const [windowSize, setWindowSize] = useState<number | undefined>(
    typeof window !== "undefined" ? window.innerWidth : undefined
  );

  const checkIsHidden = () => {
    if (!windowSize) return false;

    if (!devices || devices.length === 0 || devices.includes("all")) {
      return false;
    }

    if (windowSize <= 767) {
      // Mobile
      return !devices.includes("xs");
    }
    if (windowSize >= 768 && windowSize <= 991) {
      // Tablet
      return !devices.includes("sm");
    }
    if (windowSize >= 992 && windowSize <= 1199) {
      // Small Desktop
      return !devices.includes("md");
    }
    if (windowSize >= 1200) {
      // Large Desktop
      return !devices.includes("lg");
    }

    return false;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isHidden: checkIsHidden(),
    windowSize,
  };
};
