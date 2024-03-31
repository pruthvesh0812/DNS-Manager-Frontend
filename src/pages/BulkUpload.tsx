import React from 'react'
import NavBar from '../components/ui/NavBar'
import Title from '../components/ui/Title'
import csvImg from '../img/csv.jpg'
import download from '../img/download.png'
import upload from '../img/upload.png'

export default function BulkUpload() {
    return (
        <div>
            <div className='flex  h-[100vh] bg-gray-50'>
                <NavBar />
                <div className='px-32 w-[80vw] pt-20'>
                    <Title text="CSV Format" />
                    <h4 className='text-sm'>This is the csv format to upload records in bulk in a csv file. Click <strong><em>Download</em></strong> to download the csv and edit</h4>
                    <img src={csvImg} alt="" className='w-[100vw] my-3' />
                    <div>
                        <div className='flex relative justify-end mb-5'>
                            <button className='bg-orange-500 text-white px-4 pr-8 py-1 rounded-sm ml-2 text-sm font-bold'>Download</button>
                            <img src={download} alt="" className='absolute right-[1%] top-2 h-1/2' />

                        </div>
                        <Title text="Upload Records Using CSV" />
                        <div className="flex items-center space-x-4 mt-3">
                            <label htmlFor="file" className='bg-gray-400 text-black px-4 py-1 rounded-sm  text-sm font-bold border-2 border-gray-600 '>
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

                    </div>
                </div>
            </div>
        </div>
    )
}
