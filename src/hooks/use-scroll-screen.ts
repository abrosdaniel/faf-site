"use client";
import { useEffect, useState } from "react";

export function useScroll(expression: string): boolean {
  const [result, setResult] = useState(false);

  useEffect(() => {
    const parseExpression = (expr: string) => {
      const match = expr.match(/^(y|x)\s*(>|<|=|!=)\s*(\d+)$/);
      if (!match) {
        console.warn("Invalid scroll expression format. Use: y|x >|<|=|!= n");
        return null;
      }

      const [, axis, operator, value] = match;
      return { axis, operator, value: parseInt(value) };
    };

    const checkCondition = (parsed: any) => {
      if (!parsed) return false;

      const { axis, operator, value } = parsed;
      const currentValue = axis === "y" ? window.scrollY : window.scrollX;

      switch (operator) {
        case ">":
          return currentValue > value;
        case "<":
          return currentValue < value;
        case "=":
          return currentValue === value;
        case "!=":
          return currentValue !== value;
        default:
          return false;
      }
    };

    const handleScroll = () => {
      const parsed = parseExpression(expression);
      const newResult = checkCondition(parsed);
      setResult(newResult);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expression]);

  return result;
}
