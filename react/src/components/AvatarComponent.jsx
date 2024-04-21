import { Avatar } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";

// eslint-disable-next-line react/prop-types
export default function AvatarComponent({ imageUrl, nick }) {
  return (
    <div className='flex items-center gap-1'>
      <Avatar
        alt='User settings'
        img={imageUrl}
        rounded
        className='flex items-center'
      />
      <p>{nick}</p>
      <IoIosArrowDown />
    </div>
  );
}
