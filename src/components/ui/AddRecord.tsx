import { useSetRecoilState } from "recoil";
import { NumRecordsToSend, Record, multipleRecord, singleRecord } from "../../store/atoms/records";
import { recordInterface } from "../../types/recordInterface";
import Button from "./Button";
import { useState } from "react";
import down from '../../img/down.png';

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


function DropdownButton({ label, options, isOpen, toggleDropdown, setValue, showLabel }: { label: string, options: string[], isOpen: boolean, toggleDropdown: () => void, setValue: (value: string) => void, showLabel: boolean }) {

    const [click, setClicked] = useState<boolean>(false)
    const [optionClicked, SetOptionClicked] = useState<string>("")
    return (
        <div className='col-span-1  w-28 text-lg'>
            <div className="relative bg-white flex">
                <button
                    onClick={toggleDropdown}
                    className="flex justify-between items-center px-4 mt-2 w-[10vw] h-[5vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm overflow-hidden"
                >
                    {   // XOR
                        (click === false && showLabel === true) || (click === true && showLabel === false) ?
                            <div className="flex justify-between">
                                <span className="truncate">{label}</span>
                                <img src={down} alt="" className='w-[20%] h-1/2 ' />

                            </div> :
                            <div className="flex justify-between">
                                <span className="truncate">{optionClicked}</span>
                                <img src={down} alt="" className='w-[20%] h-1/2 ' />
                            </div>
                    }

                </button>
                {isOpen && (
                    <div className="absolute z-20 right-0 mt-[4vh] top-2 w-[250%] bg-white border border-gray-300 rounded-md shadow-lg">
                        <ul>
                            {options.map((option, index) => (
                                <>
                                    <h1 key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-lg w-[100%]" onClick={() => {
                                        setClicked(prev => !prev)
                                        SetOptionClicked(option)
                                        toggleDropdown()
                                        setValue(option)
                                    }}>{option}</h1>
                                    <hr />
                                </>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export const TypeOptions = ["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SRV", "TXT", "DNSSEC"]

// export const PolicyOptions = ["Simple Routing", "Weighted Routing", "Latency Routing", "Failover Routing", "Geolocation Routing", "Multi-Value Routing", "Geoproximity Routing"]
export const PolicyOptions = ["Simple Routing"]

export const AliasOptions = ["true", "false"]

export default function AddRecord() {
    const setOneRecords = useSetRecoilState(singleRecord)
    const setMultipleRecords = useSetRecoilState(multipleRecord)
    const [isOpenType, setIsOpenType] = useState<boolean>(false)
    const [isOpenRP, setIsOpenRP] = useState<boolean>(false)
    const [isOpenAlias, setIsOpenAlias] = useState<boolean>(false)
    const SetNumRecordsToSend = useSetRecoilState(NumRecordsToSend)
    const SetAllRecords = useSetRecoilState(Record)

    const [recordToSet, setRecordToSet] = useState<recordInterface>(RecordToSet)
    const [showLabel, setShowLabel] = useState<boolean>(true)


    return (
        // <div className="flex  ml-5">
        <>
            <div className='grid grid-cols-7 gap-x-4'>
                <div className='col-span-1 text-center mt-2'>
                    <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Name}
                        placeholder='Enter record name'
                        onChange={(e) => {
                            console.log(recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Name, "rnsdfa")
                            console.log(e.target.value, "rn")
                            setRecordToSet(prev => ({
                                ...prev, record: {
                                    ...prev.record,
                                    param: {
                                        ...prev.record.param,
                                        ChangeBatch: {
                                            ...prev.record.param.ChangeBatch,
                                            Changes:[{
                                                ...prev.record.param.ChangeBatch.Changes[0],
                                                ResourceRecordSet:{
                                                    ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet,
                                                    Name:e.target.value
                                                }
                                            }
                                            ]
                                           
                                        }
                                    }
                                }
                            }))
                            // recordToSet.record.param.ResourceRecordSet.Name = e.target.value

                        }}
                    />
                </div>

                <div className='col-span-1  text-center'>
                    {/* <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
            
                        placeholder='Enter record Type'
                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.Type = e.target.value)}
                    /> */}
                    <DropdownButton
                        label="Type"
                        options={TypeOptions}
                        isOpen={isOpenType}
                        toggleDropdown={() => {
                            setIsOpenType((prev) => !prev)
                            setIsOpenRP(false)
                            setIsOpenAlias(false)
                        }}
                        setValue={(value) => {
                            console.log(value, "val")
                            setRecordToSet(prev => ({
                                ...prev, record: {
                                    ...prev.record,
                                    param: {
                                        ...prev.record.param,
                                       ChangeBatch: {
                                            ...prev.record.param.ChangeBatch,
                                            Changes:[{
                                                ...prev.record.param.ChangeBatch.Changes[0],
                                                ResourceRecordSet:{
                                                    ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet,
                                                    Type:value
                                                }
                                            }
                                            ]
                                           
                                        }
                                    }
                                }
                            }))

                        }}
                        showLabel={showLabel}
                    />
                </div>
                <div className='col-span-1 mt-2 text-center'>
                    <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords ? (recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords[0].Value) : ""}
                        placeholder='Enter record value'
                        onChange={(e) => {
                            if (recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords) {
                                setRecordToSet(prev => ({
                                    ...prev, record: {
                                        ...prev.record,
                                        param: {
                                            ...prev.record.param,
                                           ChangeBatch:{
                                           ...prev.record.param.ChangeBatch,
                                            Changes:[{
                                                ...prev.record.param.ChangeBatch.Changes[0],
                                                ResourceRecordSet:{
                                                    ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet,
                                                    ResourceRecords: prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords ? [{
                                                        ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords[0],Value:e.target.value
                                                    }] : undefined
                                                }
                                            }
                                            ]
                                        }
                                    }}
                                }))
                                // recordToSet.record.param.ResourceRecordSet.ResourceRecords[0].Value = e.target.value
                                console.log(recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords[0].Value)
                            }
                        }}
                    />
                </div>
                <div className='col-span-1  text-center '>
                    {/* <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
            
                        placeholder='Enter routing policy'
                        onChange={(e) => (recordToSet.routingPolicy = e.target.value)}
                    /> */}
                    <DropdownButton
                        label="Routing Policy"
                        options={PolicyOptions}
                        isOpen={isOpenRP}
                        toggleDropdown={() => {
                            setIsOpenRP((prev) => !prev)
                            setIsOpenType(false)
                            setIsOpenAlias(false)
                        }}
                        setValue={(value) => {
                            recordToSet.routingPolicy = value
                            setRecordToSet(prev => ({
                                ...prev, routingPolicy: value
                            }))
                        }}
                        showLabel={showLabel}

                    />
                </div >
                <div className='col-span-1  text-center '>
                    {/* <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'

                        placeholder='Enter alias'
                        onChange={(e) => {
                            if (recordToSet.record.param.ResourceRecordSet.AliasTarget) {
                                recordToSet.record.param.ResourceRecordSet.AliasTarget.EvaluateTargetHealth = !!e.target.value
                            }
                        }
                        }
                    /> */}
                    <DropdownButton
                        label="Alias"
                        options={AliasOptions}
                        isOpen={isOpenAlias}
                        toggleDropdown={() => {
                            setIsOpenAlias((prev) => !prev)
                            setIsOpenRP(false)
                            setIsOpenType(false)
                        }}
                        setValue={(value) => {
                            if (!!value == true) {
                                setRecordToSet(prev => ({
                                    ...prev, record: {
                                        ...prev.record,
                                        param: {
                                            ...prev.record.param,
                                           ChangeBatch:{
                                           ...prev.record.param.ChangeBatch,
                                            Changes:[{
                                                ...prev.record.param.ChangeBatch.Changes[0],
                                                ResourceRecordSet:{
                                                    ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet,
                                                    AliasTarget:prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet.AliasTarget ? {
                                                        ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet.AliasTarget,
                                                        EvaluateTargetHealth: !!value, DNSName:"something dns" , HostedZoneId:"something id"
                                                    }: undefined
,                                                }
                                            }
                                            ]
                                        }}}}))}
                           
                                else{
                                    setRecordToSet(prev => ({
                                        ...prev, record: {
                                            ...prev.record,
                                            param: {
                                                ...prev.record.param,
                                               ChangeBatch:{
                                               ...prev.record.param.ChangeBatch,
                                                Changes:[{
                                                    ...prev.record.param.ChangeBatch.Changes[0],
                                                    ResourceRecordSet:{
                                                        ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet,
                                                        AliasTarget: undefined
    ,                                                }
                                                }
                                                ]
                                            }}}}))
                                }
                                
                            }
                        }
                        showLabel={showLabel}

                    />
                </div>
                <div className='col-span-1 mt-2  text-center '>
                    <input
                        type="number"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.TTL}
                        placeholder='Enter TTL'
                        onChange={(e) => {
                            console.log(recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Name, "rnsdfa")
                            console.log(e.target.value, "rn")
                            setRecordToSet(prev => ({
                                ...prev, record: {
                                    ...prev.record,
                                    param: {
                                        ...prev.record.param,
                                        ChangeBatch: {
                                            ...prev.record.param.ChangeBatch,
                                            Changes:[{
                                                ...prev.record.param.ChangeBatch.Changes[0],
                                                ResourceRecordSet:{
                                                    ...prev.record.param.ChangeBatch.Changes[0].ResourceRecordSet,
                                                    TTL:parseInt(e.target.value)
                                                }
                                            }
                                            ]
                                           
                                        }
                                    }
                                }
                            }))
                            // recordToSet.record.param.ResourceRecordSet.Name = e.target.value

                        }}
                    />
                </div>

                <div className="inline-flex mt-2">
                    <Button text="Add" callBack={() => {
                        SetNumRecordsToSend(prev => prev + 1)
                        setOneRecords(recordToSet)
                        setMultipleRecords(multiple =>[...multiple,recordToSet])
                        SetAllRecords(prev => [...prev, recordToSet])
                        console.log(recordToSet, "record to set")
                        setRecordToSet(RecordToSet)
                        setShowLabel((prev) => !prev)

                    }} />
                </div>
            </div >

            {/* // </div> */}
        </>

    )
}
