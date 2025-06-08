import { useEffect, useRef } from "react";

export function useClickOutside(handler: (() => void) | undefined) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the ref element
      if (!ref.current || !ref.current.contains(event.target as Node)) {
        return;
      }

      // Call the handler function
      handler?.();
    };

    // Add event listeners to the document
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      // Remove event listeners on cleanup
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);

  return ref;
}
