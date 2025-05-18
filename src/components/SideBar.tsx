import { useNavigate } from "react-router-dom";

interface SideBarProps {
  onFilter?: (type: string | null) => void;
}

export default function SideBar({ onFilter }: SideBarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // If you use Redux for auth, also dispatch a logout action here
    navigate("/login");
  };

  const buttonItems = [
    { label: "Article", type: "article" },
    { label: "Image", type: "image" },
    { label: "Audio", type: "audio" },
    { label: "Video", type: "video" },
  ];

  return (
    <>
      <div className='h-full w-full flex justify-start flex-col items-center sticky text-black/75 bg-[#faf9f6] border border-r-[#1e1e1e40]'>
        {/* Logo  */}
        <div className='flex items-center justify-start w-full mb-10'>
          <img src="/Logo.png" alt="Logo" className='h-10 w-10 rounded-md m-4' />
          <h1 className='text-[#e1434bf0] text-2xl'><b>Second Brain App</b></h1>
        </div>
        {/* <div className="w-full h-[1px] bg-[#1e1e1e40] mb-4"/> */}
        
        {/* Filters */}
        <div className="w-full p-4 flex justify-between">
          <h1 className="text-lg w-full flex items-center justify-start"><b>Filter</b></h1>

          
          <button
            className='w-[45%] h-[40px] text-white border border-[#1e1e1e0f] bg-[#e1434b] rounded'
            onClick={() => onFilter && onFilter(null)}
          >
            Reset
          </button>
        </div>
        
        {/* Filter Buttons */}
        <div className='flex gap-8 flex-col items-center justify-center w-full h-fit'>
          {
            buttonItems.map((item) => (
              <button
                key={item.type}
                className='w-[82%] h-[52px] border border-[#1e1e1e40] bg-transparent hover:bg-[#e1434b] hover:text-white rounded'
                onClick={() => onFilter && onFilter(item.type)}
              >
                {item.label}
              </button>
            ))
          }
        </div>
        
        {/* line  */}
        <div className="mt-8 w-full h-[1px] bg-[#1e1e1e40]"/>
          
        <div className="mt-8 flex gap-8 flex-col items-center justify-center w-full h-fit">

          <a
            href="http://localhost:5174/"
            className='w-[90%] h-[60px] flex flex-col items-center justify-center border border-green-500 text-green-500 bg-white hover:bg-green-500/25 transition-shadow duration-300 hover:shadow-[6px_6px_0px_0px_#00000080] text-center  rounded'
          >
            Chat
          </a>

          <button
            className='w-[90%] h-[60px] bg-[#e1434b] hover:bg-[#e1434b] text-white transition-shadow duration-300 hover:border-black hover:shadow-[6px_6px_0px_0px_#00000080] px-4 py-2 rounded'
            onClick={handleLogout}
          >
            Logout
          </button>
          
        </div>
      </div>
    </>
  );
}
