import { entries, userType } from "./enums";

export const convertUserTypeToEntry =(userTypeId) =>{
    switch(userTypeId){
        case userType.anonym:
            return entries.anonym;
        case userType.customer:
            return entries.customer;
        case userType.airline:
            return entries.airlien;
        case userType.admin:
            return entries.admin;
        default:
            throw Error('Invalid User Type!')
    }
}
