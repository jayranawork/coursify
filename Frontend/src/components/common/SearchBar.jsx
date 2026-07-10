import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui";

export function SearchBar({ value = "", onChange, onSubmit, placeholder = "Search courses..." }) {
  const [localValue, setLocalValue] = useState(value);
  const didMount = useRef(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const timer = setTimeout(() => onChange?.(localValue), 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        value={localValue}
        onChange={(event) => setLocalValue(event.target.value)}
        placeholder={placeholder}
        className="pl-9"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit?.(localValue);
          }
        }}
      />
    </div>
  );
}
