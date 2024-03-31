
import { useRecoilValue } from "recoil"
import { Record } from "../../store/atoms/records"

import AddRecord from "./AddRecord";
import DisplayRecords from "./DisplayRecords";

export default function SubExample() {
  const allRecords = useRecoilValue(Record);
  return (
    <div>
      <div className='grid grid-cols-7'>
                 <div className='col-span-1'>
                     <h4 className='text-xs'>Record</h4>
                 </div>
                 <div className='col-span-1 w-[10vw]'>
                     <h4 className='text-xs w-[10vw]'>Type</h4>
                 </div>
                 <div className='col-span-1 ml-1'>
                     <h4 className='text-xs w-[10vw]'>Value</h4>
                 </div>
                 <div className='col-span-1 ml-2'>
                     <h4 className='text-xs'>Routing Policy</h4>
                 </div>
                 <div className='col-span-1 ml-3'>
                     <h4 className='text-xs'>Alias</h4>
                 </div>
                 <div className='col-span-1 ml-3'>
                     <h4 className='text-xs'>TTL</h4>
                 </div>
             </div>

             <AddRecord />

        { (allRecords.length == 0) ?
          <div>
            <h1 className='text-lg text-center mt-8'>No record exists</h1>
          </div>
          :
          <div>
            
              {
              allRecords.map(record => {
                return <div style={{maxHeight: 'calc(5 * (5vh + 2px))', overflowY: 'auto', overflowX:'hidden',  position: 'relative' }}>
                  <DisplayRecords record={record} isEdit={false}/>                  
                </div>
              })
            }
          </div>
          
          }
          
    </div>
  )
}
