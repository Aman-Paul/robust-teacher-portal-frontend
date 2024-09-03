import React, { ReactNode } from 'react'
import ProtectedRoute from '../../components/auth/ProtectRoute';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative'>
            <ProtectedRoute>
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