
import { useRecoilValue } from "recoil"
import { RecordCache } from "../../store/atoms/records"

import AddRecord from "./AddRecord";
import DisplayRecords from "./DisplayRecords";
import { recordInterface } from "../../types/recordInterface";

export default function RecordList({hostedZoneId,domain}:{hostedZoneId:string,domain:string}) {
  const allRecords = useRecoilValue(RecordCache);
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
      <AddRecord />
      </div>

      {(allRecords.length == 0) ?
        <div>
          <h1 className='text-lg text-center mt-8'>No record exists</h1>
        </div>
        :
        <div className="z-10" >
          {
            
            modifiedRecord.map((record, idx) => {
              console.log(record)
              return <div key={idx} className="text-black">
                <DisplayRecords record={record} isEdit={false} hostedZoneId={hostedZoneId} domain={domain}/>
              </div>
            })
          }
        </div>

      }

    </div>
  )
}
