
import { useState } from "react"
import Button from "../components/ui/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { loginSignUp } from "../store/atoms/loginSIgnup"
import { useRecoilValue } from "recoil"
// import { BASE_URL } from "../App"
const ENV = import.meta.env



export default function LoginSignup() {
    const [labell, setLabel] = useState("signup")
    const navigate = useNavigate()
    const setUserDetails = useSetRecoilState(loginSignUp);
    const userDetails = useRecoilValue(loginSignUp)


    return (
        <div className="  bg-black flex justify-center h-[100vh]">
            <div className="flex flex-col ">
                <input
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => {
                        setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                    }}
                    className="h-8 w-[150%]  rounded text-slate-300 bg-transparent my-3 border border-slate-400"
                />
                <input
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                        setUserDetails((prev) => ({ ...prev, password: e.target.value }))
                    }}
                    className="h-8 w-[150%]  rounded text-slate-300 bg-transparent my-3 border border-slate-400"
                />
                <Button text={labell} callBack={async () => {
                    if (labell == "signup") {
                        const res = await axios.post(`${ENV.VITE_APP_BASE_URL}/api/auth/signup`, userDetails)
                        if (res) {
                            console.log(res, "res")
                            navigate("/")
                            localStorage.setItem("token",res.data.token)
                        }

                    }
                    else {
                        try {
                            const res = await axios.post(`${ENV.VITE_APP_BASE_URL}/api/auth/login`, userDetails)
                            if (res) {
                                console.log(res, "res")
                                navigate("/")
                                localStorage.setItem("token",res.data.token)

                            }
                        }
                        catch (err) {
                            console.log(err, "error occured")
                        }

                    }
                }} />
                {
                    (labell == "signup") ?
                        <div className="flex justify-center text-slate-300">
                            <h1>Already Have an Account?</h1>
                            <button className="bg-transparent font-semibold text-slate-400" onClick={() => {
                                setLabel("login")
                            }}>Login in</button>
                        </div> :
                        <div className="flex justify-center text-slate-300">
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
