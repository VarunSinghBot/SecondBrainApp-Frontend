import React from "react";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  username: string;
  onFilter?: (type: string | null) => void;
}

export default function SideBar({ username, onFilter }: SideBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // If you use Redux for auth, also dispatch a logout action here
    navigate("/login");
  };

  return (
    <>
      <div className='h-full w-full flex justify-start flex-col items-center'>
        <div className='flex items-center w-full mb-10'>
          <img src="/userLogo.jpeg" alt="Logo" className='h-10 w-10 rounded-[100%] m-4' />
          <h1 className='text-white text-2xl pl-2'>{username}</h1>
        </div>

        <div className="w-full p-4 flex justify-between">
          <h1 className=" text-lg text-white">Filters</h1>
          <button
            className='w-[45%] h-[40px] bg-red-500 hover:bg-red-700 text-white rounded'
            onClick={() => onFilter && onFilter(null)}
          >
            Remove Filters
          </button>
        </div>

        <div className='flex gap-8 flex-col items-center justify-center w-full h-fit'>
          <button
            className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
            onClick={() => onFilter && onFilter("article")}
          >
            Article
          </button>
          <button
            className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
            onClick={() => onFilter && onFilter("image")}
          >
            Image
          </button>
          <button
            className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
            onClick={() => onFilter && onFilter("audio")}
          >
            Audio
          </button>
          <button
            className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
            onClick={() => onFilter && onFilter("video")}
          >
            Video
          </button>
        </div>

        <div className="mt-16 flex gap-8 flex-col items-center justify-center w-full h-fit">
          <a
            href="http://localhost:5174/"
            className='w-[90%] h-[60px] flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-center text-white rounded'
          >
            Chat
          </a>
          <button
            className='w-[90%] h-[60px] bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
