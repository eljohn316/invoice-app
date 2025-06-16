import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';

export function CalendarInput({
  className,
  classNames,
  showOutsideDays = true,
  hideHead = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      hideHead={hideHead}
      className={className}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-8',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label:
          'text-[15px] font-bold leading-none -tracking-[0.25px] text-[#0C0E16] dark:text-[#DFE3FA]',
        nav: 'space-x-1 flex items-center',
        nav_button: 'cursor-pointer flex items-center justify-center',
        nav_button_previous: 'absolute left-3',
        nav_button_next: 'absolute right-3',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-4',
        day: 'cursor-pointer w-8 h-8 p-0 text-[15px] text-[#0C0E16] font-bold leading-none -tracking-[0.25px] aria-selected:text-[#7C5DFA] hover:text-[#7C5DFA] dark:text-[#DFE3FA]',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-[#0C0E16]/8 dark:text-[#DFE3FA]/8',
        ...classNames
      }}
      components={{
        IconLeft: () => <ArrowLeftIcon className="text-[#7C5DFA]" />,
        IconRight: () => <ArrowRightIcon className="text-[#7C5DFA]" />
      }}
      {...props}
    />
  );
}
