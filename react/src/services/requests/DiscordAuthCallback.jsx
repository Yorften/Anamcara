import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthRequest from "./auth";
 import {grid} from 'ldrs' 
export default function DiscordAuthCallback() {
  grid.register();
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const formData = new FormData();

  formData.append("code", code);

  useEffect(() => {
    const response = AuthRequest.postAuth(formData);
    response.then((data) => {
      console.log(data);
    });
  });

  return (
    <>
      <div className='h-screen bg-[#313338] flex items-center justify-center'>
        {/* <l-grid size='150' speed='1.5' color='white'></l-grid> */}
        <img
          src='/assets/images/Anamlogo_large_transparent.gif'
          className='h-60 w-60'
          alt=''
        />
      </div>
    </>
  );
}
