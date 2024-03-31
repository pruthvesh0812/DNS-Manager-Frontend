import React, { useState } from 'react';
import down from '../img/down.png';
import deleteImg from '../img/delete.png';
import setting from '../img/setting.png';
import DomainInfo from '../../json/ManageDomains.json'
import { recordInterface } from '../../types/recordInterface';

// function DropdownButton({ label, options, isOpen, toggleDropdown }) {
//     return (
//         <div className='col-span-1'>
//             <div className="relative bg-white flex">
//                 <button
//                     onClick={toggleDropdown}
//                     className="flex justify-between items-center px-4 mt-2 w-[10vw] h-[5vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm overflow-hidden"
//                 >
//                     <span className="truncate">{label}</span>
//                     <img src={down} alt="" className='w-[20%] h-1/2 ' />
//                 </button>
//                 {isOpen && (
//                     <div className="absolute z-10 right-0 mt-[4vh] top-full w-[6vw] bg-white border border-gray-300 rounded-md shadow-lg">
//                         <ul>
//                             {options.map((option, index) => (
//                                 <li key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-xs">{option}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// function RecordCard(domain:recordInterface) {


//     const [isOpenType, setIsOpenType] = useState(false);
//     const [isOpenValue, setIsOpenValue] = useState(false);
//     const [isOpenRP, setIsOpenRP] = useState(false);
//     const [isOpenAlias, setIsOpenAlias] = useState(false);
//     const [isOpenTTL, setIsOpenTTL] = useState(false);
//     const [checkedItems, setCheckedItems] = useState({});

//     // Function to handle checkbox state changes
//     const handleCheckboxChange = (name:string) => {
//       setCheckedItems({
//         ...checkedItems,
//         [name]: !checkedItems[name]
//       });
//     };


//     const openType = () => {
//       setIsOpenType(!isOpenType);
//     };

//     const openValue = () => {
//         setIsOpenValue(!isOpenValue);
//       };

//     const openRP = () => {
//       setIsOpenRP(!isOpenRP);
//     };

//     const openAlias = () => {
//       setIsOpenAlias(!isOpenAlias);
//     };

//     const openTTL = () => {
//       setIsOpenTTL(!isOpenTTL);
//     };

//     const options = ["Option 1", "Option 2", "Option 3"]; // Replace with your dropdown options

//     return (
//         <div>
//             <input
//               type="checkbox"
//               className="absolute h-5 w-5 -ml-10 mt-2"
//               checked={checkedItems[name] || false}
//               onChange={() => handleCheckboxChange(name)}
//             />

//         <div className='grid grid-cols-7 gap-x-4'>

//             <div className='col-span-1 mt-2'>
//                 <h4 className='text-xs border-2 px-1 h-[5vh] rounded-sm border-gray-600'>{domain.record.param.ResourceRecordSet.Name}</h4 >
//             </div>
//             <DropdownButton
//                 label={domain.record.param.ResourceRecordSet.Type}
//                 options={options}
//                 isOpen={isOpenType}
//                 toggleDropdown={openType}
//             />
//             <div className='col-span-1 mt-2'>
//                 <h4 className='text-xs border-2 px-1 h-[5vh] rounded-sm border-gray-600'>{domain.value}</h4 >
//             </div>
//             <DropdownButton
//                 label={domain.routingPolicy}
//                 options={options}
//                 isOpen={isOpenRP}
//                 toggleDropdown={openRP}
//             />
//             <DropdownButton
//                 label={domain.record.param.ResourceRecordSet.AliasTarget?.EvaluateTargetHealth}
//                 options={options}
//                 isOpen={isOpenAlias}
//                 toggleDropdown={openAlias}
//             />
//             <DropdownButton
//                 label={domain.record.param.ResourceRecordSet.TTL}
//                 options={options}
//                 isOpen={isOpenTTL}
//                 toggleDropdown={openTTL}
//             />
//             <div className='relative'>
//                 <div className='flex absolute -right-16'>
//                     <img src={setting} alt="" className='w-[15%]'/>
//                     <img src={deleteImg} alt="" className='w-[15%] ml-3'/>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }



// function RecordList(records:any) {
//     return (
//         <>
//             {records.map((eachRecord, index) => {
//                 return <div key={index}>
//                     <RecordCard  {...eachRecord} />
//                 </div> 
//         })}
//         </>
//     );
// }

// export default function SubExample() {

//     return (
//         <div>
//             <div className='grid grid-cols-7'>
//                 <div className='col-span-1'>
//                     <h4 className='text-xs'>Record</h4>
//                 </div>
//                 <div className='col-span-1 w-[10vw]'>
//                     <h4 className='text-xs w-[10vw]'>Type</h4>
//                 </div>
//                 <div className='col-span-1 ml-1'>
//                     <h4 className='text-xs w-[10vw]'>Value</h4>
//                 </div>
//                 <div className='col-span-1 ml-2'>
//                     <h4 className='text-xs'>Routing Policy</h4>
//                 </div>
//                 <div className='col-span-1 ml-3'>
//                     <h4 className='text-xs'>Alias</h4>
//                 </div>
//                 <div className='col-span-1 ml-3'>
//                     <h4 className='text-xs'>TTL</h4>
//                 </div>
//             </div>
//             <RecordList examples={DomainInfo} />
//         </div>
//     );
// }



export default function SubExample() {
  return (
    <div>

    </div>
  )
}
