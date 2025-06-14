'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon } from '@/components/icons';

export function FilterDropdown() {
  const router = useRouter();
  const status = useSearchParams().getAll('status');

  function handleCheck(checked: boolean, value: string) {
    const newStatus = checked ? [...status, value] : status.filter((s) => s !== value);
    const newSearchParams = new URLSearchParams(newStatus.map((s) => ['status', s]));
    router.push(`?${newSearchParams}`);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex cursor-pointer items-center gap-x-3 text-[0.9375rem] leading-none font-bold -tracking-[0.25px] text-[#0C0E16] outline-none md:gap-x-3.5 dark:text-white data-[state=open]:[&_svg]:rotate-180">
          <span className="md:hidden">Filter</span>
          <span className="hidden md:block">Filter by status</span>
          <ArrowDownIcon className="text-[#7C5DFA]" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-[0.9375rem]">
          <DropdownMenuCheckboxItem
            checked={status.includes('draft')}
            onCheckedChange={(checked) => handleCheck(checked, 'draft')}>
            Draft
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={status.includes('pending')}
            onCheckedChange={(checked) => handleCheck(checked, 'pending')}>
            Pending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={status.includes('paid')}
            onCheckedChange={(checked) => handleCheck(checked, 'paid')}>
            Paid
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
