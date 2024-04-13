import { atom } from "recoil";
import { domainType, hostedZoneIdDomainType } from "../../types/domainTypes";


const domain:domainType[] = []


export const Domain = atom({
    key:"DomainKey",
    default:domain
})

export const SearchDomain = atom<string>({
    key:"searchD",
    default:""
})

export const ManageDomainAtom = atom<{name:string,hostedZoneId:string}>({
    key:"manage domain",
    default:{name:"",hostedZoneId:""}
})

export const hostedZoneIdDomain = atom<hostedZoneIdDomainType>({
    key:"hosted zone id and domain",
    default:{
        hostedZoneId:"",
        domain:""
    }
})

