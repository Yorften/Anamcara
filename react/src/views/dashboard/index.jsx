import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div id='content' className='flex flex-col gap-8 h-full'>
      <div className='flex items-center flex-wrap'>
        <ul className='flex items-center'>
          <li className='inline-flex items-center'>
            <Link to={"/dashboard"} className='flex items-center gap-4 hover:text-blue-500'>
              <MdSpaceDashboard className='h-6 w-6' />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
