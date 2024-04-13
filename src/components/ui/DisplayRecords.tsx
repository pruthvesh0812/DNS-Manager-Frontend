import { useSetRecoilState } from "recoil";
import { NumRecordsToSend, Record, singleRecord } from "../../store/atoms/records";
import { recordInterface } from "../../types/recordInterface";
// import Button from "./Button";
import { useEffect, useState } from "react";
import down from '../../img/down.png';
// import deleteImg from '../../img/delete.png';
import setting from '../../img/setting.png';
import Button from "./Button";

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
                    AliasTarget: {
                        DNSName: "",
                        EvaluateTargetHealth: false,
                        HostedZoneId: ""
                    },
                    CidrRoutingConfig: {
                        CollectionId: "",
                        LocationName: ""
                    },
                    Failover: "",
                    GeoLocation: {
                        ContinentCode: "",
                        CountryCode: "",
                        SubdivisionCode: ""
                    },
                    GeoProximityLocation: {
                        AWSRegion: "",
                        Bias: 0,
                        Coordinates: {
                            Latitude: "",
                            Longitude: ""
                        },
                        LocalZoneGroup: ""
                    },
                    HealthCheckId: "",
                    MultiValueAnswer: false,
                    Region: "",
                    ResourceRecords: [
                        {
                            Value: ""
                        }
                    ],
                    SetIdentifier: "",
                    TTL: 0,
                    TrafficPolicyInstanceId: "",
                    Weight: 0,
                }
            }],
            Comment: ""
            },

            HostedZoneId: ""
        },
    },
    routingPolicy: ""
}

function DropdownButton({ label, options, isOpen, toggleDropdown, setValue }: { label: string, options: string[], isOpen: boolean, toggleDropdown: () => void, setValue: (value: string) => void }) {

    const [click, setClicked] = useState<boolean>(false)
    const [optionClicked, SetOptionClicked] = useState<string>("")
    return (
        <div className='col-span-1  w-28 text-lg'>
            <div className="relative bg-white flex">
                <button
                    onClick={toggleDropdown}
                    className="flex justify-between items-center px-4 mt-2 w-[10vw] h-[5vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm overflow-hidden"
                >
                    {
                        (click == false) ?
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
                    <div className="absolute z-30 right-0 mt-[4vh] top-2 w-[250%] bg-white border border-gray-300 rounded-md shadow-lg">
                        <ul>
                            {options.map((option, index) => (
                                <>
                                    <h1 key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-lg w-[100%]" onClick={() => {
                                        setClicked(true)
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

export default function DisplayRecords({ record, isEdit }: { record: recordInterface, isEdit: boolean }) {
    const setOneRecords = useSetRecoilState(singleRecord)
    const [isOpenType, setIsOpenType] = useState<boolean>(false)
    const [isOpenRP, setIsOpenRP] = useState<boolean>(false)
    const [isOpenAlias, setIsOpenAlias] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const SetNumRecordsToSend = useSetRecoilState(NumRecordsToSend)
    const SetAllRecords = useSetRecoilState(Record)
    const [recordToSet, setRecordToSet] = useState<recordInterface>(RecordToSet)

    useEffect(() => {
        setEdit(isEdit);
        setRecordToSet(record)
    }, [record])

    let value = ""
    let alias = ""
    if (recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords) {
        value = recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.ResourceRecords[0].Value
    }
    if (recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.AliasTarget) {
        alias = String(recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.AliasTarget.EvaluateTargetHealth)
    }
    return (
        <>
            <div className='grid grid-cols-7 gap-x-4'>
                <div className='col-span-1  text-center mt-2'>
                    <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Name}
                        placeholder='Enter name'
                        disabled={!edit}
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

                <div className='col-span-1 text-center'>

                    {
                        (edit) ?
                            <div>
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
                                />
                            </div> :
                            <div>
                                <input
                                    type="text"
                                    className='text-lg border-2 mt-2 mr-3 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                                    value={recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.Type}
                                    placeholder='Enter Type'
                                    disabled={!edit}

                                // onChange={(e) => (recordToSet.record.param.ResourceRecordSet.Type = e.target.value)}
                                />
                            </div>

                    }

                </div>
                <div className='col-span-1  mt-2 text-center'>
                    <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={value}
                        placeholder='Enter value'
                        disabled={!edit}

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
                <div className='col-span-1 text-center'>

                    {
                        (edit) ?
                            <div>
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
                                        
                                        setRecordToSet(prev => ({
                                            ...prev, routingPolicy: value
                                        }))
                                    }}
                                />
                            </div> :
                            <div>
                                <input
                                    type="text"
                                    className='text-lg border-2 px-1 mt-2 mr-3 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                                    value={recordToSet.routingPolicy}
                                    placeholder='Enter routing policy'
                                    disabled={!edit}

                                // onChange={(e) => (recordToSet.routingPolicy = e.target.value)}
                                />
                            </div>

                    }

                </div >
                <div className='col-span-1 text-center'>

                    {
                        (edit) ?
                            <div>
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
                                />
                            </div> :
                            <div>
                                <input
                                    type="text"
                                    className='text-lg border-2 px-1 mt-2 mr-3 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                                    value={alias}
                                    placeholder='Enter alias'
                                    disabled={!edit}
                                />
                            </div>

                    }

                </div>
                <div className='col-span-1 mt-2 text-center'>
                    <input
                        type="text"
                        className='text-lg border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={recordToSet.record.param.ChangeBatch.Changes[0].ResourceRecordSet.TTL}
                        placeholder='Enter TTL'
                        disabled={!edit}

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
                    <img src={setting} alt="" className='w-8' onClick={() => { setEdit((p) => !p) }} />

                    {/* <img src={deleteImg} onClick={openModal}  alt="" className='w-[20%] ml-3 cursor-pointer'/> */}
                    {/* <DeleteConfirm isOpen={isModal} onClose={closeModal} handleDelete={handleDelete} id={domain.id}/> */}
                    {
                        (edit) ?
                            <div>
                                <Button text="Done" callBack={() => {
                                    SetNumRecordsToSend(prev => prev + 1)
                                    setOneRecords(recordToSet)
                                    SetAllRecords(prev => [...prev.slice(0, -1), recordToSet])
                                    console.log(recordToSet, "record to set")
                                    setEdit(false)
                                }} />
                            </div>
                            :
                            <div>
                            </div>
                    }
                </div>


            </div >

        </>


    )
}
