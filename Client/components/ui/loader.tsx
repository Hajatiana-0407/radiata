export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary"></div>
    </div>
  );
}

export function LoaderSmall() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary"></div>
    </div>
  );
}
