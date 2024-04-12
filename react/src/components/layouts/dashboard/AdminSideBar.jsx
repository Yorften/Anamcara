import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CgGym } from "react-icons/cg";

export default function AdminSideBar() {
  return (
    <div className='fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 h-full text-white transition-all duration-300 border-none z-10 sidebar'>
      <div className='overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow'>
        <ul className='flex flex-col py-4 space-y-4'>
          <li className='px-5 hidden md:block'>
            <div className='flex flex-row items-center h-8'>
              <div className='text-sm font-light tracking-wide text-white uppercase'></div>
            </div>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-7 [&>svg]:w-7 ml-2 md:ml-4'>
                <MdDashboard />
              </span>
              <span className='ml-2 text-lg tracking-wide truncate'>
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/sessions"}
              className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6'
            >
              <span className='inline-flex justify-center items-center [&>svg]:h-7 [&>svg]:w-7 ml-2 md:ml-4'>
                <CgGym />
              </span>
              <span className='ml-2 text-lg tracking-wide truncate'>
                Sessions
              </span>
            </Link>
          </li>
        </ul>
        <p className='mb-14 px-5 py-3 hidden md:block text-center text-xs'>
          Copyright @2024
        </p>
      </div>
    </div>
  );
}
