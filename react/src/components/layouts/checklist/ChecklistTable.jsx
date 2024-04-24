import { useSelector } from "react-redux";
import { VscRefresh } from "react-icons/vsc";
import TaskRequest from "../../../services/requests/task";

export default function ChecklistTable() {
  const characters = useSelector((state) => state.character.characters);
  const tasks = useSelector((state) => state.task.tasks);
  const custom = useSelector((state) => state.task.custom);

  const handleClick = (charId, taskId) => {
    const checkboxElement = document.getElementById(
      "checkbox" + charId + taskId
    );
    if (checkboxElement.hasAttribute("disabled")) {
      return;
    }
    let array = checkboxElement.innerHTML.split("/");
    let currentProgress = ++array[0];
    let max = array[1];
    checkboxElement.innerHTML = `${currentProgress}/${max}`;

    TaskRequest.progress({
      char_id: charId,
      task_id: taskId,
      progress: currentProgress,
    });

    if (currentProgress == max) {
      checkboxElement.setAttribute("disabled", "");
      checkboxElement.classList.remove("cursor-pointer");
      checkboxElement.parentElement.parentElement.classList.add(
        "bg-green-500/20"
      );
      checkboxElement.nextElementSibling.classList.remove("hidden");
      return;
    }
  };

  const refresh = (charId, taskId) => {
    TaskRequest.refresh({ char_id: charId, task_id: taskId });

    const checkboxElement = document.getElementById(
      "checkbox" + charId + taskId
    );

    let array = checkboxElement.innerHTML.split("/");
    let max = array[1];
    checkboxElement.innerHTML = `0/${max}`;
    checkboxElement.removeAttribute("disabled");
    checkboxElement.classList.add("cursor-pointer");
    checkboxElement.parentElement.parentElement.classList.remove(
      "bg-green-500/20"
    );
    checkboxElement.nextElementSibling.classList.add("hidden");
  };

  const tableHeads = characters.map((character) => {
    const width = `${90 / characters.length}%`;

    return (
      <td
        key={character.id}
        className={`border-2 border-[#646464] w-[${width}]`}
      >
        <div className='flex flex-wrap items-center justify-center'>
          <img
            src={`/assets/Icons/classes/${character.icon.path}`}
            className='w-6 object-cover'
            alt=''
          />
          <p>{character.name}</p>
        </div>
        <p>[{character.ilvl}]</p>
      </td>
    );
  });

  const tableRows = tasks
    .map((task) => (
      <tr key={task.id}>
        <td className='border-2 border-[#646464]'>
          <div className='flex flex-wrap items-center min-w-24 justify-center'>
            <img
              src={`/assets/Icons/tasks/${task.icon.path}`}
              className='w-6 h-6'
              alt=''
            />
            <p className='text-center'>{task.name}</p>
          </div>
        </td>
        {task.characters.map((character) =>
          character.pivot.progress === task.repetition ? (
            <td
              key={character.id}
              className='text-center border-2 border-[#646464] bg-green-500/20'
            >
              <div className='flex items-center justify-center gap-2'>
                <div
                  id={`checkbox${character.id}${task.id}`}
                  onClick={() => handleClick(character.id, task.id)}
                  className=' bg-transparent/50 px-4 py-2 rounded hover:bg-transparent/25 select-none'
                  disabled
                >
                  {character.pivot.progress}/{task.repetition}
                </div>
                <VscRefresh
                  onClick={() => refresh(character.id, task.id)}
                  className='inline-block p-1 bg-gray-600/20 rounded w-5 h-5 cursor-pointer'
                />
              </div>
            </td>
          ) : (
            <td
              key={character.id}
              className='relative text-center border-2 border-[#646464]'
            >
              <div className='flex items-center justify-center gap-2'>
                <div
                  id={`checkbox${character.id}${task.id}`}
                  onClick={() => handleClick(character.id, task.id)}
                  className=' bg-transparent/50 px-4 py-2 rounded cursor-pointer hover:bg-transparent/25 select-none'
                >
                  {character.pivot.progress}/{task.repetition}
                </div>
                <VscRefresh
                  onClick={() => refresh(character.id, task.id)}
                  className='hidden inline-block p-1 bg-gray-600/20 rounded w-5 h-5 cursor-pointer'
                />
              </div>
            </td>
          )
        )}
      </tr>
    ))
    .concat(
      custom.map((task) => (
        <tr key={"prog" + task.id}>
          <td className='border-2 border-[#646464]'>
            <div className='flex items-center justify-center'>
              <img
                src={`/assets/Icons/tasks/${task.icon.path}`}
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
