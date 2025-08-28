'use client';
import React from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { useRouter, usePathname } from 'next/navigation';
import { OpenSans, DesirePro } from '../lib/fonts';
import { User } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useSupabaseAuth } from '../lib/context/AuthContext';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const pathname = usePathname();

  const { user: supabaseUser, isAuthenticated: supabaseIsAuthenticated } =
    useSupabaseAuth();

  // Check authentication on every route change and on storage event
  React.useEffect(() => {
    const checkAuthentication = () => {
      // Check Magic Link token
      const magicLinkToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('magiclink_token')
          : null;

      // Check Google OAuth
      const hasGoogleAuth = supabaseUser && supabaseIsAuthenticated;

      // User is authenticated if either method works
      const authenticated = !!(magicLinkToken || hasGoogleAuth);
      setIsAuthenticated(authenticated);
    };

    checkAuthentication();
    window.addEventListener('storage', checkAuthentication);
    return () => window.removeEventListener('storage', checkAuthentication);
  }, [pathname, supabaseUser, supabaseIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('magiclink_email');
    localStorage.removeItem('magiclink_token');
    localStorage.removeItem('magiclink_timestamp');
    window.location.reload();
  };

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const textStyle = `flex items-center text-4xl ${DesirePro.className} text-black`;

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-6  lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-20">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/" className={textStyle}>
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/#about" className={textStyle}>
          About
        </a>
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
              className={`flex cursor-pointer items-center p-1 text-4xl text-black hover:text-gray-700 transition-colors ${DesirePro.className}`}
            >
              Werke
            </span>
          </Typography>
        </MenuHandler>
        <MenuList className="mt-0 border-none bg-white shadow-lg rounded-lg min-w-[200px]">
          <MenuItem className="flex items-center gap-2 py-3 px-4 hover:bg-gray-50 transition-colors">
            <a
              href="/werke/dreamer"
              className={`${textStyle} hover:text-gray-700`}
            >
              Dreamer
            </a>
          </MenuItem>
          <MenuItem className="flex items-center gap-2 py-3 px-4 hover:bg-gray-50 transition-colors">
            <a
              href="/werke/sternendaemmerung"
              className={`${textStyle} hover:text-gray-700`}
            >
              Sternendämmerung
            </a>
          </MenuItem>
        </MenuList>
      </Menu>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/qanda" className={textStyle}>
          Q & A
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/communitybook" className={textStyle}>
          Communitybook
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none bg-white px-4 py-2 lg:px-8 lg:py-4">
      <div className="relative flex items-center w-full text-blue-gray-900 min-h-[56px]">
        {/* Desktop: Centered navList */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navList}
        </div>
        {/* Mobile hamburger left */}
        <IconButton
          variant="text"
          className="lg:hidden h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
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
              className="h-6 w-6"
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
                <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ml-2">
                  <User className="w-7 h-7 text-gray-700" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="z-50 min-w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-2 mt-2">
                <DropdownMenu.Item className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer text-base">
                  <a href="/settings" className="block w-full">
                    Settings
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={handleLogout}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer text-base"
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
