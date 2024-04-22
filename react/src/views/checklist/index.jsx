import { useSelector } from "react-redux";

export default function Index() {
  const user = useSelector((state) => state.auth.user);



  return (
    <>
        <div className='text-5xl'>Index</div>
    </>
  );
}
