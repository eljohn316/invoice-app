import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-3xl px-6 py-[1.125rem] text-[0.9375rem] leading-none font-bold -tracking-[0.25px]',
  {
    variants: {
      variant: {
        primary: 'bg-[#7C5DFA] text-white hover:bg-[#9277FF]',
        secondary:
          'bg-[#373B53] text-[#888EB0] hover:bg-[#0C0E16] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]',
        light:
          'bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-white dark:hover:text-[#DFE3FA]',
        danger: 'bg-[#EC5757] text-white hover:bg-[#FF9797]'
      }
    },
    defaultVariants: {
      variant: 'primary'
    }
  }
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  full?: boolean;
}

export function Button({
  className,
  variant,
  asChild = false,
  full,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, className }),
        full && 'w-full justify-center'
      )}
      {...props}>
      {children}
    </Comp>
  );
}
