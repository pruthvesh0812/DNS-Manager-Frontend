import {  useState } from 'react'
import down from '../../img/down.png'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Domain } from '../../store/atoms/domains'

import { recordInterface } from '../../types/recordInterface'

const filterList = [
  {
    filterType:"Type",
    filter:["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SRV", "TXT", "DNSSEC"]
  },
  {
    filterType:"Policy",
    filter:["Simple", "Weighted", "Latency", "Failover", "Geolocation", "Multi-Value", "Geoproximity"],
  },
  {
    filterType:"Alias",
    filter:["true", "false"]
  }
]

type filterList = {
  filterType:string,
  filter:string[]
}

const FilterList = ({filterList,allRecords}:{filterList:filterList[],allRecords:recordInterface[]})=>{
  // const [filter,setFilter] = useState<{filterType:string,filter:string}>({filterType:"",filter:""})
  
  const allDomains = useRecoilValue(Domain)
  const setAllDomains = useSetRecoilState(Domain)

  const handleFilterChange = (filter:{filterType:string,filter:string})=>{
    const filteredRecords = allRecords.filter(record => {
      switch(filter.filterType){
        case "Type":
          return (record.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Type === filter.filter)
        case "Policy":
          return (record.routingPolicy === (filter.filter+" Routing"))
        case "Alias":
                  // string to boolean                                                   
          return (!!filter.filter == false) ? 
                    // return those who are undefined if false     
                  (record.record.param.ChangeBatch.Changes[0].ResourceRecordSet.AliasTarget === undefined)
                  : 
                    // return those who are defined if true
                  (record.record.param.ChangeBatch.Changes[0].ResourceRecordSet.AliasTarget != undefined)
      }
    })

    const filteredDomains = allDomains.filter(domain => filteredRecords.some(record=> record.record.param.HostedZoneId === domain.hostedZoneId))
    setAllDomains(filteredDomains)
  }

 
  
  return (
    <div>
      {
        filterList.map(eachFilter =>{
          return (
            <div className='my-2' id={eachFilter.filterType}>
              <label className='font-bold text-lg' >{eachFilter.filterType}</label>
              <div className='grid grid-cols-8 gap-x-2'>
                {
                  eachFilter.filter.map(filterVal =>{
                   return (
                    <div id={filterVal} className='col-span-3'>
                       <input type="checkbox" value={filterVal} onChange={(e)=>{
                          handleFilterChange({filterType:eachFilter.filterType,filter:e.target.value})
                       }}/>
                       <label className='ml-1'>{filterVal}</label>
                    </div>
                   )
                  })
                }
              </div>
              <hr className='my-2'/>
            </div>
          )
        })
      }
    </div>
  )
}

export default function Filter({allRecords}:{allRecords:recordInterface[]}) {
  const [isOpen, setIsOpen] = useState(false);

  // const names = ['Type', 'Routing Policy', 'Alice', 'TTL']; // Sample list of names

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div >
    


        <button
          onClick={toggleFilter}
          className="flex  px-3 relative h-full w-full  font-medium  bg-slate-100 rounded z-30  "
        >
           <h4 className='  text-xl py-[10px]'>Filter</h4>
          <img src={down} alt="" className='w-4 absolute right-3 top-4' />
        </button>
        {isOpen && (
          <div className="absolute right-[20%]  mt-2 top-50 origin-top-right  bg-white rounded-md shadow-lg">
            <div className="px-2 py-2 ">
              <div className="p-4 pb-0">
                {/* <CheckboxList names={names} /> */}
                <FilterList filterList={filterList} allRecords={allRecords}/>
              </div>
              {/* <div className='flex gap-x-6  '>
                <label className="text-sm pl-4">TTL</label>
                <input type="number" name="" id="ttl" className='border-2 w-[6vw] ml-4 h-[4vh] border-gray-400' />
              </div>
              <div className='flex gap-x-1'>
                <label className="text-sm pl-4">Record</label>
                <input type="text" name="" id="record" className='border-2 w-[6vw] ml-4 h-[4vh] border-gray-400' />
              </div> */}
            </div>
          </div>
        )}
      </div>
   
  )
}
