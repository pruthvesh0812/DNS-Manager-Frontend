import { useEffect, useState } from 'react'
import '../App.css'
import NavBar from '../components/ui/NavBar'



// import Filter from '../components/ui/Filter'
import AddDomain from './AddDomain'

import DomainCard from '../components/domain/Domain'
import { Domain } from '../store/atoms/domains'
import { useSetRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import axios from 'axios'


import SearchUtil from '../utils/SearchUtil';
import Spinner from '../components/ui/Spinner'
import { SpinnerState } from '../store/atoms/Spinner'
import { ReloadPageState } from '../store/atoms/ReloadPage'
// import { Record } from '../store/atoms/records'
// import { BASE_URL } from '../App'
const ENV = import.meta.env





function Home() {

  const [isModal, setIsModal] = useState(false);
  const userDomains = useRecoilValue(Domain);
  const setUserDomains = useSetRecoilState(Domain)
  const spinner = useRecoilValue(SpinnerState)
  const setSpinner = useSetRecoilState(SpinnerState)
  const reload = useRecoilValue(ReloadPageState)
  // const allRecords = useRecoilValue(Record)
  // const [spinner,setSpinner] = useState(false)
  useEffect(()=>{

  },[reload])

   const getUserDomains = async () => {
    setSpinner(true)
    try {
      const responseDomains = await axios.get(`${ENV.VITE_APP_BASE_URL}/api/domain/hostedZones`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },

      })
      if (responseDomains) {
        console.log(responseDomains)
        const userHostedZones:{
          CallerReference: string
          Name: string,
          Config:{PrivateZone:boolean},
          Id:string,
          ResourceRecordSetCount:number
      }[] = responseDomains.data.userHostedZones
        const userExtractDomainName =  userHostedZones.map(ele => { return {Name:ele.Name,hostedZoneId:ele.Id} })
        setUserDomains(userExtractDomainName)
        setSpinner(false)
      }
      else {
        setUserDomains([])
      }
    }
    catch (err) {
      console.log(err, "error while fetching domains")
      setSpinner(false)

    }
  }


  useEffect(() => {
    getUserDomains()
  }, [])


  return (
    <div className='flex bg-[#08141f] h-[100vh]'>
      <NavBar />
      {
        (spinner && (
          <div>
            <Spinner />
          </div>
        ))
      }
      {/* <div className='flex flex-col'>
      <div className='flex justify-end mt-2'>         
          <button className='bg-orange-500 text-white w-auto py-1 px-3 mr-2  rounded-sm  text-lg font-bold'>Sign Up</button>
      </div> */}
      <div className='px-20 w-[80vw] '>
      
        <div className='grid grid-cols-5 mt-2 mb-3 gap-x-2 pt-20'>
          <div className='col-span-4'>
            <SearchUtil searchType='domain' />
          </div>
          
          <div className='col-span-1'>
            <button onClick={() => {
                setIsModal(true);
              }}
                className='bg-orange-500 text-white px-4 py-2 h-12  rounded-sm ml-3 text-[1.2vw] font-bold'>
                Add Domain
            </button>
            <AddDomain isOpen={isModal}
                  onClose={() => {
                    setIsModal(false)
                  }} />
          </div>
        </div>

        {(userDomains.length == 0) ?
          <div>
            <h1 className='text-lg text-center mt-8 text-slate-200'>No Domains Created</h1>
          </div>
          :
          <div className='mt-12'>
            <h1 className='text-slate-100 my-4'>All Domains</h1>
            {
              userDomains.map(domain => {
                return <div className='mt-4'>
                  <DomainCard name={domain.Name} hostedZoneId={domain.hostedZoneId} />
                </div>
              })
            }
          </div>
        }

      </div>
      </div>
    // </div>
  )
}

export default Home 
