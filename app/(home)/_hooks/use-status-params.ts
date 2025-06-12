import { useSearchParams } from 'next/navigation';

export function useStatusParams() {
  const searchParams = useSearchParams();
  const status = searchParams.getAll('status');
  return status;
}
