import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Videos() {
  return (
    <div id='content' className='flex flex-col gap-8 h-full'>
      <div className='flex items-center flex-wrap'>
        <ul className='flex items-center'>
          <li className='inline-flex items-center'>
            <Link to={"/dashboard"} className="className='hover:text-blue-500'">
              <MdSpaceDashboard className='h-6 w-6' />
            </Link>
            <span className='mx-4 h-auto text-gray-400 font-medium'>/</span>
          </li>
          <li className='inline-flex items-center'>
            <Link to={"/dashboard/videos"} className="className='hover:text-blue-500'">
              Videos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
