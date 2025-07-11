import TopBar from './TopBar'
import SideBar from './SideBar'
import Content from './Content'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MainPage() {

  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string | null>(null);

  // Try Redux first, fallback to localStorage
  const reduxUsername = useSelector((state: RootState) => state.auth.username);
  const [username, setUsername] = useState<string | null>(reduxUsername);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth/login');
    }
    // If Redux username is missing, get from localStorage
    if (!reduxUsername) {
      const stored = localStorage.getItem('username');
      if (stored) setUsername(stored.replace(/^"|"$/g, "")); // Remove quotes if stored as JSON string
    } else {
      setUsername(reduxUsername);
    }
  }, [navigate, reduxUsername]);

  return (
    <>
      <div className='h-full w-full m-0 p-0 flex bg-[#faf9f6] border overflow-x-hidden '>
        <div className='w-1/5 h-full bg-[#faf9f6]'>
            <SideBar onFilter={setFilterType} />
        </div>
        <div className='w-4/5 h-full bg-[#faf9f6] flex flex-col'>
            <div className='h-[80px] bg-[#faf9f6]'>
                <TopBar username={username || ""}/>
            </div>
            <main className='h-full w-full flex flex-col justify-start items-center bg-[#faf9f6]'>
                <Content filterType={filterType} />
            </main>
        </div>
      </div>
    </>
  )
}

