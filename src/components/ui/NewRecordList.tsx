
import { useRecoilValue, useSetRecoilState } from "recoil"
import {  RecordCache} from "../../store/atoms/records"

import AddRecord from "./AddRecord";
import DisplayRecords from "./DisplayRecords";
import { recordInterface } from "../../types/recordInterface";
import axios from "axios";
import { ENV } from "../../App";
import { getRecordsForDomain } from "../../pages/ManageDomain";
import { useState } from "react";
import Spinner from "./Spinner";




export default function RecordList({hostedZoneId,domain}:{hostedZoneId:string,domain:string}) {
  const allRecords = useRecoilValue(RecordCache);
  const setRecordCache = useSetRecoilState(RecordCache)
  const [spinner,setSpinner] = useState(false)
  const addNewRec = async (hostedZoneId:string,newRecord:recordInterface)=>{
    const newRecordCopy:recordInterface = JSON.parse(JSON.stringify(newRecord));
  
    newRecordCopy.record.param.ChangeBatch.Changes[0].Action = "CREATE"
    newRecordCopy.record.param.HostedZoneId = hostedZoneId
    const response = await axios.post(`${ENV.VITE_APP_BASE_URL}/api/record/create`, {newRecordCopy,hostedZoneId:hostedZoneId}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response)
    if(response.status == 200){
      getRecordsForDomain(domain).then((data)=>{
        setRecordCache(data)
        setSpinner(false)
      })
    }
  }

  const modifiedRecord:recordInterface[] = allRecords.map(eachRecord =>(
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

           HostedZoneId: hostedZoneId
       },
   },
   routingPolicy: "Simple Routing"
 }))
  console.log(modifiedRecord, "allRecords")
  return (
    <div>
      {
        spinner ? (
          <div>
            <Spinner />
          </div>
        ): <div></div>
      }
      <div className='grid grid-cols-7'>
        <div className='col-span-1 text-center'>
          <h4 className='text-lg'>Record</h4>
        </div>
        <div className='col-span-1 text-center'>
          <h4 className='text-lg '>Type</h4>
        </div>
        <div className='col-span-1  text-center'>
          <h4 className='text-lg '>Value</h4>
        </div>
        <div className='col-span-1  text-center'>
          <h4 className='text-lg'>Routing Policy</h4>
        </div>
        <div className='col-span-1  text-center '>
          <h4 className='text-lg'>Alias</h4>
        </div>
        <div className='col-span-1  text-center'>
          <h4 className='text-lg'>TTL</h4>
        </div>
      </div>

      <div className="text-black">
      <AddRecord addNewRec={addNewRec} hostedZoneId={hostedZoneId} setSpinner={setSpinner}/>
      </div>

      {(allRecords.length == 0) ?
        <div>
          <h1 className='text-lg text-center mt-8'>No record exists</h1>
        </div>
        :
        <div className="z-10 rounded-md border-sky-800 border my-8  overflow-hidden h-[80%]" >
          <div className=" overflow-y-auto max-h-[110%]">
          {
            
            modifiedRecord.map((record, idx) => {
              console.log(record)
              return <div key={idx} className="text-black">
                <DisplayRecords record={record} isEdit={false} hostedZoneId={hostedZoneId} domain={domain} setSpinner={setSpinner}/>
              </div>
            })
          }
          </div>
        </div>

      }

    </div>
  )
}
