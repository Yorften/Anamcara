import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setApplicant } from "../../features/applications/applicantSlice";
import { useEffect } from "react";
import ApplicationRequest from "../../services/requests/application";

export default function Application() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const application = useSelector((state) => state.applicant.applicant);

  useEffect(() => {
    const response = ApplicationRequest.show(id)
  }, [])


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
            <Link className="className='hover:text-blue-500'">Application</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
