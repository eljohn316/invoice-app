import * as React from 'react';
import { cn } from '@/lib/utils';

export function Input({ type = 'text', className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'block w-full rounded-sm border border-[#DFE3FA] bg-white px-5 py-[1.125rem] text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] placeholder:text-[#0C0E16]/40 focus:border-[#9277FF] focus:outline-none disabled:opacity-50 dark:border-[#252945] dark:bg-[#1E2139] dark:text-white dark:placeholder:text-white',
        className
      )}
      {...props}
    />
  );
}
