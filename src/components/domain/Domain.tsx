import { Link } from 'react-router-dom'
import { domainCardType } from '../../types/manageDomainTypes'
import { useSetRecoilState } from 'recoil'
import { ManageDomainAtom } from '../../store/atoms/domains'



export default function DomainCard({ name }: domainCardType) {
  const setManageDomain = useSetRecoilState(ManageDomainAtom)
  return (
    <div className='bg-white mt-2 pt-1 flex justify-between h-[7vh] rounded-sm px-4 '>
      <h6 className='font-bold'>{name}</h6>
      <Link to="/manage" ><h6 className='font-semibold text-blue-600 text-base' onClick={()=>{setManageDomain(name)}}>Manage Domain</h6></Link>
    </div>
  )
}
