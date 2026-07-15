import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

export function ThemeToggle({ className, isDark: controlledIsDark, onToggle }) {
  const [internalIsDark, setInternalIsDark] = useState(true);
  const isControlled = typeof controlledIsDark === "boolean";
  const isDark = isControlled ? controlledIsDark : internalIsDark;

  const toggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsDark((current) => !current);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={cn(
        "flex h-9 w-[68px] cursor-pointer rounded-full border p-1 transition-all duration-300",
        isDark ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white",
        className
      )}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "translate-x-0 bg-zinc-800" : "translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? <Moon className="h-4 w-4 text-white" strokeWidth={1.5} /> : <Sun className="h-4 w-4 text-gray-700" strokeWidth={1.5} />}
        </div>
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300", isDark ? "bg-transparent" : "-translate-x-8")}>
          {isDark ? <Sun className="h-4 w-4 text-gray-500" strokeWidth={1.5} /> : <Moon className="h-4 w-4 text-black" strokeWidth={1.5} />}
        </div>
      </div>
    </div>
  );
}
