import React, { ReactNode } from 'react'
import ProtectedRoute from '../../components/auth/ProtectRoute';
import Navbar from '@/components/Navbar';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative'>
            <ProtectedRoute>
                <Navbar/>
                <div>
                    <div>
                        {children}
                    </div>
                </div>
            </ProtectedRoute>
        </main>
    )
}

export default HomeLayout