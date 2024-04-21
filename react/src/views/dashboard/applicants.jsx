import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ApplicationRequest from "../../services/requests/application";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { setApplication } from "../../features/applications/applicationSlice";
import "ldrs/grid";
import moment from "moment";

export default function Applicants() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const applications = useSelector((state) => state.application.applications);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Username",
      selector: (row) => row.user.username,
      sortable: true,
    },
    {
      name: "In Server",
      selector: (row) => row.in_server,
      sortable: true,
    },
    {
      name: "GVG",
      selector: (row) => row.gvg,
      sortable: true,
    },
    {
      name: "GVE",
      selector: (row) => row.gve,
      sortable: true,
    },
    {
      name: "Date",
      format: (row) => moment(row.created_at).format("DD-MM-YYYY"),
      selector: (row) => row.created_at,
      sortable: true,
    },
  ];

  const onRowClicked = (row) => {
    navigate(`/dashboard/applicants/${row.id}`);
  };

  useEffect(() => {
    const response = ApplicationRequest.index();
    response
      .then((data) => {
        console.log(data);
        dispatch(setApplication(data));
        setLoading(false);
        document
          .getElementById("content")
          .children[1].classList.add("opacity-100");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id='content' className='flex flex-col gap-8 h-full lg:h-[85vh]'>
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
              to={"/dashboard/applicants"}
              className="className='hover:text-blue-500'"
            >
              Applicants
            </Link>
          </li>
        </ul>
      </div>
      {loading ? (
        <div className='flex items-center justify-center w-full h-full'>
          <l-grid size='100' speed='1.5' color='black'></l-grid>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={applications}
          pagination
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8]}
          striped={true}
          pointerOnHover={true}
          highlightOnHover={true}
          onRowClicked={onRowClicked}
          className='shadow-xl opacity-0 transition-all duration-500'
          id='table'
        />
      )}
    </div>
  );
}
