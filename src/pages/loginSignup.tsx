
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { loginSignUp } from "../store/atoms/loginSIgnup"
import { useRecoilValue } from "recoil"

export default function loginSignup({ label }: { label: string }) {
    const [labell, setLabel] = useState("")
    const navigate = useNavigate()
    const setUserDetails = useSetRecoilState(loginSignUp);
    const userDetails = useRecoilValue(loginSignUp)
    useEffect(() => {
        setLabel(label)
    }, [])

    return (
        <div className="px-[20%] my-[20%] bg-black flex justify-center">
            <div className="grid grid-cols-1">
                <input
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => {
                        setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                    }}
                    className="h-8 w-1/2 rounded text-slate-300 bg-transparent my-8"
                />
                <input
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                        setUserDetails((prev) => ({ ...prev, password: e.target.value }))
                    }}
                    className="h-8 w-1/2 rounded text-slate-300 bg-transparent my-8"
                />
                <Button text={labell} callBack={async () => {
                    if(labell == "signup"){
                       const res = await axios.post("http://localhost:5001/api/auth/signup",userDetails)
                        if(res){
                            console.log(res,"res")
                            navigate("/")
                        }
                        
                    }
                    else{
                        const res = await axios.post("http://localhost:5001/api/auth/login",userDetails)
                        if(res){
                            console.log(res,"res")
                            navigate("/")
                        }
                    }
                }} />
                {
                    (labell == "signup") ?
                        <div className="flex justify-center">
                            <h1>Already Have an Account?</h1>
                            <button className="bg-transparent font-semibold text-slate-400" onClick={() => {
                                setLabel("login")
                            }}>Login in</button>
                        </div> :
                        <div>
                            <h1>New User?</h1>
                            <button className="bg-transparent font-semibold text-slate-400" onClick={() => {
                                setLabel("signup")
                            }}>Sign up</button>
                        </div>
                }
            </div>
        </div>
    )
}
