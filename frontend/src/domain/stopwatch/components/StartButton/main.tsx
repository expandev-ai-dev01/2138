import { Button } from '@/core/components/button';
import { PlayIcon } from 'lucide-react';
import { useStopwatchStore } from '../../stores/stopwatchStore';
import { cn } from '@/core/lib/utils';
import type { StartButtonProps } from './types';

function StartButton({ className }: StartButtonProps) {
  const { status, accumulatedTime, start } = useStopwatchStore((state) => ({
    status: state.status,
    accumulatedTime: state.accumulatedTime,
    start: state.start,
  }));

  // RU-004, RU-005: Visible only when STOPPED or PAUSED
  if (status === 'RUNNING') {
    return null;
  }

  // RU-002, RU-003: Label text logic
  const labelText = accumulatedTime === 0 ? 'Iniciar' : 'Retomar';

  return (
    <Button
      size="lg"
      className={cn(
        'w-full max-w-[200px] gap-2 text-lg font-semibold shadow-lg transition-all hover:scale-105 active:scale-95',
        className
      )}
      onClick={start}
    >
      <PlayIcon className="size-5 fill-current" />
      {labelText}
    </Button>
  );
}

export { StartButton };
