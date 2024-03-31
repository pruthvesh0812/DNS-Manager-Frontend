import { Domain, SearchDomain } from "../store/atoms/domains";
import { Record,SearchRecord } from "../store/atoms/records";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { recordInterface } from "../types/recordInterface";

const allDomains = [
    {
        Name: "toptrip.in"
    },
    {
        Name: "lucidgrowth.com"
    },
    {
        Name: "vercel.com"
    }
]

export const searchbyDomain = () => {
    const searchPattern = useRecoilValue(SearchDomain);
    const setAllDomains = useSetRecoilState(Domain)
    const filteredDomains = allDomains.filter(domain => {
        domain.Name.includes(searchPattern.toLowerCase())
    })
    setTimeout(() => {
        setAllDomains(filteredDomains)
    }, 1000)

}

const allRecords : recordInterface[] = []

export const searchbyRecord = () => {
    const searchPattern = useRecoilValue(SearchRecord);
    const setAllRecords = useSetRecoilState(Record)
    const filteredRecords = allRecords.filter(eachRecord => {
        eachRecord.record.param.ResourceRecordSet.Name.includes(searchPattern)
    })
    setTimeout(() => {
        setAllRecords(filteredRecords)
    }, 1000)

}