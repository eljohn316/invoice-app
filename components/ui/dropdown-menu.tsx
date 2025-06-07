import type React from 'react';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@/components/icons';

export const DropdownMenu = DropdownPrimitive.Root;

export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export function DropdownMenuContent({
  children,
  className,
  sideOffset = 22,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.DropdownMenuContent>) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-48 overflow-x-hidden overflow-y-auto rounded-lg bg-white p-6 shadow-[0_10px_20px_0_rgba(72,84,159,0.25)] dark:bg-[#252945] dark:shadow-[0_10px_20px_0_rgba(0,0,0,0.25)]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]',
          className
        )}
        {...props}>
        {children}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  );
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.CheckboxItem>) {
  return (
    <DropdownPrimitive.CheckboxItem
      className={cn(
        'flex cursor-pointer items-center gap-x-[0.8125rem] outline-none data-[state=checked]:[&_span]:bg-[#7C5DFA] data-[state=unchecked]:hover:[&_span]:border-[#7C5DFA]',
        className
      )}
      {...props}>
      <span className="flex size-4 items-center justify-center rounded-xs border border-transparent bg-[#DFE3FA] dark:bg-[#1E2139]">
        <DropdownPrimitive.ItemIndicator>
          <CheckIcon aria-hidden="true" />
        </DropdownPrimitive.ItemIndicator>
      </span>
      <p className="text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#1E2139] dark:text-white">
        {children}
      </p>
    </DropdownPrimitive.CheckboxItem>
  );
}
