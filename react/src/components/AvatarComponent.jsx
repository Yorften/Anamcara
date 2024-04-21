import { Avatar } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";

export default function AvatarComponent({
  imageUrl,
  nick,
  username,
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
      {nick ? <p>{nick}</p> : <p>{username}</p>}
      {!application && <IoIosArrowDown />}
    </div>
  );
}
