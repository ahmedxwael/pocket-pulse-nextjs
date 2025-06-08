import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/design-system/components/ui/card";
import { AlertTriangle } from "lucide-react";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <section className="flex min-h-[50vh] items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Something went wrong!
              </h2>
              <p className="text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error.digest && (
              <div>
                <p className="font-medium">Error ID:</p>
                <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
                  {error.digest}
                </code>
              </div>
            )}
            <div>
              <p className="font-medium">Stack trace:</p>
              <pre className="mt-2 max-h-[200px] overflow-auto rounded bg-muted p-4 text-sm">
                {error.stack}
              </pre>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto"
            variant="default">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
