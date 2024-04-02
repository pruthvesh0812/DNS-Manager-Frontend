import { atom } from "recoil";
import { recordInterface } from "../../types/recordInterface";


const record: recordInterface[] = []
const oneRecord: recordInterface | undefined = {
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

export const Record = atom({
    key: "user all records",
    default: record
})

export const singleRecord = atom({
    key: "singleRecord",
    default: oneRecord
})



export const SearchRecord = atom<string>({
    key: "searchR",
    default: ""
})

export const NumRecordsToSend = atom<number>({
    key: "numberOFRec",
    default: 0
})

export const PreviousStateAllRecords = atom({
    key: "previous all record state",
    default: record
})