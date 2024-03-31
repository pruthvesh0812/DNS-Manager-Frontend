
// import menu from '../img/burger-bar.png'
import profile from '../../img/profile.png'
import { Link } from 'react-router-dom';
import { navListType } from '../../types/navbarTypes';

function NavList(props: navListType) {
    return (
        <Link to={props.path}>
            <div className=''>
                <h4 className='leading-6 pt-5 px-5 mb-1'>{props.text}</h4>
                <hr className='ml-5 mb-2 border-1 border-black w-1/2'></hr>
            </div>
        </Link>
    );
}


export default function NavBar() {
    return (
        <div className='w-[20%] bg-gray-100'>
            <div className='bg-white'>
                {/* <img src={menu} alt="" className='w-[30%] p-2 px-5' /> */}
                <div className='flex'>
                    <img src={profile} alt="" className='w-[15%] h-[16%] ml-5' />
                    <div className='pb-5 px-5'>
                        <h4 className='font-Roboto'>Username</h4>
                        <h6 className='text-sm font-Roboto text-blue-600'>User Role</h6>
                    </div>
                </div>
            </div>

            <hr className='border-1 border-black mb-5'></hr>
            <NavList text="My Domains" path='/' />
            <NavList text="Monitor Domain" path='/manage' />
            <NavList text="Bulk Upload" path='/bulk' />
            <NavList text="Settings" path='/setting' />
        </div>
    )
}
