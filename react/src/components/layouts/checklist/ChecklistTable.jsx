import { useSelector, useDispatch } from "react-redux";

export default function ChecklistTable() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.character.characters);
  const tasks = useSelector((state) => state.task.tasks);
  const custom = useSelector((state) => state.task.custom);
  const loading = useSelector((state) => state.character.loading);

  const tableHeads = characters.map((character) => (
    <td key={character.id} className='border-2 border-[#646464]'>
      <div className='flex items-center justify-center'>
        <img
          src={`/public/assets/Icons/classes/${character.icon.path}`}
          className='w-6 object-cover'
          alt=''
        />
        <p>{character.name}</p>
      </div>
      [{character.ilvl}]
    </td>
  ));

  const tableRows = tasks
    .map((task) => (
      <tr key={task.id}>
        <td className='border-2 border-[#646464]'>
          <div className='flex items-center justify-center'>
            <img
              src={`/public/assets/Icons/tasks/${task.icon.path}`}
              className='w-6 h-6'
              alt=''
            />
            <p>{task.name}</p>
          </div>
        </td>
        {task.characters.map((progress) => (
          <td
            key={progress.id}
            className='text-center border-2 border-[#646464]'
          >
            <p>
              {progress.pivot.progress}/{task.repetition}
            </p>
          </td>
        ))}
      </tr>
    ))
    .concat(
      custom.map((task) => (
        <tr key={task.id}>
          <td className='border-2 border-[#646464]'>
            <div className='flex items-center justify-center'>
              <img
                src={`/public/assets/Icons/tasks/${task.icon.path}`}
                className='w-6 h-6'
                alt=''
              />
              <p>{task.name}</p>
            </div>
          </td>
          {task.characters.map((progress) => (
            <td
              key={progress.id}
              className='text-center border-2 border-[#646464]'
            >
              <p>
                {progress.pivot.progress}/{task.repetition}
              </p>
            </td>
          ))}
        </tr>
      ))
    );
  return (
    <>
      <table className='bg-[#141414] border-2 border-[#646464] min-w-[924px] min-h-screen w-full'>
        <thead className='border-2 border-[#646464]'>
          <tr className='*:p-4 text-center'>
            <td className='w-[10%] border-2 border-[#646464]'>Task</td>
            {tableHeads}
          </tr>
        </thead>
        <tbody className='[&>*]:[&>*]:px-2 [&>*]:[&>*]:py-3 [&>*]:border-b-2 [&>*]:border-[#646464] '>
          {tableRows}
        </tbody>
      </table>
    </>
  );
}
