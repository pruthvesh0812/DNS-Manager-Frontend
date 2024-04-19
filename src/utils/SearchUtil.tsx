import { Domain } from "../store/atoms/domains";
import {  RecordCache} from "../store/atoms/records";
import { useRecoilValue, useSetRecoilState } from "recoil";
// import { recordInterface } from "../types/recordInterface";
import search from "../img/search.png"
import { getRecordsForDomain } from "../pages/ManageDomain";
import { useEffect, useState } from "react";
import { domainType } from "../types/domainTypes";

// const allDomains = [
//     {
//         Name: "toptrip.in"
//     },
//     {
//         Name: "lucidgrowth.com"
//     },
//     {
//         Name: "vercel.com"
//     }
// ]




export default function SearchUtil({ searchType,domain }: { searchType: string, domain?:string }) {



    const allRecords = useRecoilValue(RecordCache)
    const allDomains = useRecoilValue(Domain)
    const setAllRecords = useSetRecoilState(RecordCache)
    const setAllDomains = useSetRecoilState(Domain)
    const [domains,setDomains] = useState<domainType[]>()

    const searchbyRecord = async (searchPattern: string,len:number) => {
        
        if (allRecords.length != 0 && len != 0) {
            const filteredRecords = allRecords.filter(eachRecord => {
                const str = eachRecord.Name
                return str.includes(searchPattern)
            })
            console.log(filteredRecords,"fl")

            if(filteredRecords.length == 0){
                console.log("sdf")
            }
            else{
                setAllRecords(filteredRecords)

            }
         
         
        }
        else {
            try{
                const records = await getRecordsForDomain(domain as string)
                setAllRecords(records)
            }
            catch(err){
                alert(err)
            }
            console.log("no record")
        }


    }
    useEffect(()=>{
        setDomains(allDomains)
    },[])


    const searchbyDomain = (searchPattern: string) => {

       
        if(searchPattern.length != 0){
            const filteredDomains = allDomains.filter(domain => {
                return domain.Name.includes(searchPattern.toLowerCase())
            })
            setTimeout(() => {
                
                setAllDomains(filteredDomains)
            }, 1000)
        }
        else{
            if(domains){
                setAllDomains(domains)
            }
        }

    }

    if (searchType === 'record') {
        return (
            <div>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search'
                        className='pl-10 rounded-sm w-full h-12 text-black hover:border-gray-100 focus:border focus:border-orange-100'
                        onChange={ (e) => {
                            searchbyRecord(e.target.value,e.target.value.length)
                            console.log(e.target.value, "lsdfkjal")

                        }}
                    />
                    <img src={search} alt="" className='w-[3%] absolute top-3 left-2' />
                </div>
            </div>

        )
    }
    else {
        return (
            <div>

                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search'
                        className='pl-10 rounded-sm w-full h-12 text-black hover:border-gray-100 focus:border focus:border-orange-100'
                        onChange={(e) => {
                            searchbyDomain(e.target.value)
                            
                            console.log(e.target.value, "lsdfkjal")
                        }}
                    />
                    <img src={search} alt="" className='w-[3%] absolute top-3 left-2' />
                </div>
            </div>

        )
    }
}
