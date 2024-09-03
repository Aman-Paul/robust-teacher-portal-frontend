"use client";
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  const router = useRouter();
  let user = undefined
  let nextAcion = undefined
  if (typeof window !== 'undefined'){
     user = localStorage.getItem('token');
  }

  useEffect(() => {
    if (!user) {
      router.push('/signin');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  if (!user) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
