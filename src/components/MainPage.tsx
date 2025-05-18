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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token && !username) {
        navigate('/login');
    }
    console.log(token);
    console.log("user--->",username);
  }, []);
  
  const username = useSelector((state: RootState) => state.auth.username);
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <>
      <div className='h-full w-full m-0 p-0 flex'>
        <div className='w-1/5 h-full bg-gray-800'>
            <SideBar username={username} onFilter={setFilterType} />
        </div>
        <div className='w-4/5 h-full bg-gray-500 flex flex-col'>
            <div className='h-[80px] bg-gray-600'>
                <TopBar />
            </div>
            <main className='h-full w-full flex flex-col justify-start items-center'>
                <Content filterType={filterType} />
            </main>
        </div>
      </div>
    </>
  )
}

