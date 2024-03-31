import { useState } from 'react'
import down from '../../img/down.png'



export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  // const names = ['Type', 'Routing Policy', 'Alice', 'TTL']; // Sample list of names

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='w-full'>
      <div className="relative ml-1 w-full h-[7vh] bg-white flex z-20">

        <h4 className=' px-2 text-lg pt-2'>Filter</h4>

        <button
          onClick={toggleFilter}
          className="flex  px-4 mt-2 ml-16 h-[5vh] w-[50%] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm "
        >
          <img src={down} alt="" className='w-5 absolute right-10 top-[30%]' />
        </button>
        {isOpen && (
          <div className="absolute right-0 w-full mt-2 top-6 origin-top-right  bg-white rounded-md shadow-lg">
            <div className="px-2 py-2 space-y-1">
              <div className="p-4 pb-0">
                {/* <CheckboxList names={names} /> */}
              </div>
              <div className='flex'>
                <label className="text-sm pl-4">Value</label>
                <input type="text" name="" id="" className='border-2 w-[6vw] ml-4 h-[4vh] border-gray-400' />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
