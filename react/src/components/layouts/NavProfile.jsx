/* eslint-disable react/prop-types */
import { Avatar, Dropdown } from "flowbite-react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearStore } from "../../features/auth/authSlice";
import { useHasRole } from "../../hooks/useHasRole";
import AuthRequest from "../../services/requests/auth";

export default function NavProfile({ className, user }) {
  const dispatch = useDispatch();
  let imageUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

  const onLogout = () => {
    const response = AuthRequest.logout();
    response
      .then((response) => {
        console.log(response);
        dispatch(clearStore());
        Cookies.remove("token");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`flex md:order-2 px-6 w-[189.33px] ${className}`}>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt='User settings'
            img={imageUrl}
            rounded
            className='pl-14'
          />
        }
      >
        <Dropdown.Header>
          <span className='block text-sm'>{user.nick}</span>
          <span className='block text-xs'>{user.username}</span>
          <span className='block truncate text-sm font-medium'>
            {user.email}
          </span>
        </Dropdown.Header>
        {useHasRole("Officer Team") && (
          <Dropdown.Item>
            <Link to={"/dashboard"}>Dashboard</Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item>
          <Link to={"/settings"}>Settings</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
}

NavProfile.propTypes = {
  user: PropTypes.object.isRequired,
};
