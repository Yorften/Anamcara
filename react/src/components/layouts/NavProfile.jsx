import { Avatar, Dropdown } from "flowbite-react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export default function NavProfile({ user }) {
  return (
    <div className='flex md:order-2'>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt='User settings'
            img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className='block text-sm'>{user.name}</span>
          <span className='block truncate text-sm font-medium'>
            {user.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link to={"/dashboard"}>Dashboard</Link>
        </Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}

NavProfile.propTypes = {
  user: PropTypes.object.isRequired,
};
