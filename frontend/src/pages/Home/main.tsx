import { StartButton } from '@/domain/stopwatch/components/StartButton';
import { useStopwatchStore } from '@/domain/stopwatch/stores/stopwatchStore';
import { cn } from '@/core/lib/utils';

function HomePage() {
  // Subscribing to displayTime to show the counter (even though Feature 4 is separate, we need to see something happening)
  const { displayTime } = useStopwatchStore((state) => ({ displayTime: state.displayTime }));

  // Simple formatter for visualization during development of Feature 1
  const formatTime = (ms: number) => {
    const date = new Date(ms);
    return date.toISOString().slice(11, 23); // HH:mm:ss.ms
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Cronômetro</h1>
        <p className="text-muted-foreground text-lg">Simples, preciso e eficiente.</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Temporary Display for feedback verification */}
        <div
          className={cn(
            'font-mono text-6xl font-medium tabular-nums tracking-wider transition-all'
          )}
        >
          {formatTime(displayTime)}
        </div>

        <div className="flex items-center justify-center gap-4">
          <StartButton />
        </div>
      </div>
    </div>
  );
}

export { HomePage };
