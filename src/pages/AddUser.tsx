import { useState } from 'react';

export interface addUserType {
  isOpen:boolean;
  onClose:() => void

  }


const AddUser = ({ isOpen, onClose }:addUserType) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSave = () => {
    // Here, you can perform any action with the entered data
    console.log(username, password, role);
    // Close the modal
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-gray-50 rounded-sm p-8 max-w-sm w-full relative">
              <div className="mb-4">
                <label htmlFor="username" className="block font-medium mb-2 text-xs">Username</label>
                <input
                  type="text"
                  id="username"
                  className="border p-2 w-full h-[5vh] border-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-2 text-xs">Password</label>
                <input
                  type="password"
                  id="password"
                  className="border p-2 w-full h-[5vh] border-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <p className="block font-medium mb-2 text-xs">Role</p>
                <label className="inline-flex items-center text-xs">
                  <input
                    type="radio"
                    className="form-radio focus:ring-orange-500 focus:border-orange-500"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                  />
                  <span className="ml-2">Admin</span>
                </label>
                <label className="inline-flex items-center ml-6 text-xs">
                  <input
                    type="radio"
                    className="form-radio  focus:ring-orange-500 focus:border-orange-500"
                    name="role"
                    value="viewer"
                    checked={role === 'viewer'}
                    onChange={() => setRole('viewer')}
                  />
                  <span className="ml-2">Viewer</span>
                </label>
                <label className="inline-flex items-center ml-6 text-xs">
                  <input
                    type="radio"
                    className="form-radio focus:ring-orange-500 focus:border-orange-500"
                    name="role"
                    value="editor"
                    checked={role === 'editor'}
                    onChange={() => setRole('editor')}
                  />
                  <span className="ml-2">Editor</span>
                </label>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSave} className="bg-orange-500 text-white px-4  rounded-sm ml-2 text-sm font-bold">Save</button>
                <button onClick={onClose} className="ml-2 bg-gray-300 text-gray-700 px-4 py-1 rounded-sm text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUser;
