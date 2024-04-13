import { Link, useNavigate } from 'react-router-dom';
import { domainCardType } from '../../types/manageDomainTypes';
import { useSetRecoilState } from 'recoil';
import { ManageDomainAtom } from '../../store/atoms/domains';
import Delete from '../../img/delete.png';
import { useState } from 'react';
import DeleteModal from '../ui/DeleteModal';
import axios from 'axios';
import { ENV } from '../../App';
import Spinner from '../ui/Spinner';
import { ReloadPageState } from '../../store/atoms/ReloadPage';


export default function DomainCard({ name,hostedZoneId }: {name:string,hostedZoneId:string}) {
  const setManageDomain = useSetRecoilState(ManageDomainAtom)
  const [openModal, setOpenModal] = useState(false)
  const [isPending,SetIsPending] = useState(false)
  const setReload = useSetRecoilState(ReloadPageState)
  
  
  const handleDelete = (isDelete:boolean)=>{
    if(isDelete == true){
      console.log("sfasd", hostedZoneId)
      SetIsPending(true)
      axios.delete(`${ENV.VITE_APP_BASE_URL}/api/domain/delete?hostedZoneId=${hostedZoneId}`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      }).then(res=>{
        console.log(res.data,"hz delete successful")
        setReload(true)
      }).catch((err)=>{
        console.log(err,"error in deleting")
      })
      setOpenModal(false)
      
    }
    else{
      setOpenModal(false)
    }
  }
  return (
    <div className='grid grid-cols-3'>
       <div className='bg-white mt-2 pt-2 flex justify-between h-[7vh] rounded-sm px-4 col-span-2 '>
        <h6 className='font-bold text-xl'>{name}</h6>
        <Link to="/manage" ><h6 className='font-semibold text-blue-600  text-xl' onClick={()=>{setManageDomain(name)}}>Manage Domain</h6></Link>
       </div>
        <div className='col-span-1 w-10 mt-2 mx-3 '>
          {
            (isPending) ? (
              <div className='text-slate-400 text-lg w-[1000%]'>Deleting ... Will take 1-2 minutes</div>
            ) :
            <div>
              <img src={Delete} onClick={()=>{setOpenModal(true)}}/>
            </div>
          }
          {
            (openModal)? (
              <div>
                <DeleteModal handleDelete={handleDelete} />
              </div>
            ):(<div></div>)
          }
        </div>
    </div>
   
  )
}
