import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "ldrs/grid";
import CharacterRequest from "../../services/requests/character";
import { setCharacters } from "../../features/characters/characterSlice";

export default function Index() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.character.characters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = CharacterRequest.checklist();
    response
      .then((data) => {
        console.log(data);
        dispatch(setCharacters(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
