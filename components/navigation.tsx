import Image from 'next/image';
import { SunIcon, MoonIcon } from '@/components/icons';

export function Navigation() {
  return (
    <nav className="relative z-50 flex h-20 bg-[#373B53] lg:h-auto lg:w-[103px] lg:flex-col lg:rounded-r-[1.25rem] dark:bg-[#1E2139]">
      <div className="absolute inset-y-0 lg:inset-y-auto">
        <Image
          src="/logo.svg"
          alt="Invoice app logo"
          className="size-full rounded-r-[1.25rem] object-cover"
          height={100}
          width={100}
          quality={75}
          priority
        />
      </div>
      <div className="flex flex-1 justify-end lg:flex-col lg:items-center">
        <button
          type="button"
          className="cursor-pointer text-[#7E88C3] hover:text-[#DFE3FA] lg:mt-auto">
          <span className="sr-only">Toggle dark mode</span>
          <MoonIcon aria-hidden="true" />
        </button>
      </div>
      <div className="ml-6 flex-none border-l border-[#494e6e] px-6 py-5 md:ml-8 md:px-8 md:py-6 lg:mt-8 lg:ml-0 lg:border-t lg:border-l-0">
        <Image
          src="/image-avatar.jpg"
          alt="Current user avatar"
          height={40}
          width={40}
          className="size-8 rounded-full"
        />
      </div>
    </nav>
  );
}
