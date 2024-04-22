import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user === null) {
      navigate("/checklist");
    }
  }, []);

  return (
    <>
      <div className='my-20 mx-6 md:mx-20 flex flex-col gap-10'>
        <div className='text-5xl'>Index</div>
      </div>
    </>
  );
}
