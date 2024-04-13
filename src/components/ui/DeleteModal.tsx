import React from 'react'

export default function DeleteModal({handleDelete}:{ handleDelete:(isDelete:boolean)=>void}) {
  return (
    <div className='fixed top-0 left-0 bg-black/50 flex justify-center items-center w-[100%] h-[100%] z-40'>
      <div className='bg-slate-100 p-20 text-slate-950 font-medium text-lg rounded w-[60%]'>
        <h1>Are you sure you want to delete this HostedZone? All your records associated with this hostedZone will also be deleted</h1>
        <div className='flex justify-around gap-x-10 my-5'>
            <button className='px-4 py-2 w-20 rounded bg-red-600 text-white' onClick={()=>{handleDelete(true)}}>Yes</button>
            <button className='px-4 py-2 w-20 rounded bg-slate-800 text-white' onClick={()=>{  handleDelete(false)}}>No</button>
        </div>
      </div>
    </div>
  )
}
