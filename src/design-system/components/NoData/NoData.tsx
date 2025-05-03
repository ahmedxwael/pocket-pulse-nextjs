type NoDataProps = {
  title?: string;
  description?: string;
};

export function NoData({ title, description }: NoDataProps) {
  return (
    <div className="min-h-80 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{title || "No Data"}</h1>
        <p className="text-sm text-muted-foreground">
          {description || "No data to display"}
        </p>
      </div>
    </div>
  );
}
