"use client";
import { ErrorBoundary } from "@/design-system/components/ErrorBoundary";

// Error boundaries must be Client Components

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <ErrorBoundary error={error} reset={reset} />
      </body>
    </html>
  );
}
