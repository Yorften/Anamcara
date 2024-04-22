import { useSelector } from "react-redux";
export default function Welcome() {
  const user = useSelector((state) => state.auth.user);


  return (
    <>
      <div className='relative px-4 md:px-14 bg-cover w-full h-[70vh] bg-fixed bg-center bg-no-repeat bg-[url("/assets/images/legion-commanders.png")]'>
        <div className='absolute stroke-1 top-36 text-5xl lg:text-[66px]'>
          Welcome to checklist tool!
        </div>
      </div>
      <div className='my-20 mx-6 md:mx-20 flex flex-col gap-10'>
        {user === null && (
          <p className='text-2xl underline'>
            You must be logged in to use the checklist tool!
          </p>
        )}

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor saepe
          sequi numquam aspernatur libero molestias labore, eaque deserunt
          impedit vel reiciendis aliquam delectus odio enim ratione quasi
          necessitatibus beatae harum!
        </p>
      </div>
    </>
  );
}
