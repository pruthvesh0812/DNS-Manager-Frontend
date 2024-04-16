
// import menu from '../img/burger-bar.png'

import { Link } from 'react-router-dom';
import { navListType } from '../../types/navbarTypes';

function NavList(props: navListType) {
    return (
        <Link to={props.path}>
            <div className=''>
                <h4 className='leading-6 pt-5 px-5 mb-2 text-lg'>{props.text}</h4>
                <hr className='ml-5 mb-2 border-1 border-slate-400/30 w-1/2'></hr>
            </div>
        </Link>
    );
}


export default function NavBar() {
    return (
        <div className='w-[20%] bg-[#11213f] text-slate-100'>
            <h1 className='text-3xl p-4 mb-5 mt-3'>Dns Manager</h1>
            {/* <div className='bg-white'>
            
                {/* <img src={menu} alt="" className='w-[30%] p-2 px-5' /> */}
                {/* <div className='flex'> */}
                    {/* <img src={profile} alt="" className='w-[15%] h-[16%] ml-5' /> */}
                    {/* <div className='pb-5 px-5'> */}
                        {/* <h4 className='font-Roboto'>Username</h4> */}
                        {/* <h6 className='text-sm font-Roboto text-blue-600'>User Role</h6> */}
                    {/* </div> */}
                {/* </div> */}
            {/* </div> */} 

            {/* <hr className='border-1 border-black mb-5'></hr> */}
            <NavList text="My Domains" path='/' />
            {/* <NavList text="Monitor Domain" path='/manage' /> */}
            <NavList text="Bulk Upload" path='/bulk' />
            {/* <NavList text="Settings" path='/setting' /> */}
            <NavList text="Sign Up" path='/signup' />
        </div>
    )
}
