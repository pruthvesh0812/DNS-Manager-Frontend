import { atom } from "recoil";



const payload:{email:string,password:string} = {
    email:"",
    password:""
}

export const loginSignUp = atom({
    key:"logSign",
    default:payload
})