import { atom } from "recoil";
import { recordInterface } from "../../types/recordInterface";


const record:recordInterface[] = []
const oneRecord:recordInterface = {
        record:{
        param:{
            Action:"",
            ResourceRecordSet:{
                Name:"",
                Type:"",
                AliasTarget: {
                    DNSName:"",
                    EvaluateTargetHealth:false,
                    HostedZoneId:""
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
                GeoProximityLocation:{
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
                TTL: 0 ,
                TrafficPolicyInstanceId: "",
                Weight: 0,
            },
            Comment: ""
        },
        hostedZoneId: ""
    },
        routingPolicy:""
}

export const Record = atom({
    key:"userDomain",
    default:record
})

export const singleRecord = atom({
    key:"singleRecord",
    default:oneRecord
})



export const SearchRecord = atom<string>({
    key:"searchR",
    default:""
})