// layout.tsx

import React from 'react';
import Image from 'next/image';
import './authStyle.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="logo">
        <div>
            <Image
                src="https://tailwebs.com/wp-content/uploads/2023/03/Group-222-300x50.png"  
                alt="Tailwebs Logo"
                width={200}
                height={50}
                layout="intrinsic" 
            />
        </div>
        {children}
    </div>
  );
};

export default Layout;