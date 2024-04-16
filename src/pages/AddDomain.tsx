import { useEffect, useState } from 'react';
import Title from '../components/ui/Title';
import RecordList from '../components/ui/RecordList';
import axios from 'axios';
import { NumRecordsToSend, PreviousStateAllRecords, Record, multipleRecord, singleRecord } from '../store/atoms/records';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { Domain, hostedZoneIdDomain } from '../store/atoms/domains';
// import { BASE_URL } from '../App';
import { recordInterface } from '../types/recordInterface';
import { SpinnerState } from '../store/atoms/Spinner';
const ENV = import.meta.env

type AddDomainType = {
  isOpen: boolean,
  onClose: () => void
}

// const RecordToSet: recordInterface = {
//   record: {
//       param: {
//           Action:"",
//           ChangeBatch: {
//               Changes:[{
//                   Action: "",
//               ResourceRecordSet: {
//                   Name: "",
//                   Type: "",
//                   // AliasTarget: undefined || {
//                       // DNSName: "",
//                       // EvaluateTargetHealth: false,
//                       // HostedZoneId: ""
//                   // },
//                   // CidrRoutingConfig: undefined || {
//                       // CollectionId: "",
//                       // LocationName: ""
//                   // },
//                   // Failover:undefined ||  "",
//                   // GeoLocation: undefined || {
//                       // ContinentCode: "",
//                       // CountryCode: "",
//                       // SubdivisionCode: ""
//                   // },
//                   // GeoProximityLocation:undefined || {
//                       // AWSRegion: "",
//                       // Bias: 0,
//                       // Coordinates: {
//                           // Latitude: "",
//                           // Longitude: ""
//                       // },
//                       // LocalZoneGroup:undefined || ""
//                   // },
//                   // HealthCheckId: undefined ||"",
//                   // MultiValueAnswer: false,
//                   // Region: undefined || "",
//                   ResourceRecords: [
//                       {
//                           Value: ""
//                       }
//                   ],
//                   // SetIdentifier:undefined || "",
//                   TTL: 0,
//                   // TrafficPolicyInstanceId:undefined || "",
//                   // Weight: undefined || 0,
//               }
//           }],
//           Comment: "dfdsfa"
//           },

//           HostedZoneId: ""
//       },
//   },
//   routingPolicy: ""
// }

const AddDomain = ({ isOpen, onClose }: AddDomainType) => {
  const [role, setRole] = useState('');
  const [domain, setDomain] = useState<string>("")
  const [sendRecord, setSendRecord] = useState<boolean>(false)
  // const [numRecordsToSend, SetNumRecordsToSend] = useState<number>(0)
  const newRecord = useRecoilValue(singleRecord)
  const setSingleRecord = useSetRecoilState(singleRecord)
  const numRecordsToSend = useRecoilValue(NumRecordsToSend)
  const SetNumRecordsToSend = useSetRecoilState(NumRecordsToSend)
  const SetAllDomains = useSetRecoilState(Domain)
  const allDomains = useRecoilValue(Domain)
  const previousAllRecordstate = useRecoilValue(PreviousStateAllRecords)
  const setPreviousAllRecordstate = useSetRecoilState(PreviousStateAllRecords)
  const SetAllRecords = useSetRecoilState(Record)
  const allRecords = useRecoilValue(Record)
  const setHostZoneId = useSetRecoilState(hostedZoneIdDomain)
  const setSpinner = useSetRecoilState(SpinnerState)
  const multipleRecords = useRecoilValue(multipleRecord)

  const handleCreateDomain = async () => {

    
  }
  
  const handleCreateRecord = async () => {
    if(allDomains.some(eachDomain => eachDomain.Name.includes(domain))){

    }else{
      setSpinner(true)
      console.log("hzid")
    const hzid  = await createDomain()
    let newRecordCopy:recordInterface = JSON.parse(JSON.stringify(newRecord));
    newRecordCopy.record.param.HostedZoneId = hzid as string;

    console.log("domain created");
    await createRecord(hzid as string,newRecordCopy);


    console.log("sdalsdfadfk323")

    setSpinner(false)
    onClose();
    }
    
    
    
  };



  // set sendRecord to true only when use adds a new record - to dynamically decide to send create record request or not
  useEffect(() => {
    setSendRecord(true)
    // SetNumRecordsToSend(prev => prev + 1) 
  }, [newRecord])

  useEffect(() => {

  }, [])

  // to counter the effect of, init of newRecord calling above useEffect - keeping sendRecord to false on initial render


  console.log(numRecordsToSend)

  const createDomain = async () => {

    try {

      const response = await axios.post(`${ENV.VITE_APP_BASE_URL}/api/domain/create`, { domain }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },


      })
      if (response) {
        console.log(response, "new domain")
        const data: { message: string, hostedZoneId: string } = response.data
        const hzid =  data.hostedZoneId
        console.log(data, "hzidsdf")
        console.log(hzid, "hzidsdf")
        setHostZoneId({
          domain,
          hostedZoneId: data.hostedZoneId
        })


        SetAllDomains(prev => [...prev, { Name: domain,hostedZoneId:data.hostedZoneId }])
        setSingleRecord(prev => ({
          ...prev, record: {
            ...prev.record,param:{
              ...prev.record.param,hostedZoneId : hzid
            }
          }
        }))

        console.log("skdlfask")
        return hzid
      }
    }
    catch (err) {
      console.log(err, "error while creating domain")
    }


  }

  const createRecord = async (hzid:string,newRecordCopy:recordInterface) => {
    try {
      // if new record created
      if (sendRecord == true) {
        console.log("in send", sendRecord, numRecordsToSend)
        if (numRecordsToSend > 1) {
          SetNumRecordsToSend(0)
          
          console.log("many,",multipleRecords)
          
           const multipleRecordsMod = multipleRecords.map(eachRecord => {
            const newRecord = JSON.parse(JSON.stringify(eachRecord)) // if we dont do this cloning , error is thrown saying cannot modify readonly object - because multipleRecords is a state variable
            newRecord.record.param.ChangeBatch.Changes[0].Action = "CREATE"
            return newRecord
           })

          //create a single record to send
          const Changes= multipleRecordsMod.map(eachRecord=>
           { return (eachRecord.record.param.ChangeBatch.Changes[0])}
          )
          const recordToSend:recordInterface = JSON.parse(JSON.stringify(multipleRecords[0]))
          recordToSend.record.param.HostedZoneId = hzid
          recordToSend.record.param.ChangeBatch.Changes = Changes
          
          console.log(recordToSend,"record to send multiple") 
          const response = await axios.post(`${ENV.VITE_APP_BASE_URL}/api/record/bulk/create`, {record:recordToSend.record,routingPolicy:recordToSend.routingPolicy}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          if(response){
            console.log(response,"multiple records set")
            setPreviousAllRecordstate(allRecords)
        
            setDomain("")
            // SetAllRecords(prev => [...prev,...multipleRecords])

          }else{
            SetAllRecords(previousAllRecordstate) 
          }
          // multiple remaining !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        else {

          console.log(newRecordCopy, domain, "sdfasdf322")
          const response = await axios.post(`${ENV.VITE_APP_BASE_URL}/api/record/create`, {newRecordCopy,hostedZoneId:hzid}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          console.log("after response")
          if (response) {
            console.log(response, "new record")
            // update records only after getting response
            setPreviousAllRecordstate(allRecords)
            SetNumRecordsToSend(0)
            setDomain("")
            setSingleRecord(newRecordCopy)
            SetAllRecords(prev => [...prev,newRecordCopy])
          }
          else {
            // allRecords are already set while adding them
            // below code is to rollback to previous that if records creation status is not 200 ok
            SetAllRecords(previousAllRecordstate)
          }


        }
      }
    }
    catch (err) {
      console.log(err, "error while creating record")
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed z-40 inset-0 overflow-y-auto w-full">
          <div className="flex items-center justify-center h-[80vh]">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-[#fefefe] rounded-md p-8  relative">
              <input
                type="text"
                name=""
                id=""
                value={domain}
                className="border  rounded-sm w-full h-[7vh] mb-7 bg-slate-100 pl-2 shadow  hover:border-orange-300 "
                placeholder="Domain"
                onChange={(e) => { 
                  setDomain(e.target.value) }}
              />
              {/* <div className="mb-4">
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
              </div> */}
              {/* <div className='flex justify-end'>
                <button
                  onClick={handleCreateDomain}
                  className="bg-orange-500 text-white px-4  rounded-sm ml-2 text-sm font-bold"
                >
                  Create Done
                </button>
              </div> */}
              <Title text="Records" />
              <RecordList />
              <div className="flex justify-end mt-7 gap-x-1">
                <button
                  onClick={handleCreateRecord}
                  className="bg-orange-500 text-white px-4 py-2 rounded ml-2 text-md font-semibold"
                >
                  Create Records
                </button>
                <button
                  onClick={onClose}
                  className="ml-2 bg-red-600 text-slate-100 px-4 py-1 rounded text-md font-normal"
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
