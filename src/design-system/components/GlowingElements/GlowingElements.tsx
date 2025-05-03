export function GlowingElements() {
  return (
    <div className="absolute overflow-hidden inset-0 bg-background">
      <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
    </div>
  );
}
