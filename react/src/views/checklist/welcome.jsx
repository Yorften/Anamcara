import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/checklist/index");
    }
  }, [navigate, token]);

  return (
    <>
      <div className='text-5xl'>Checklist Welcome</div>
    </>
  );
}
