import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

export const Sheet = SheetPrimitive.Root;

export const SheetTrigger = SheetPrimitive.Trigger;

export const SheetClose = SheetPrimitive.Close;

export const SheetPortal = SheetPrimitive.Portal;

export function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'fixed inset-x-0 top-20 bottom-0 z-40 bg-black/50 lg:inset-y-0 lg:left-[103px] dark:bg-black/50',
        className
      )}
      {...props}
    />
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          'fixed top-20 bottom-0 left-0 z-40 h-full w-full gap-4 overflow-hidden bg-[#F8F8FB] p-6 shadow-lg transition ease-in-out md:max-w-2xl md:rounded-r-[20px] lg:inset-y-0 lg:left-[103px]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-[#141625]',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
          className
        )}
        aria-describedby={undefined}
        {...props}>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-6', className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title className={cn('text-lg font-semibold', className)} {...props} />;
}
