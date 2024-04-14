import { useEffect, useState } from 'react'
import '../App.css'
import NavBar from '../components/ui/NavBar'


import Button from '../components/ui/Button'
import Filter from '../components/ui/Filter'
import AddDomain from './AddDomain'

import DomainCard from '../components/domain/Domain'
import { Domain } from '../store/atoms/domains'
import { useSetRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import SearchUtil from '../utils/SearchUtil';
import Spinner from '../components/ui/Spinner'
import { SpinnerState } from '../store/atoms/Spinner'
import { ReloadPageState } from '../store/atoms/ReloadPage'
import { Record } from '../store/atoms/records'
// import { BASE_URL } from '../App'
const ENV = import.meta.env





function Home() {

  const [isModal, setIsModal] = useState(false);
  const userDomains = useRecoilValue(Domain);
  const setUserDomains = useSetRecoilState(Domain)
  const spinner = useRecoilValue(SpinnerState)
  const setSpinner = useSetRecoilState(SpinnerState)
  const reload = useRecoilValue(ReloadPageState)
  const allRecords = useRecoilValue(Record)
  // const [spinner,setSpinner] = useState(false)


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

  const navigate = useNavigate()
 


  return (
    <div className='flex bg-black h-[100vh]'>
      <NavBar />
      {
        (spinner && (
          <div>
            <Spinner />
          </div>
        ))
      }
      <div className='px-32 w-[80vw] pt-20'>
        <div className='flex justify-end'>
          <Button text="CSV Upload" callBack={() => {
            navigate("/bulk")
          }} />
          <button onClick={() => {
            setIsModal(true);
          }}
            className='bg-orange-500 text-white px-2 py-1 rounded-sm ml-2 text-sm font-bold'>
            Add Domain
          </button>
          <AddDomain
            isOpen={isModal}
            onClose={() => {
              setIsModal(false)
            }} />
        </div>
        <div className='flex w-full mt-2 mb-3'>
          <SearchUtil searchType='domain' />
          <Filter allRecords={allRecords}/>
        </div>

        {(userDomains.length == 0) ?
          <div>
            <h1 className='text-lg text-center mt-8 text-slate-200'>No Domains Created</h1>
          </div>
          :
          <div>
            {
              userDomains.map(domain => {
                return <div>
                  <DomainCard name={domain.Name} hostedZoneId={domain.hostedZoneId} />
                </div>
              })
            }
          </div>
        }

      </div>
    </div>
  )
}

export default Home 
