export function ErrorBoundary() {
  return (
    <section className="flex items-center justify-center">
      <div className="rounded-xl border p-4">
        {/* {isRouteErrorResponse(error) ? (
        <>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </>
      ) : error instanceof Error ? (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )} */}
      </div>
    </section>
  );
}
