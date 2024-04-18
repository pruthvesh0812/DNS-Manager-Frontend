
import '../App.css'
import NavBar from '../components/ui/NavBar'

import risk from '../img/risk.png'
import upload from '../img/upload.png'

import Title from '../components/ui/Title'


import Filter from '../components/ui/Filter'


import SearchUtil from '../utils/SearchUtil.tsx'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ManageDomainAtom } from '../store/atoms/domains'
import NewRecordList from '../components/ui/NewRecordList'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ENV } from '../App.tsx'
import { useMemo, useState } from 'react'
import { recordInterface } from '../types/recordInterface.ts'
import { Record, RecordCache, singleRecord } from '../store/atoms/records.ts'
import { recordResType } from '../types/recordType.ts'



export const getRecordsForDomain = async (domain:string):Promise<recordResType[]> =>{
  
  const domainName = domain.substring(0,domain.length-1);
  console.log("asdfjasdf",domain,"sdf",domainName)
  return new Promise((resolve,reject)=>{
    axios.get(`${ENV.VITE_APP_BASE_URL}/api/record?domain=${domainName}`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res=>{
      console.log(res.data,"record for domain:",domain)
      resolve(res.data.records)
    }).catch((err) =>{
      console.log(err,"error while fetching records")
      reject(err)
    })
  })
 
}

// const handleRecordCache = (recordCache:recordInterface[],domainName:string, setRecordCache:React.Dispatch<React.SetStateAction<recordInterface[]>>)=>{
 

// }

function ManageDomain() {
 
  const recordCache = useRecoilValue(RecordCache)
  const setRecordCache = useSetRecoilState(RecordCache)
  const setAllRecords = useSetRecoilState(Record)
  const newRecord = useRecoilValue(singleRecord)
  const domainObj = useRecoilValue(ManageDomainAtom)
  const [prevCacheLen,setPrevCacheLen]= useState(recordCache.length)
  console.log(domainObj.name,"do manName")
  

  useMemo(()=>{
    // recently logged in and opening manage domain first time - cache will empty
    // everytime I hit the Link to="/manage" a new component will get mounted - and it will init recordCache to []
    if( recordCache.length == 0 && domainObj.name != undefined){
      setAllRecords([])
      console.log("sdfs",recordCache.length)
      getRecordsForDomain(domainObj.name).then((res)=>{
        console.log(res,"responsekjalsdf")
        setRecordCache(res)
      })
    }
    
    
  },[newRecord])
    let modifiedRecord:recordInterface[]=[]
    if(prevCacheLen != recordCache.length){
       modifiedRecord= recordCache.map(eachRecord =>(
         {
          record: {
            param: {
                Action: "",
                
                ChangeBatch: {
                    Changes: [{
                        Action: "",
                        ResourceRecordSet: {
                            Name: eachRecord.Name,
                            Type: eachRecord.Type,
                           
                           
                            ResourceRecords:eachRecord.ResourceRecords,
                           
                            TTL: eachRecord.TTL,
                         
                        }
                    }],
               
                },
    
                HostedZoneId: domainObj.hostedZoneId
            },
        },
        routingPolicy: "Simple Routing"
      }))
      console.log("this is modifiedRecord",modifiedRecord)
      setAllRecords(prev => [...prev,...modifiedRecord])
      setPrevCacheLen(recordCache.length)
    }
    // useMemo(()=>{
    //   // console.log(domainObj.name, "domain name")
    // console.log(recordCache,"record cache")
    // if(recordCache.length != 0){
    // }
    // },[recordCache])

  
 

  return (

    <div className='flex h-[150vh]'>
      <NavBar />
      <div className='flex flex-col px-32 w-[80vw] py-5 bg-[#08141f] text-slate-100'>
        <div className='font-bold mb-2 flex'>Domain: <p className='ml-2 underline underline-offset-2'>{domainObj.name}</p> </div>
        <Title text="Records" />
        <div className='grid grid-cols-5 mt-2 mb-8 gap-x-3'>
          <div className='col-span-3'>
          <SearchUtil searchType='record' domain={domainObj.name} /> 
          </div>
          <div className='col-span-1 text-black'>
          <Filter allRecords={modifiedRecord}/>
          </div>
        </div>

        <NewRecordList hostedZoneId={domainObj.hostedZoneId} domain={domainObj.name}/>
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
