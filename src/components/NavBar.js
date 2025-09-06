'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { useSupabaseAuth } from '../lib/context/AuthContext';
import { useHydration } from '../hooks/useHydration';
import { DesirePro } from '../lib/fonts';
import { useRouter, usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const pathname = usePathname();
  const isHydrated = useHydration();

  const {
    user: supabaseUser,
    isAuthenticated: supabaseIsAuthenticated,
    signOut: supabaseSignOut,
  } = useSupabaseAuth();

  // Check authentication on every route change and on storage event
  React.useEffect(() => {
    if (!isHydrated) return;

    const checkAuthentication = () => {
      // Check Magic Link token
      const magicLinkToken = localStorage.getItem('magiclink_token');

      // Check Google OAuth
      const hasGoogleAuth = supabaseUser && supabaseIsAuthenticated;

      // User is authenticated if either method works
      const authenticated = !!(magicLinkToken || hasGoogleAuth);
      setIsAuthenticated(authenticated);
    };

    checkAuthentication();
    window.addEventListener('storage', checkAuthentication);
    return () => window.removeEventListener('storage', checkAuthentication);
  }, [pathname, supabaseUser, supabaseIsAuthenticated, isHydrated]);

  const handleLogout = async () => {
    if (!isHydrated) return;

    try {
      // Sign out from Supabase if authenticated via Google OAuth
      if (supabaseUser && supabaseIsAuthenticated) {
        await supabaseSignOut();
      }

      // Clear Magic Link data
      localStorage.removeItem('magiclink_email');
      localStorage.removeItem('magiclink_token');
      localStorage.removeItem('magiclink_timestamp');

      // Force page reload to clear all states
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, clear local storage and reload
      localStorage.clear();
      window.location.reload();
    }
  };

  React.useEffect(() => {
    if (!isHydrated) return;

    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, [isHydrated]);

  const textStyle = `flex items-center text-4xl ${DesirePro.className} text-black`;

  // Don't render authentication-dependent content until hydration is complete
  if (!isHydrated) {
    return (
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <div className="animate-pulse">
              <div className="h-8 w-32 rounded bg-gray-200"></div>
            </div>
          </Typography>
        </div>
      </Navbar>
    );
  }

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-6  lg:my-0 lg:flex-row lg:items-center lg:gap-20">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/" className={`${textStyle} whitespace-nowrap`}>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/#about" className={`${textStyle} whitespace-nowrap`}>
          About
        </Link>
      </Typography>
      {/* Dropdown for Werke */}
      <Menu>
        <MenuHandler>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <span
              className={`flex cursor-pointer items-center whitespace-nowrap p-1 text-4xl text-black transition-colors hover:text-gray-700 ${DesirePro.className}`}
            >
              Werke
            </span>
          </Typography>
        </MenuHandler>
        <MenuList className="mt-0 min-w-[200px] rounded-lg border-none bg-white shadow-lg">
          <MenuItem className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-gray-50">
            <Link
              href="/werke/dreamer"
              className={`${textStyle} hover:text-gray-700`}
            >
              Dreamer
            </Link>
          </MenuItem>
          <MenuItem className="flex items-center gap-2 px-4 py-3 transition-colors hover:bg-gray-50">
            <Link
              href="/werke/sternendaemmerung"
              className={`${textStyle} hover:text-gray-700`}
            >
              Sternendämmerung
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/qanda" className={`${textStyle} whitespace-nowrap`}>
          Q & A
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          href="/communitybook"
          className={`${textStyle} whitespace-nowrap`}
        >
          Communitybook
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none bg-white px-4 py-2 lg:px-8 lg:py-4">
      <div className="relative flex min-h-[56px] w-full items-center text-blue-gray-900">
        {/* Desktop: Centered navList */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          {navList}
        </div>
        {/* Mobile hamburger left */}
        <IconButton
          variant="text"
          className="size-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="size-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        {/* User icon always at far right */}
        <div className="ml-auto flex items-center">
          {isAuthenticated && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="ml-2 rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
                  <User className="size-7 text-gray-700" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="z-50 mt-2 min-w-[160px] rounded-md border border-gray-200 bg-white py-2 shadow-lg">
                <DropdownMenu.Item className="cursor-pointer px-4 py-2 text-base text-gray-800 hover:bg-gray-100">
                  <Link href="/settings" className="block w-full">
                    Settings
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={handleLogout}
                  className="cursor-pointer px-4 py-2 text-base text-gray-800 hover:bg-gray-100"
                >
                  Abmelden
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
      {/* Mobile nav below main bar */}
      <Collapse open={openNav}>
        <div className="lg:hidden">{navList}</div>
      </Collapse>
    </Navbar>
  );
}
