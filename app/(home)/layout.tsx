import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="space-y-8 md:space-y-[3.4375rem] lg:space-y-16">{children}</div>
    </Suspense>
  );
}
