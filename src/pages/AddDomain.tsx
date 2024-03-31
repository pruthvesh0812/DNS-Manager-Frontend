import { useState } from 'react';
import Title from '../components/ui/Title';
import SubExample from '../components/ui/SubExample';

type AddDomainType = {
  isOpen: boolean,
  onClose: () => void
}

const AddDomain = ({ isOpen, onClose }: AddDomainType) => {
  const [role, setRole] = useState('');

  const handleSave = () => {
    console.log(role);
    onClose(); // Close the modal
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-sm p-8 max-w-2xl w-full relative">
              <input
                type="text"
                name=""
                id=""
                className="border border-black rounded-sm w-full h-[7vh] mb-7 bg-gray-200 pl-2"
                placeholder="Domain"
              />
              <div className="mb-4">
                <label className="inline-flex items-center text-xs">
                  <input
                    type="radio"
                    className="form-radio focus:ring-orange-500 focus:border-orange-500"
                    name="role"
                    value="private"
                    checked={role === 'private'}
                    onChange={() => setRole('private')}
                  />
                  <span className="ml-2">Private</span>
                </label>
                <label className="inline-flex items-center ml-6 text-xs">
                  <input
                    type="radio"
                    className="form-radio  focus:ring-orange-500 focus:border-orange-500"
                    name="role"
                    value="public"
                    checked={role === 'public'}
                    onChange={() => setRole('public')}
                  />
                  <span className="ml-2">Public</span>
                </label>
              </div>
              <Title text="Records" />
              <SubExample />
              <div className="flex justify-end mt-5">
                <button
                  onClick={handleSave}
                  className="bg-orange-500 text-white px-4  rounded-sm ml-2 text-sm font-bold"
                >
                  Save
                </button>
                <button
                  onClick={onClose} // Call the onClose function to close the modal
                  className="ml-2 bg-gray-300 text-gray-700 px-4 py-1 rounded-sm text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddDomain;
