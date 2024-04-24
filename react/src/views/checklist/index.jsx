import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "ldrs/grid";

export default function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className='flex flex-col gap-10 p-4'>
        <p className='text-lg'>
          Checklist{" "}
          <span className='text-xs text-gray-400'>
            Track your daily and weekly tasks with automated resets
          </span>
        </p>
        <div className='overflow-x-auto'>
          <table className='bg-[#141414] border-2 border-[#646464] min-w-[724px] w-full'>
            <thead className='border-2 border-[#646464]'>
              <tr className='*:p-4'></tr>
            </thead>
            <tbody className='[&>*]:[&>*]:p-2 [&>*]:border-b-2 [&>*]:border-[#646464] '>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
