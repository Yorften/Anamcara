import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className='flex items-center w-fit' to={"/"}>
      <img
        src='/assets/images/icon.png'
        className='mr-3 h-6 sm:h-9'
        alt='Anamcara Logo'
      />
      <span className='self-center whitespace-nowrap text-xl font-semibold'>
        Anamcara
      </span>
    </Link>
  );
}
