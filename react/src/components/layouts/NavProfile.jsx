/* eslint-disable react/prop-types */
import { Avatar, Dropdown } from "flowbite-react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import AuthRequest from "../../services/requests/auth";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearStore } from "../../features/auth/authSlice";

export default function NavProfile({ className, user }) {
  const dispatch = useDispatch();
  let imageUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

  const onLogout = () => {
    dispatch(clearStore());
    Cookies.remove('token');
  };

  return (
    <div className={`flex md:order-2 ${className}`}>
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt='User settings' img={imageUrl} rounded />}
      >
        <Dropdown.Header>
          <span className='block text-sm'>{user.nick}</span>
          <span className='block text-xs'>{user.username}</span>
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
        <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}

NavProfile.propTypes = {
  user: PropTypes.object.isRequired,
};
