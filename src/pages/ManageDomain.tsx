
import '../App.css'
import NavBar from '../components/ui/NavBar'

import risk from '../img/risk.png'
import upload from '../img/upload.png'

import Title from '../components/ui/Title'


import Filter from '../components/ui/Filter'


import SearchUtil from '../utils/SearchUtil.tsx'
import { useRecoilValue } from 'recoil'
import { ManageDomainAtom } from '../store/atoms/domains'
import RecordList from '../components/ui/RecordList'
import { Link } from 'react-router-dom'



function ManageDomain() {


  const domainName = useRecoilValue(ManageDomainAtom)

  // console.log(domainName, "domain name")

  return (

    <div className='flex h-[100vh]'>
      <NavBar />
      <div className='flex flex-col px-32 w-[80vw] py-5'>
        <h4 className='font-bold mb-2'>{domainName}</h4>
        <Title text="Records" />
        <div className='flex w-full mt-2 mb-8'>
          <SearchUtil searchType='record' />
          <Filter />
        </div>

        <RecordList />
        <div className='mt-8 '>
          {/* <div className='flex justify-end mt-5'>
            <button className='bg-orange-500 text-white px-4 py-1 rounded-sm text-sm font-bold'>Delete Selected</button>
          </div> */}
          <Title text="Upload Records Using CSV" />
          <div className="flex items-center space-x-4 mt-2 mb-8">
            <label htmlFor="file" className='bg-gray-300  text-black px-4 py-2 rounded-sm  text-sm font-bold border-2 border-gray-600 '>
              Choose File
              <input type="file" id="file" className="hidden" />
            </label>
            <div className='relative'>
              <button className=' bg-orange-500 text-white px-4 pr-8 py-3 rounded ml-2 text-sm font-bold'>
                CSV Upload
              </button>
              <img src={upload} alt="" className='absolute right-1 top-2 h-1/2 ' />
            </div>
            <div className='flex'>
              <img src={risk} alt="" className='w-10 ml-5 ' />
              <Link to='/bulk'><h4 className='text-lg text-blue-700 font-normal mt-1 mx-2'>Check format of csv before uploading </h4></Link>
            </div>

          </div>
          <Title text="Delete Domain" />
          <button className='bg-orange-500 text-white px-4 py-2 w-28  rounded text-lg font-medium mt-2'>Delete</button>

        </div>
      </div>
    </div>

  )
}

export default ManageDomain 
