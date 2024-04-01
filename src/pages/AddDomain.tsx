import { useEffect, useState } from 'react';
import Title from '../components/ui/Title';
import RecordList from '../components/ui/RecordList';
import axios from 'axios';
import { NumRecordsToSend, PreviousStateAllRecords, Record, singleRecord } from '../store/atoms/records';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { Domain } from '../store/atoms/domains';

type AddDomainType = {
  isOpen: boolean,
  onClose: () => void
}

const AddDomain = ({ isOpen, onClose }: AddDomainType) => {
  const [role, setRole] = useState('');
  const [domain, setDomain] = useState<string>("")
  const [sendRecord, setSendRecord] = useState<boolean>(false)
  // const [numRecordsToSend, SetNumRecordsToSend] = useState<number>(0)
  const newRecord = useRecoilValue(singleRecord)
  const numRecordsToSend = useRecoilValue(NumRecordsToSend)
  const SetNumRecordsToSend = useSetRecoilState(NumRecordsToSend)
  const SetAllDomains = useSetRecoilState(Domain)
  const previousAllRecordstate = useRecoilValue(PreviousStateAllRecords)
  const setPreviousAllRecordstate = useSetRecoilState(PreviousStateAllRecords)
  const SetAllRecords = useSetRecoilState(Record)
  const allRecords = useRecoilValue(Record)

  const handleCreate = () => {
    createDomainAndRecord()
    console.log(role, domain, newRecord);
    SetAllDomains(prev => [...prev,{Name:domain}])
    onClose();
  };

  // set sendRecord to true only when use adds a new record - to dynamically decide to send create record request or not
  useEffect(() => {
    setSendRecord(true)
    // SetNumRecordsToSend(prev => prev + 1) 
  }, [newRecord])

  // to counter the effect of, init of newRecord calling above useEffect - keeping sendRecord to false on initial render


  console.log(numRecordsToSend)

  const createDomainAndRecord = async () => {
    // const response = await axios.post("http://localhost:5001/api/domain/create", JSON.stringify({ domain }))
    // if (response) {
    //   console.log(response, "new record res")
    // }


    // if new record created
    if (sendRecord == true) {
      console.log("in send", sendRecord, numRecordsToSend)
      if (numRecordsToSend > 1) {
        SetNumRecordsToSend(0)
        console.log("many")
        // multiple remaining !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      }
      else {
        SetNumRecordsToSend(0)

        console.log(newRecord, domain)
        // const response = await axios.post("http://localhost:5001/api/record/create", JSON.stringify(newRecord))
        // if (response.ok) {
        //   console.log(response, "new record res")
        //   // update records only after getting response
        //   /// setPreviousAllRecordstate(allRecords)
        // }
        // else{
        //    // allRecords are already set while adding them
        //    // below code is to rollback to previous that if records creation status is not 200 ok
        //    SetAllRecords(previousAllRecordstate)
        // }
        
        
      }

      

    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto w-full">
          <div className="flex items-center justify-center h-[80vh]">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-md p-8  relative">
              <input
                type="text"
                name=""
                id=""
                value={domain}
                className="border border-black rounded-sm w-full h-[7vh] mb-7 bg-gray-200 pl-2"
                placeholder="Domain"
                onChange={(e) => { setDomain(e.target.value) }}
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
              <RecordList />
              <div className="flex justify-end mt-5">
                <button
                  onClick={handleCreate}
                  className="bg-orange-500 text-white px-4  rounded-sm ml-2 text-sm font-bold"
                >
                  Create
                </button>
                <button
                  onClick={onClose}
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
