
import { useRecoilValue } from "recoil"
import { Record } from "../../store/atoms/records"

import AddRecord from "./AddRecord";
import DisplayRecords from "./DisplayRecords";

export default function RecordList() {
  const allRecords = useRecoilValue(Record);
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
        <div>

          {
            allRecords.map(record => {
              return <div style={{ maxHeight: 'calc(5 * (5vh + 2px))', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
                <DisplayRecords record={record} isEdit={false} />
              </div>
            })
          }
        </div>

      }

    </div>
  )
}
