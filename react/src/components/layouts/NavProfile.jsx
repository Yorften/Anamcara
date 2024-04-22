import { Button, Dropdown, Modal } from "flowbite-react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearStore } from "../../features/auth/authSlice";
import { useHasRole } from "../../hooks/useHasRole";
import AuthRequest from "../../services/requests/auth";
import AvatarComponent from "../AvatarComponent";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function NavProfile({ className, user }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  let imageUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

  const onLogout = () => {
    const response = AuthRequest.logout();
    response
      .then(() => {
        dispatch(clearStore());
        Cookies.remove("token");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`flex items-center gap-4 md:order-last px-6 ${className}`}>
      <Modal dismissible show={openModal} size={"5xl"} onClose={() => setOpenModal(false)}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
            <Button color='gray' className="absolute right-0" onClick={() => setOpenModal(false)}>
              Close
            </Button>
        </Modal.Footer>
      </Modal>
      <Dropdown
        arrowIcon={false}
        inline
        label={<AvatarComponent imageUrl={imageUrl} nick={user.nick} />}
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
          <p onClick={() => setOpenModal(true)}>Settings</p>
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
