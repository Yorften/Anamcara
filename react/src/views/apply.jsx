import { useEffect, useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import UserRequest from "../services/requests/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserInGuild, setIsLoading } from "../features/auth/authSlice";
import JoinUs from "../components/layouts/default/JoinUs";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function Apply() {
  const dispatch = useDispatch();
  const userInGuild = useSelector((state) => state.auth.userInGuild);
  const user = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);

  useDocumentTitle("Apply");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserRequest.isUserInGuild();
        dispatch(setUserInGuild(response.userInGuild));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <img
        src='assets/images/welcome-apply.png'
        className='object-contain h-full'
        alt=''
      />

      {isLoading ? (
        <div className='w-full h-80 flex items-center justify-center'>
          <img
            src='/assets/images/Anamlogo_large_transparent.gif'
            className='h-40 w-40'
            alt=''
          />
        </div>
      ) : user === null ? (
        <div>
          <div className='text-5xl'>Pleage log in</div>
        </div>
      ) : !userInGuild ? (
        <div>
          <JoinUs userInGuild={userInGuild} />
        </div>
      ) : (
        <div className='text-5xl'>Apply</div>
      )}
    </>
  );
}
