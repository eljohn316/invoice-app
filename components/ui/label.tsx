import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Text } from '@/components/text';
import { cn } from '@/lib/utils';

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <Text className={cn('block text-[#7E88C3]', className)} asChild>
      <LabelPrimitive.Root {...props} />
    </Text>
  );
}
