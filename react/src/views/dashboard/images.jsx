import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Images() {
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
            <Link
              to={"/dashboard/images"}
              className="className='hover:text-blue-500'"
            >
              Images
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
