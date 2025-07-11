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
import { useRouter } from 'next/navigation';
import { OpenSans, DesirePro } from '../lib/fonts';

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

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
        <a href="#about" className={textStyle}>
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
      <div className="flex items-center justify-center text-blue-gray-900">
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
        </div>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </Navbar>
  );
}
