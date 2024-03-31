import  { useEffect, useState } from 'react'
import '../App.css'
import NavBar from '../components/ui/NavBar'
import search from '../img/search.png'

import Button from '../components/ui/Button'
import Filter from '../components/ui/Filter'
import AddDomain from './AddDomain'

import DomainCard from '../components/domain/Domain'
import { Domain, SearchDomain } from '../store/atoms/domains'
import { useSetRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import { domainType } from '../types/domainTypes'
import { useNavigate } from 'react-router-dom'
import { searchbyDomain } from '../utils/SearchUtil'



const getUserDomains = async() =>{
  const setUserDomains = useSetRecoilState(Domain)
  try{
    const userDomains:domainType[] = await axios.get("")
  if(userDomains){
    setUserDomains(userDomains)
  }
}
catch(err){
  console.log(err,"error while fetching domains")
}
}

function Home() {

  const [isModal, setIsModal] = useState(false);
  const userDomains = useRecoilValue(Domain);


  


  useEffect( ()=>{
    getUserDomains()
  },[])

  const navigate = useNavigate()
  const setSearch = useSetRecoilState(SearchDomain)


  return (
    <div className='flex bg-black h-[100vh]'>
      <NavBar />
      <div className='px-32 w-[80vw] pt-20'>
        <div className='flex justify-end'>
          <Button text="CSV Upload" callBack={()=>{
            navigate("/bulk")
          }}/>
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
          }}/>
        </div>
        <div className='flex w-full mt-2 mb-3'>
          <div className='relative'>
            <input 
              type="text" 
              placeholder='Search' 
              className='pl-10 rounded-sm w-[44vw] h-[7vh] hover:border-gray-100 focus:border focus:border-orange-100' 
              onChange={(e)=>{
                setSearch(e.target.value)
                searchbyDomain()
              }}
              />
            <img src={search} alt="" className='w-[3%] absolute top-3 left-2' />
          </div>
          <Filter />
        </div>

        { (userDomains.length == 0) ?
        <div>
          <h1 className='text-lg text-center mt-8'>No Domains Created</h1>
        </div>
        :
        <div>
            {
            userDomains.map(domain => {
              return <div>
                <DomainCard name={domain.Name} />
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
