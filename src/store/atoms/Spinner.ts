import {atom} from 'recoil'

export const SpinnerState = atom<boolean>({
    key:"spinner",
    default:false
})