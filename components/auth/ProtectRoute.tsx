"use client";
import { RootState, useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  const router = useRouter();
  const auth = useAppSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    if (!auth.token || !auth.token.length) {
      router.push('/signin');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ auth, router]);


  return <>{children}</>;
};

export default ProtectedRoute;
