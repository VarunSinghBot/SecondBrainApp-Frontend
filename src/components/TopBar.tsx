import { useNavigate } from 'react-router-dom';

interface userProps {
  username: string;
}

export default function TopBar({ username }: userProps) {

  const navigate = useNavigate();

  return (
    <>
      <div className='h-full w-full flex justify-between items-center text-black/75 border border-b-[#1e1e1e40]'>
        {/* Profile  */}
        <div className='flex items-center '>
          <img src="/profile.svg" alt="Logo" className='h-10 w-10 rounded-[100%] m-4 object-cover border border-[#2b2b2b0f]' />
          <span className="pl-2">
            <h1 className='text-md '>{username}</h1>
            <p className="text-sm text-[#00000080]">Hello, Welcome Back!</p>
          </span>
        </div>
        <div className='flex gap-4 items-center pr-4'>
            <button 
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
                onClick={(e) => {
                  e.preventDefault
                  // Handle share action
                //   alert('Add button clicked');
                navigate('/addItem');
                }}
            >Add Item
            </button>
            {/* <button 
                className='bg-red-500 text-white px-4 py-2 rounded'
                onClick={() => {
                  // Handle share action
                  alert('Del button clicked');
                }}
            >Delete
            </button> */}
            <input 
                type="text" 
                className='h-10 w-64 rounded-md p-2 bg-[#00000040] text-white' 
                placeholder='Search...'
                onChange={(e) => {
                    // Handle search input change
                    console.log(e.target.value);
                }}
            />
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
            onClick={() => {
              // Handle share action
              alert('Share button clicked');
            }}
        >Share
        </button>
        </div>
      </div>
    </>
  )
}
