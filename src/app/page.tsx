'use client';
import { useEffect, useState } from 'react';
import DesktopHomePage from '../components/desktop/LandingPageDesktop';
import MobileHomePage from '../components/mobile/LandingPageMobile';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsMobile(/Mobile|Android|iP(hone|od)|IEMobile/.test(userAgent));
  }, []);

  if (isMobile) {
    return <MobileHomePage />;
  }

  return <DesktopHomePage />;
}
