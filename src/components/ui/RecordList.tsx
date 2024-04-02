
import { useRecoilValue } from "recoil"
import { Record } from "../../store/atoms/records"

import AddRecord from "./AddRecord";
import DisplayRecords from "./DisplayRecords";

export default function RecordList() {
  const allRecords = useRecoilValue(Record);
  console.log(allRecords, "allRecords")
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

      <AddRecord />

      {(allRecords.length == 0) ?
        <div>
          <h1 className='text-lg text-center mt-8'>No record exists</h1>
        </div>
        :
        <div className="z-10" >
          {
            allRecords.map((record, idx) => {
              console.log(record)
              return <div key={idx} >
                <DisplayRecords record={record} isEdit={false} />
              </div>
            })
          }
        </div>

      }

    </div>
  )
}
