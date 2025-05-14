

export default function SideBar({username}: {username: string}) {
  return (
    <>
      <div className='h-full w-full flex justify-start flex-col items-center'>
        <div className='flex items-center w-full mb-10'>
          <img src="/userLogo.jpeg" alt="Logo" className='h-10 w-10 rounded-[100%] m-4' />
          <h1 className='text-white text-2xl pl-2'>{username}</h1>
        </div>
        <h1 className="w-full p-4 text-lg text-white">Filters</h1>
        <div className='flex gap-8 flex-col items-center justify-center w-full h-fit'>

            <button 
                className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
                onClick={() => {
                // Handle share action
                // alert('Share button clicked');
                }}
            >
                Article
            </button>
            <button 
                className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
                onClick={() => {
                // Handle share action
                // alert('Share button clicked');
                }}
            >
                Image
            </button>
            <button 
                className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
                onClick={() => {
                // Handle share action
                // alert('Share button clicked');
                }}
            >
                Auido
            </button>
            <button 
                className='w-[90%] h-[60px] bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded'
                onClick={() => {
                // Handle share action
                // alert('Share button clicked');
                }}
            >
                Video
            </button>
            
        </div>

        <div className="mt-16 flex gap-8 flex-col items-center justify-center w-full h-fit">
            <a
                href="http://localhost:5174/" 
                className='w-[90%] h-[60px] bg-green-500 hover:bg-green-600 text-center text-white px-4 py-2 rounded'
                onClick={() => {
                // Handle share action
                // alert('Share button clicked');
                }}
            >
                Chat
            </a>
            <button 
                className='w-[90%] h-[60px] bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded'
                onClick={() => {
                // Handle share action
                // alert('Share button clicked');
                }}
            >
                Logout
            </button>
        </div>
      </div>
    </>
  )
}
