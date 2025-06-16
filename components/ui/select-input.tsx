import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ArrowDownIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export const Select = SelectPrimitive.Root;

export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'dark:ring:border-[#7C5DFA] inline-flex w-full cursor-pointer items-center justify-between rounded-sm border border-[#DFE3FA] bg-white px-5 py-[1.125rem] text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] outline-none hover:border-[#7C5DFA] focus:border-[#7C5DFA] dark:border-[#252945] dark:bg-[#1E2139] dark:text-white dark:hover:border-[#7C5DFA]',
        className
      )}
      {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <ArrowDownIcon aria-hidden="true" className="text-[#7C5DFA]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  position = 'popper',
  sideOffset = 24,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 max-h-[--radix-select-content-available-height] w-full min-w-[var(--radix-select-trigger-width)] origin-[--radix-select-content-transform-origin] divide-y divide-[#DFE3FA] overflow-x-hidden overflow-y-auto rounded-lg bg-white shadow-[0px_10px_20px_0px_rgba(72,84,159,0.25)] dark:divide-[#1E2139] dark:bg-[#252945] dark:shadow-[0px_10px_20px_0px_rgba(0,0,0,0.25)]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        sideOffset={sideOffset}
        {...props}
      />
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'inline-flex cursor-pointer items-center px-6 py-4 text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] outline-none hover:text-[#7C5DFA] focus:text-[#7C5DFA] dark:text-[#DFE3FA]',
        className
      )}
      {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
