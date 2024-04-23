import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../../features/characters/characterSlice";
import { useEffect, useRef, useState } from "react";
import CharacterRequest from "../../services/requests/character";
import Swal from "sweetalert2/src/sweetalert2.js";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function Characters() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const characters = useSelector((state) => state.character.characters);
  const 
  const idRef = useRef(null);
  const nameRef = useRef();
  const noteRef = useRef();
  const ilvlRef = useRef();
  const iconRef = useRef();

  let tableRows = null;

  if (characters) {
    tableRows = characters.map((character) => (
      <tr key={character.id}>
        <td>
          <input type='hidden' name='id' value={character.id}/>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              name='name'
              value={character.name}
              className='bg-[#313338] p-2 rounded-sm'
            />
            <div>
              ilvl:
              <input
                type='text'
                name='ilvl'
                className='bg-[#313338] ml-1 p-1 rounded-sm w-2/3 inline-block'
                value={character.ilvl}
              />
            </div>
          </div>
        </td>
        <td>
          <textarea
            name='note'
            id=''
            rows='3'
            className='bg-[#313338] w-full text-sm'
            placeholder='Custom note, you can use it to set your bifrost info ect...'
            value={character.note}
          ></textarea>
        </td>
        <td>
          <select
            name='icon'
            defaultValue='Select...'
            className='w-full bg-[#313338] text-sm'
            value={character.class_icon_id}
          ></select>
        </td>
        <td className=' text-center'>
          <RiDeleteBin2Line
            className='h-6 w-6 inline-block'
            onClick={deleteCharacter}
          />
        </td>
      </tr>
    ));
  }

  const deleteCharacter = () => {};

  useEffect(() => {
    const response = CharacterRequest.index();
    response
      .then((data) => {
        dispatch(setCharacters(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          html: "unkown error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  }, []);

  return (
    <>
      <div className='flex flex-col gap-10 p-4'>
        <p className='text-lg'>
          Roster manager{" "}
          <span className='text-xs text-gray-400'>
            Manage & configure your roster
          </span>
        </p>
        <table className=' w-full bg-[#313338] border-2 border-gray-500'>
          <thead className='border-2 border-gray-500'>
            <tr className='*:p-4'>
              <th className='w-4/12 text-left indent-4 font-light text-xl border-gray-500'>
                Characters
              </th>
              <th className='w-4/12'></th>
              <th className='w-3/12'></th>
              <th className='w-1/12'></th>
            </tr>
          </thead>
          <tbody className='[&>*]:[&>*]:p-2 [&>*]:border-b-2 [&>*]:border-gray-500 '>
            {loading && <tr></tr>}
            {!loading && characters ? (
              <tr>
                <td colSpan={4} className='text-center'>
                  No characters found
                </td>
              </tr>
            ) : (
              { tableRows }
            )}
          </tbody>
        </table>
        <table className=' w-full bg-[#313338] border-2 border-gray-500'>
          <thead className='border-2 border-gray-500'>
            <tr className='*:p-4'>
              <th colSpan={4} className='w-4/12 text-left indent-4 font-light text-xl border-gray-500'>
                Add a character
              </th>
           
            </tr>
          </thead>
          <tbody className='[&>*]:[&>*]:p-2 [&>*]:border-b-2 [&>*]:border-gray-500 '>
            <tr>
              <td>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
