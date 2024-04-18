import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthRequest from "./auth";
import { setUser, setToken, setUserRoles } from "../../features/auth/authSlice";

export default function DiscordAuthCallback() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const userRoles = useSelector((state) => state.auth.userRoles);

  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const formData = new FormData();

  formData.append("code", code);

  useEffect(() => {
    const response = AuthRequest.postAuth(formData);
    response.then((data) => {
      console.log(data);
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      dispatch(setUserRoles(data.user_roles));
    });
  }, [dispatch]);

  return (
    <>
      <div className='h-screen bg-[#313338] flex items-center justify-center text-white'>
        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Global Name: {user.global_name}</p>
            <p>Nick: {user.nick}</p>
            <p>Avatar: {user.avatar}</p>
            <p>Refresh Token: {user.refresh_token}</p>
            <p>Joined At: {user.joined_at}</p>
            <p>Created At: {user.created_at}</p>
            <p>Updated At: {user.updated_at}</p>
          </div>
        )}
        {token && (
          <div>
            <p>{token}</p>
          </div>
        )}

        <img
          src='/assets/images/Anamlogo_large_transparent.gif'
          className='h-60 w-60'
          alt=''
        />
      </div>
    </>
  );
}
