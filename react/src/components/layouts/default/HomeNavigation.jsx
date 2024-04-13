import DiscordButton from "./DiscordButton";
import NavProfile from "../NavProfile";
import { useState } from "react";
import Logo from "../Logo";
import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import Hero from "./Hero";
import Recruiting from "./Recruiting";

export default function Navigation() {
  const [stateToken] = useState(false);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link className='flex items-center'>
          ABOUT US
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link className='flex items-center'>
          APPLY
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Dropdown label='HIGHLIGHTS' inline>
          <Dropdown.Item className='p-0'>
            <Link className='w-full px-4 py-2'>GALLERY</Link>
          </Dropdown.Item>
          <Dropdown.Item className='p-0'>
            <Link className='w-full px-4 py-2'>VIDEOS</Link>
          </Dropdown.Item>
        </Dropdown>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Link className='flex items-center'>STORE</Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-normal'
      >
        <Dropdown label='TOOLS' inline>
          <Dropdown.Item className='p-0'>
            <Link className='w-full px-4 py-2'>CHECKLIST</Link>
          </Dropdown.Item>
          <Dropdown.Item className='p-0'>
            <Link className='w-full px-4 py-2'>STONE CUTTER</Link>
          </Dropdown.Item>
        </Dropdown>
      </Typography>
    </ul>
  );

  return (
    <section className='bg-[url("/assets/images/hero.png")] md:bg-[center_bottom_5rem] bg-contain bg-no-repeat h-[116vw]'>
      <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 bg-transparent/15 border-0 shadow-none'>
        <div className='flex items-center justify-between text-blue-gray-900'>
          <Logo />
          <div className='flex items-center gap-4'>
            <div className='mr-4 hidden lg:block'>{navList}</div>
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </IconButton>
          </div>
          {stateToken ? (
            <NavProfile user={"user"} />
          ) : (
            <DiscordButton className='lg:flex hidden' />
          )}
        </div>
        <Collapse open={openNav}>
          {/* Mobile Nav */}
          <div></div>
        </Collapse>
      </Navbar>
      <Hero />
      <Recruiting />
    </section>
  );
}
