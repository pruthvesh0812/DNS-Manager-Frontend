import { useSetRecoilState } from "recoil";
import { Record, singleRecord } from "../../store/atoms/records";
import { recordInterface } from "../../types/recordInterface";
import Button from "./Button";
import { useState } from "react";
import down from '../../img/down.png';

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

export const AliasOptions = ["true","false"]

export default function AddRecord() {
    const setOneRecords = useSetRecoilState(singleRecord)
    const [isOpenType,setIsOpenType] = useState<boolean>(false)
    const [isOpenRP,setIsOpenRP] = useState<boolean>(false)
    const [isOpenAlias,setIsOpenAlias] = useState<boolean>(false)

    return (
        <div className="flex justify-between">
            <div className='grid grid-cols-7 gap-x-4'>
                <div className='col-span-1 mt-2'>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value=""
                        placeholder='Enter record name'
                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.Name = e.target.value)}
                    />
                </div>

                <div className='col-span-1 mt-2 '>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value=""
                        placeholder='Enter record Type'
                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.Type = e.target.value)}
                    />
                    <DropdownButton
                        label="Type"
                        options={TypeOptions}
                        isOpen={isOpenType}
                        toggleDropdown={()=>{
                            setIsOpenType((prev)=>!prev)
                            setIsOpenRP(false)
                            setIsOpenAlias(false)
                        }}
                    />
                </div>
                <div className='col-span-1 mt-2 '>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value=""
                        placeholder='Enter record value'
                        onChange={(e) => {
                            if (recordToSet.record.param.ResourceRecordSet.ResourceRecords) {
                                recordToSet.record.param.ResourceRecordSet.ResourceRecords[0].Value = e.target.value
                            }
                        }}
                    />
                </div>
                <div className='col-span-1 mt-2 '>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value=""
                        placeholder='Enter routing policy'
                        onChange={(e) => (recordToSet.routingPolicy = e.target.value)}
                    />
                    <DropdownButton
                        label="Routing Policy"
                        options={PolicyOptions}
                        isOpen={isOpenRP}
                        toggleDropdown={()=>{
                            setIsOpenRP((prev)=>!prev)
                            setIsOpenType(false)
                            setIsOpenAlias(false)
                        }}
                    />
                </div >
                <div className='col-span-1 mt-2 '>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value=""
                        placeholder='Enter alias'
                        onChange={(e) => {
                            if (recordToSet.record.param.ResourceRecordSet.AliasTarget) {
                                recordToSet.record.param.ResourceRecordSet.AliasTarget.EvaluateTargetHealth = !!e.target.value
                            }
                        }
                        }
                    />
                    <DropdownButton
                        label="Alias"
                        options={AliasOptions}
                        isOpen={isOpenAlias}
                        toggleDropdown={()=>{
                            setIsOpenAlias((prev)=>!prev)
                            setIsOpenRP(false)
                            setIsOpenType(false)

                        }}
                    />
                </div>
                <div className='col-span-1 mt-2 '>
                    <input
                        type="text"
                        className='text-xs border-2 px-1 h-[5vh] w-[7vw] rounded-sm border-gray-600'
                        value=""
                        placeholder='Enter TTL'
                        onChange={(e) => (recordToSet.record.param.ResourceRecordSet.TTL = parseInt(e.target.value))}
                    />
                </div>


            </div >
            <div>
                <Button text="Add" callBack={() => {
                    setOneRecords(recordToSet)
                    console.log(recordToSet,"record to set")
                }} />
            </div>
        </div>

    )
}
