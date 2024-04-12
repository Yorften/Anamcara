import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import DiscordButton from "./DiscordButton";
import NavProfile from "../NavProfile";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [stateToken, setStateToken] = useState(false);


  return (
    <Navbar fluid rounded>
      <Link className='flex items-center' to={"/"}>
        <img
          src='/assets/images/icon.png'
          className='mr-3 h-6 sm:h-9'
          alt='Flowbite React Logo'
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold'>
          FitNow
        </span>
      </Link>
      <div className='flex md:order-last'>
        {stateToken ? <NavProfile user={"user"} /> : <DiscordButton />}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href='#' active>
          Home
        </NavbarLink>
        <NavbarLink href='#'>About</NavbarLink>
        <NavbarLink href='#'>Services</NavbarLink>
        <NavbarLink href='#'>Pricing</NavbarLink>
        <NavbarLink href='#'>Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
