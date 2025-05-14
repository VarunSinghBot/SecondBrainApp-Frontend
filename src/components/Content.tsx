export default function Content({}) {
  return (
    <>
        <div className='max-h-[700px] w-[90%] flex flex-col justify-start items-center border'>
            <h1 className='text-white text-3xl'>Main Page</h1>
            <p>Content will load here </p>

            <div className="grid grid-cols-3 gap-4 w-full h-full border border-red-400 mt-4">
                <div className="bg-blue-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>Heading 1</h1>
                </div>
                <div className="bg-green-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>Heading 2</h1>
                </div>
                <div className="bg-red-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>heading 3</h1>
                </div>
                <div className="bg-blue-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>Heading 1</h1>
                </div>
                <div className="bg-green-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>Heading 2</h1>
                </div>
                <div className="bg-red-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>heading 3</h1>
                </div>
                {/* <div className="bg-blue-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>Heading 1</h1>
                </div>
                <div className="bg-green-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>Heading 2</h1>
                </div>
                <div className="bg-red-500 h-[300px] w-full rounded-md flex justify-center items-center">
                    <h1 className='text-white text-2xl'>heading 3</h1>
                </div> */}
            
            </div>
        </div>
    </>
  )
}