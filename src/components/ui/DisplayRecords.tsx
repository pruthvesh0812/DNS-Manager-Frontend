import { useSetRecoilState } from "recoil";
import { Record, singleRecord } from "../../store/atoms/records";
import { recordInterface } from "../../types/recordInterface";
// import Button from "./Button";
import { useEffect, useState } from "react";
import down from '../../img/down.png';
// import deleteImg from '../../img/delete.png';
import setting from '../../img/setting.png';
import Button from "./Button";

const recordToSet: recordInterface = {
    record: {
        param: {
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
            },
            Comment: ""
        },
        hostedZoneId: ""
    },
    routingPolicy: ""
}

function DropdownButton({ label, options, isOpen, toggleDropdown }: { label: string, options: string[], isOpen: boolean, toggleDropdown: () => void }) {
    return (
        <div className='col-span-1'>
            <div className="relative bg-white flex">
                <button
                    onClick={toggleDropdown}
                    className="flex justify-between items-center px-4 mt-2 w-[10vw] h-[5vh] text-sm font-medium text-gray-700 bg-gray-200 border border-black rounded-sm overflow-hidden"
                >
                    <span className="truncate">{label}</span>
                    <img src={down} alt="" className='w-[20%] h-1/2 ' />
                </button>
                {isOpen && (
                    <div className="absolute z-10 right-0 mt-[4vh] top-2 w-[6vw] bg-white border border-gray-300 rounded-md shadow-lg">
                        <ul>
                            {options.map((option, index) => (
                                <li key={index} className="px-2 py-1 cursor-pointer hover:bg-gray-100 text-xs">{option}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export const TypeOptions = ["A", "AAAA", "CNAME", "MX", "NS", "PTR", "SOA", "SRV", "TXT", "DNSSEC"
]

export const PolicyOptions = ["Simple Routing", "Weighted Routing", "Latency-Based Routing", "Failover Routing", "Geolocation Routing", "Multi-Value Routing", "Geoproximity Routing"]

export const AliasOptions = ["true", "false"]

export default function DisplayRecords({ record, isEdit }: { record: recordInterface, isEdit: boolean }) {
    const setOneRecords = useSetRecoilState(singleRecord)
    const [isOpenType, setIsOpenType] = useState<boolean>(false)
    const [isOpenRP, setIsOpenRP] = useState<boolean>(false)
    const [isOpenAlias, setIsOpenAlias] = useState<boolean>(false)
    const [edit,setEdit] = useState<boolean>(false)

    useEffect(()=>{
        setEdit(isEdit);
    })

    let value = ""
    let alias = ""
    if (record.record.param.ResourceRecordSet.ResourceRecords) {
        value = record.record.param.ResourceRecordSet.ResourceRecords[0].Value
    }
    if (record.record.param.ResourceRecordSet.AliasTarget) {
        alias = String(record.record.param.ResourceRecordSet.AliasTarget.EvaluateTargetHealth)
    }
    return (
        <div className="flex justify-between">
            <div className='grid grid-cols-7 gap-x-4'>
                <div className='col-span-1 mt-2'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={record.record.param.ResourceRecordSet.Name}
                        placeholder='Enter record name'
                        disabled={!edit}
                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.Name = e.target.value)}
                    />
                </div>

                <div className='grid grid-cols-7 gap-x-4'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={record.record.param.ResourceRecordSet.Type}
                        placeholder='Enter record Type'
                        disabled={!edit}

                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.Type = e.target.value)}
                    />
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
                                />
                            </div> :
                            <div></div>

                    }

                </div>
                <div className='grid grid-cols-7 gap-x-4'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={value}
                        placeholder='Enter record value'
                        disabled={!edit}

                        onChange={(e) => {
                            if (recordToSet.record.param.ResourceRecordSet.ResourceRecords) {
                                recordToSet.record.param.ResourceRecordSet.ResourceRecords[0].Value = e.target.value
                            }
                        }}
                    />
                </div>
                <div className='grid grid-cols-7 gap-x-4'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={record.routingPolicy}
                        placeholder='Enter routing policy'
                        disabled={!edit}

                        onChange={(e) => (recordToSet.routingPolicy = e.target.value)}
                    />
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
                                />
                            </div> :
                            <div></div>

                    }

                </div >
                <div className='grid grid-cols-7 gap-x-4'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={alias}
                        placeholder='Enter alias'
                        disabled={!edit}

                        onChange={(e) => {
                            if (recordToSet.record.param.ResourceRecordSet.AliasTarget) {
                                recordToSet.record.param.ResourceRecordSet.AliasTarget.EvaluateTargetHealth = !!e.target.value
                            }
                        }
                        }
                    />
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
                                />
                            </div> :
                            <div></div>

                    }

                </div>
                <div className='grid grid-cols-7 gap-x-4'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value={record.record.param.ResourceRecordSet.TTL}
                        placeholder='Enter TTL'
                        disabled={!edit}

                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.TTL = parseInt(e.target.value))}
                    />
                </div>


            </div >
            <div className='flex absolute -right-4 mt-2'>
                    
                    <img src={setting} alt="" className='w-[20%]' onClick={()=>{setEdit(true)}}/>
                    {/* <img src={deleteImg} onClick={openModal}  alt="" className='w-[20%] ml-3 cursor-pointer'/> */}
                    {/* <DeleteConfirm isOpen={isModal} onClose={closeModal} handleDelete={handleDelete} id={domain.id}/> */}
                    {
                        (edit)?
                        <div>
                            <Button text="done" callBack={() => {
                                setOneRecords(recordToSet)
                                console.log(recordToSet,"record to set")
                            }} />
                        </div>
                        :
                        <div>
                        </div>
                    }
                </div>
               
        </div>
        

    )
}
