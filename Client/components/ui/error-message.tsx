import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string | null;
  onDismiss?: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-destructive">
      <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-destructive/60 hover:text-destructive"
        >
          ✕
        </button>
      )}
    </div>
  );
}
