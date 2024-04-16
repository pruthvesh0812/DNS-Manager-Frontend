
import {  useState } from "react"
import ButtonSL from "../components/ui/ButtonSL"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { loginSignUp } from "../store/atoms/loginSIgnup"
import { useRecoilValue } from "recoil"
// import { BASE_URL } from "../App"
const ENV = import.meta.env



export default function LoginSignup() {
    const [labell, setLabel] = useState("Sign Up")
    const navigate = useNavigate()
    const setUserDetails = useSetRecoilState(loginSignUp);
    const userDetails = useRecoilValue(loginSignUp)

  

    return (
        <div className="  bg-[#08141f] flex justify-center h-[100vh]">
            <div className="flex flex-col w-1/4">
                <h1 className="text-center w-full text-slate-100 font-medium text-xl mt-5 mb-2">Sign Up</h1>
                <input
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => {
                        setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                    }}
                    className="h-10 w-[100%]  px-2 rounded text-slate-300 bg-transparent my-3 border border-slate-400"
                />
                <input
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                        setUserDetails((prev) => ({ ...prev, password: e.target.value }))
                    }}
                    className="h-10 px-2 w-[100%]  rounded text-slate-300 bg-transparent my-3 border border-slate-400"
                />
                <div className="flex justify-center w-full  mt-3 mb-6">
                    <ButtonSL text={labell} callBack={async () => {
                        if (labell == "Sign Up") {
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
                </div>
                {
                    (labell == "Sign Up") ?
                        <div className="flex justify-center text-slate-300">
                            <h1>Already Have an Account?</h1>
                            <button className="bg-transparent font-semibold ml-2 text-slate-400" onClick={() => {
                                setLabel("Login")
                            }}>Login in</button>
                        </div> :
                        <div className="flex justify-center text-slate-300">
                            <h1>New User?</h1>
                            <button className="bg-transparent font-semibold ml-2 text-slate-400" onClick={() => {
                                setLabel("Sign Up")
                            }}>Sign up</button>
                        </div>
                }
            </div>
        </div>
    )
}
