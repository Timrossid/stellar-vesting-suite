interface ErrorDisplayProps {
  message: string
  onRetry?: () => void
}

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center">
        <span className="text-3xl">⚠️</span>
      </div>
      <p className="text-red-400 text-sm max-w-md text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
