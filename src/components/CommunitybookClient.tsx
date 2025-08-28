'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Communitybook from './Communitybook';
import { ThemaWithVorschlaege } from '../drizzle/schema';

interface CommunitybookClientProps {
  themenList: ThemaWithVorschlaege[];
}

const CommunitybookClient: React.FC<CommunitybookClientProps> = ({
  themenList,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="relative min-h-screen w-full">
      {isMobile ? (
        <Image
          src="/images/poppy_sm_bg.jpg"
          alt="Header Image"
          fill
          priority
          className="absolute left-0 top-0 -z-10 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <Image
          src="/images/poppy.jpg"
          alt="Header Image"
          fill
          priority
          className="absolute left-0 top-0 -z-10 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
      )}
      <Communitybook themenList={themenList} />
    </div>
  );
};

export default CommunitybookClient;
