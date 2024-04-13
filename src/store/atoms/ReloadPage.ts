import {atom} from 'recoil'

export const ReloadPageState = atom<boolean>({
    key:"reload",
    default:false
})