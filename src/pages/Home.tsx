import  { useState } from 'react'
import '../App.css'
import NavBar from '../components/ui/NavBar'
import search from '../img/search.png'
// import down from '../img/down.png'
import Button from '../components/ui/Button'
import Filter from '../components/ui/Filter'
import AddDomain from './AddDomain'
// import { Link } from 'react-router-dom'
import DomainCard from '../components/domain/Domain'




// function CheckboxList({ names }) {
//     // State to manage the checked status of each checkbox
//     const [checkedItems, setCheckedItems] = useState({});

//     // Function to handle checkbox state changes
//     const handleCheckboxChange = (name) => {
//       setCheckedItems({
//         ...checkedItems,
//         [name]: !checkedItems[name]
//       });
//     };

//     return (
//       <div>
//         {names.map((name, index) => (
//           <div key={index} className="flex items-center mb-2 relative">
//             <label htmlFor={`checkbox-${index}`} className="text-sm">{name}</label>
//             <input
//               type="checkbox"
//               id={`checkbox-${index}`}
//               className="absolute h-5 w-5 right-4"
//               checked={checkedItems[name] || false}
//               onChange={() => handleCheckboxChange(name)}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   }



function Home() {

  // const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };
  // const names = ['Type', 'Routing Policy', 'Alice', 'TTL']; // Sample list of names


  // const toggleFilter = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div className='flex bg-black h-[100vh]'>
      <NavBar />
      <div className='px-32 w-[80vw] pt-20'>
        <div className='flex justify-end'>
          <Button text="CSV Upload" />
          <button onClick={openModal} className='bg-orange-500 text-white px-2 py-1 rounded-sm ml-2 text-sm font-bold'>Add Domain</button>
          <AddDomain isOpen={isModal} onClose={closeModal} />
        </div>
        <div className='flex w-full mt-2 mb-3'>
          <div className='relative'>
            <input type="text" placeholder='Search' className='pl-10 rounded-sm w-[44vw] h-[7vh] hover:border-gray-100 focus:border focus:border-orange-100' />
            <img src={search} alt="" className='w-[3%] absolute top-3 left-2' />
          </div>
          <Filter />
        </div>
        <DomainCard name="example1.com" />
        <DomainCard name="example1.com" />
        <DomainCard name="example1.com" />
        <DomainCard name="example1.com" />
        <DomainCard name="example1.com" />
      </div>
    </div>
  )
}

export default Home 
