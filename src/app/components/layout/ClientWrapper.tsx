'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ClientWrapperProps {
  children: ReactNode;
  initialTag: string;
}

export default function ClientWrapper({ children, initialTag }: ClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentTag = searchParams.get('tag') || '';
    if (currentTag !== initialTag) {
      router.push(`/?tag=${currentTag}`, { scroll: false });
    }
  }, [searchParams, initialTag, router]);

  return <>{children}</>;
}