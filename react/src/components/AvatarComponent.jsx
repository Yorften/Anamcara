/* eslint-disable react/prop-types */
import { Avatar } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";

export default function AvatarComponent({
  imageUrl,
  user,
  application,
}) {
  return (
    <div className='flex items-center gap-2'>
      <Avatar
        alt='User settings'
        img={imageUrl}
        rounded
        className='flex items-center'
      />
      {user.nick ? (
        <p>{user.nick}</p>
      ) : (
        <p>{user.username}</p>
      )}
      {!application && <IoIosArrowDown />}
    </div>
  );
}
