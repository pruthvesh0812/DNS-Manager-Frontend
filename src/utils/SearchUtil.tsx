import { Domain } from "../store/atoms/domains";
import { Record} from "../store/atoms/records";
import { useRecoilValue, useSetRecoilState } from "recoil";
// import { recordInterface } from "../types/recordInterface";
import search from "../img/search.png"

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




export default function SearchUtil({ searchType }: { searchType: string }) {



    const allRecords = useRecoilValue(Record)
    const allDomains = useRecoilValue(Domain)
    const setAllRecords = useSetRecoilState(Record)
    const setAllDomains = useSetRecoilState(Domain)

    const searchbyRecord = (searchPattern: string) => {
        
        if (allRecords.length != 0) {
            const filteredRecords = allRecords.filter(eachRecord => {
                const str = eachRecord.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Name
                return str.includes(searchPattern)
            })
            console.log(filteredRecords,"fl")
         
                setAllRecords(filteredRecords)
         
        }
        else {
            console.log("no record")
        }


    }


    const searchbyDomain = (searchPattern: string) => {

        const filteredDomains = allDomains.filter(domain => {
            return domain.Name.includes(searchPattern.toLowerCase())
        })
        setTimeout(() => {
            setAllDomains(filteredDomains)
        }, 1000)

    }

    if (searchType === 'record') {
        return (
            <div>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search'
                        className='pl-10 rounded-sm w-[44vw] h-[7vh] border-2 border-gray-800 hover:border-gray-100 focus:border focus:border-orange-100'
                        onChange={ (e) => {
                            searchbyRecord(e.target.value)
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
                        className='pl-10 rounded-sm w-[44vw] h-[7vh] border-2 border-gray-800 hover:border-gray-100 focus:border focus:border-orange-100'
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
