import { userType } from "../../types/settingsType";
import deleteImg from '../../img/delete.png'
import setting from '../../img/setting.png'



export default function UserListCard(props:userType){
    return(
        <div>
            <table className=''>
                <tbody>
                    <tr className='border-1'>
                        <td className='border-2 w-[30vw] text-center text-sm py-1 shadow-md border-t-0'>{props.email}</td>
                        <td className='border-2 w-[30vw] justify-center items-center text-sm py-1 shadow-md border-t-0 flex relative'>
                            <h4 className='text-sm text-center'>{props.role}</h4>
                            <div className='flex absolute -right-10'>
                                <img src={setting} alt="" className='w-[15%]'/>
                                <img src={deleteImg} alt="" className='w-[15%] ml-3'/>
                            </div>
                            
                        </td>
                        <div>
                            
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}