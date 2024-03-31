import { useState } from "react";

import down from '../img/down.png'

function Type(props:any){
    const [isOpenType, setIsOpenType] = useState(false);
    const openType = () => {
        setIsOpenType(!isOpenType);
      };

    return(
        <div className="relative  bg-white flex">
                    <button
                    onClick={openType}
                    className="flex pr-5 pl-1 mt-1 h-[4vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm "
                    >
                        {props.text}
                    <img src={down} alt="" className='w-[10%] absolute left-[40%] top-[38%]'/>
                    </button>
                    {isOpenType && (
                      <div className="absolute right-0 w-full mt-2 top-6 origin-top-right rounded-md shadow-lg">
                        <div className="px-2 py-2 space-y-1">

                        </div>
                    </div>
                    )}
                </div>
    )
}


export default function ExampleDomain() {
    const [isOpenType, setIsOpenType] = useState(false);
  const [isOpenRP, setIsOpenRP] = useState(false);
  const [isOpenAlias, setIsOpenAlias] = useState(false);
  const [isOpenTTL, setIsOpenTTL] = useState(false);

 

  const openType = () => {
    setIsOpenType(!isOpenType);
  };

  const openRP = () => {
    setIsOpenRP(!isOpenRP);
  };

  const openAlias = () => {
    setIsOpenAlias(!isOpenAlias);
  };
  
  const openTTL = () => {
    setIsOpenTTL(!isOpenTTL);
  };

  return (
    <div>
      <div className='grid grid-cols-8 gap-x-4'>
            <div className='col-span-1'>
                <h5 className='text-xs'>Record Name</h5>
                <input type="text" placeholder='Enter Name' className='text-xs border-2 w-[7vw] pl-2 h-[4vh]'/>

            </div>
            <div className='col-span-1 ml-3'>
                <h5 className='text-xs'>Type</h5>
                <div className="relative  bg-white flex">
                    <button
                    onClick={openType}
                    className="flex pr-8 pl-1 mt-1 h-[4vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm "
                    >
                        
                    <img src={down} alt="" className='w-[10%] absolute left-[40%] top-[38%]'/>
                    </button>
                    {isOpenType && (
                      <div className="absolute right-0 w-full mt-2 top-6 origin-top-right rounded-md shadow-lg">
                        <div className="px-2 py-2 space-y-1">

                        </div>
                    </div>
                    )}
                </div>
                <Type text="A"/>
                <Type text="A"/>
            </div>
            <div className='col-span-1'>
                <h5  className='text-xs'>Value</h5>
                <input type="text"  className='border-2 w-[5vw] h-[4vh]'/>

            </div>
            <div className='col-span-1'>
                <h5  className='text-xs'>Routing Policy</h5>
                <div className="relative  bg-white flex">
                    <button
                    onClick={openRP}
                    className="flex justify-between px-4 mt-1  h-[4vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm "
                    >
                    <img src={down} alt="" className='w-[10%] absolute left-[20%] top-[18%]'/>
                    </button>
                    {isOpenRP && (
                      <div className="absolute right-0 w-full mt-2 top-6 origin-top-right bg-orange-100 rounded-md shadow-lg">
                        <div className="px-2 py-2 space-y-1">

                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className='col-span-1'>
                <h5  className='text-xs'>Alias</h5>
                <div className="relative bg-white flex">
                    <button
                    onClick={openAlias}
                    className="flex justify-between px-4 mt-1  h-[4vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm "
                    >
                    <img src={down} alt="" className='w-[10%] absolute left-[20%] top-[18%]'/>
                    </button>
                    {isOpenAlias && (
                      <div className="absolute right-0 w-full mt-2 top-6 origin-top-right bg-orange-100 rounded-md shadow-lg">
                        <div className="px-2 py-2 space-y-1">

                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className='col-span-1'>
                <h5  className='text-xs'>TTL</h5>
                <div className="relative bg-white flex">
                    <button
                    onClick={openTTL}
                    className="flex justify-between px-4 mt-1  h-[4vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm "
                    >
                    <img src={down} alt="" className='w-[10%] absolute left-[20%] top-[18%]'/>
                    </button>
                    {isOpenTTL && (
                      <div className="absolute right-0 w-full mt-2 top-6 origin-top-right bg-orange-100 rounded-md shadow-lg">
                        <div className="px-2 py-2 space-y-1">

                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
