import React, { useMemo, useState } from 'react'
import Title from '../components/ui/Title'
import SettingInfo from '../json/SettingJSON.json'
import NavBar from '../components/ui/NavBar';
import AddUser from './AddUser'
import { userType, userTypeArr } from '../types/settingsType';
import UserListCard from '../components/setting/SettingsComponents';


function UserList({ infos }: { infos: userType[] }) {
    return (
        infos.map(info => {
            return <div key={info.id}>
                <UserListCard {...info} />
            </div>
        })
    )
}

export default function Settings() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div className='flex h-[100vh] bg-gray-50'>
                <NavBar />
                <div className='px-32 w-[80vw] pt-20'>
                    <Title text="User Role" />
                    <UserList infos={SettingInfo} />
                    <div className='flex justify-end'>
                        <button onClick={openModal} className='bg-orange-500 text-white px-2 py-1 rounded-sm ml-2 text-sm font-bold'>Add User</button>
                        <AddUser isOpen={isOpen} onClose={closeModal} />
                    </div>
                    <div className='mt-5'>
                        <Title text="Change Password" />
                        <div className='flex flex-col mt-3'>
                            <label className='text-xs'>Old Password</label>
                            <div className='flex'>
                                <input type="password" name="" id="" className='border-2 pl-2 rounded-sm border-gray-600' />
                                <h4 className='text-xs ml-5 '>Forgot Password?</h4>
                            </div>
                        </div>
                    </div>
                    <div className='mt-20'>
                        <button className='bg-orange-700 text-white px-2 py-1 rounded-sm text-sm font-bold'>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
