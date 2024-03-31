import { atom } from "recoil";
import { domainType } from "../../types/domainTypes";


const domain:domainType[] = []

export const Domain = atom({
    key:"DomainKey",
    default:domain
})

export const SearchDomain = atom<string>({
    key:"searchD",
    default:""
})

