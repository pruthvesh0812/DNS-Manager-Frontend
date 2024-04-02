import { useEffect, useState } from 'react';
import Title from '../components/ui/Title';
import RecordList from '../components/ui/RecordList';
import axios from 'axios';
import { NumRecordsToSend, PreviousStateAllRecords, Record, singleRecord } from '../store/atoms/records';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import { Domain, hostedZoneIdDomain } from '../store/atoms/domains';
import { BASE_URL } from '../App';
import { recordInterface } from '../types/recordInterface';

type AddDomainType = {
  isOpen: boolean,
  onClose: () => void
}

const RecordToSet: recordInterface = {
  record: {
      param: {
          Action:"",
          ChangeBatch: {
              Changes:[{
                  Action: "",
              ResourceRecordSet: {
                  Name: "",
                  Type: "",
                  // AliasTarget: undefined || {
                      // DNSName: "",
                      // EvaluateTargetHealth: false,
                      // HostedZoneId: ""
                  // },
                  // CidrRoutingConfig: undefined || {
                      // CollectionId: "",
                      // LocationName: ""
                  // },
                  // Failover:undefined ||  "",
                  // GeoLocation: undefined || {
                      // ContinentCode: "",
                      // CountryCode: "",
                      // SubdivisionCode: ""
                  // },
                  // GeoProximityLocation:undefined || {
                      // AWSRegion: "",
                      // Bias: 0,
                      // Coordinates: {
                          // Latitude: "",
                          // Longitude: ""
                      // },
                      // LocalZoneGroup:undefined || ""
                  // },
                  // HealthCheckId: undefined ||"",
                  // MultiValueAnswer: false,
                  // Region: undefined || "",
                  ResourceRecords: [
                      {
                          Value: ""
                      }
                  ],
                  // SetIdentifier:undefined || "",
                  TTL: 0,
                  // TrafficPolicyInstanceId:undefined || "",
                  // Weight: undefined || 0,
              }
          }],
          Comment: "dfdsfa"
          },

          HostedZoneId: ""
      },
  },
  routingPolicy: ""
}

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

  const handleCreateDomain = async () => {

    
  }
  
  const handleCreateRecord = async () => {
    if(allDomains.includes({Name:domain})){

    }else{
      console.log("hzid")
    const hzid  = await createDomain()
    
    console.log("domain created");
    await createRecord(hzid as string);


    console.log("sdalsdfadfk323")


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
    let hostedZoneID = ""
    try {

      const response = await axios.post(`${BASE_URL}/api/domain/create`, { domain }, {
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


        SetAllDomains(prev => [...prev, { Name: domain }])
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

  const createRecord = async (hzid:string) => {
    try {
      // if new record created
      if (sendRecord == true) {
        console.log("in send", sendRecord, numRecordsToSend)
        if (numRecordsToSend > 1) {
          SetNumRecordsToSend(0)
          console.log("many")
          // multiple remaining !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
        else {

          console.log(newRecord, domain, "sdfasdf322")
          const response = await axios.post(`${BASE_URL}/api/record/create`, {newRecord,hostedZoneId:hzid}, {
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
            setSingleRecord(RecordToSet)
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
                onChange={(e) => { 
                  setDomain(e.target.value) }}
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
              <div className='flex justify-end'>
                <button
                  onClick={handleCreateDomain}
                  className="bg-orange-500 text-white px-4  rounded-sm ml-2 text-sm font-bold"
                >
                  Create Done
                </button>
              </div>
              <Title text="Records" />
              <RecordList />
              <div className="flex justify-end mt-5">
                <button
                  onClick={handleCreateRecord}
                  className="bg-orange-500 text-white px-4  rounded-sm ml-2 text-sm font-bold"
                >
                  Create Records
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
