// import React, { useState } from 'react'
import '../App.css'
import NavBar from '../components/ui/NavBar'
import search from '../img/search.png'
// import down from '../img/down.png'
// import download from '../img/download.png'
import upload from '../img/upload.png'
// import risk from '../img/risk.png'
import Title from '../components/ui/Title'
// import ExampleDomain from '../components/ExampleDomain'
import SubExample from '../components/ui/SubExample'
import Filter from '../components/ui/Filter'
// import { manageDomain } from '../types/manageDomainTypes'


// function Manage({name}:manageDomain){
//   return(
//     <div className='bg-white mt-2 pt-1 flex justify-between h-[7vh] rounded-sm px-4 '>
//       <h6 className='font-bold'>{name}</h6>
//       <h6 className='font-semibold text-blue-600 text-base'>Manage Domain</h6>
//     </div>
//   )
// }



function ManageDomain() {

  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpenType, setIsOpenType] = useState(false);
  // const [isOpenRP, setIsOpenRP] = useState(false);
  // const [isOpenAlias, setIsOpenAlias] = useState(false);
  // const [isOpenTTL, setIsOpenTTL] = useState(false);

  // const toggleFilter = () => {
  //   setIsOpen(!isOpen);
  // };

  // const openType = () => {
  //   setIsOpenType(!isOpenType);
  // };

  // const openRP = () => {
  //   setIsOpenRP(!isOpenRP);
  // };

  // const openAlias = () => {
  //   setIsOpenAlias(!isOpenAlias);
  // };

  // const openTTL = () => {
  //   setIsOpenTTL(!isOpenTTL);
  // };

  return (

    <div className='flex h-[100vh]'>
      <NavBar />
      <div className='flex flex-col px-32 w-[80vw] pt-5'>
        <h4 className='font-bold mb-2'>example1.com</h4>
        <Title text="Records" />
        <div className='flex w-full mt-2 mb-8'>
          <div className='relative'>
            <input type="text" placeholder='Search' className='pl-10 rounded-sm w-[44vw] h-[7vh] border-2 border-gray-800 hover:border-gray-100 focus:border focus:border-orange-100' />
            <img src={search} alt="" className='w-[3%] absolute top-3 left-2' />
          </div>
          <Filter />
        </div>
        <SubExample />
        <div>
          <div className='flex justify-end mt-5'>
            <button className='bg-orange-500 text-white px-4 py-1 rounded-sm text-sm font-bold'>Delete Selected</button>
          </div>
          <Title text="Upload Records Using CSV" />
          <div className="flex items-center space-x-4 mt-2 mb-4">
            <label htmlFor="file" className='bg-gray-300 text-black px-4 py-1 rounded-sm  text-sm font-bold border-2 border-gray-600 '>
              Choose File
              <input type="file" id="file" className="hidden" />
            </label>
            <div className='relative'>
              <button className=' bg-orange-500 text-white px-4 pr-8 py-1 rounded-sm ml-2 text-sm font-bold'>
                CSV Upload
              </button>
              <img src={upload} alt="" className='absolute right-[7%] top-2 h-1/2' />
            </div>

          </div>
          <Title text="Delete Domain" />
          <button className='bg-orange-500 text-white px-4 py-1 rounded-sm text-sm font-bold mt-2'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ManageDomain 
