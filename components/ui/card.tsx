import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-lg bg-white shadow-[0_10px_10px_-10px_rgba(72,84,159,0.1004)] dark:bg-[#1E2139]',
        className
      )}
      {...props}
    />
  );
}
