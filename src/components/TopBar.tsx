import { useNavigate } from 'react-router-dom';

export default function TopBar() {

  const navigate = useNavigate();

  return (
    <>
      <div className='h-full w-full flex justify-between items-center'>
        <div className='flex items-center'>
          <img src="/Logo.png" alt="Logo" className='h-10 w-10 rounded-md m-4' />
          <h1 className='text-white text-2xl pl-2'>Second Brain App</h1>
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
                className='h-10 w-64 rounded-md p-2 bg-[#ffffff40] text-white' 
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
