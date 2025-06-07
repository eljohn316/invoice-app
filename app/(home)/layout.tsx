import { Button } from '@/components/ui/button';
import { Text } from '@/components/text';
import { PlusIcon } from '@/components/icons';
import { FilterDropdown } from '@/components/filter-dropdown';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8 md:space-y-[3.4375rem] lg:space-y-16">
      <div className="flex items-center justify-between">
        <div className="space-y-[0.1875rem]">
          <h4 className="text-2xl leading-[22px] font-bold tracking-[-0.75px] text-[#0C0E16] md:text-4xl md:leading-[33px] md:tracking-[-1.13px] dark:text-white">
            Invoices
          </h4>
          <Text>10 invoices</Text>
        </div>
        <div className="flex items-center gap-x-[1.125rem] md:gap-x-10">
          <FilterDropdown />
          <Button
            type="button"
            className="gap-x-2 py-1.5 pr-4 pl-1.5 md:gap-x-4 md:py-2 md:pl-2">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-[#7C5DFA]">
              <PlusIcon aria-hidden="true" />
            </span>
            <span className="md:hidden">New</span>
            <span className="hidden md:block">New Invoice</span>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
