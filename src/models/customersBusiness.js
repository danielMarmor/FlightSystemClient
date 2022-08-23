import { directions , sortByField, entries, resources} from '../constants/enums';
import { CompareByCutomerNameAsc, CompareByCutomerNameDesc ,
    CompareByCutomerPurchasesAsc, CompareByCutomerPurchasesDesc} from '../utilities/compare';
import { combineHost } from "../constants/configuration";
import { client } from '../api/client';

export const GetCustomersBussiness=async(search)=>{
   const searchParams = {'search': search};
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.customer_bussines}`;
   const customers = await client.get(endpoint, null, searchParams);
   return customers;
}

export const SortCustomerBusinnes=(customers, filters)=>{
    let filteredCustomers;
    const {active, sortBy, direction} = filters;
       filteredCustomers =  customers.filter(cust =>{
       const isActive = !active  || (active  && cust.total_purchases >0);
       return isActive;
    });
    //ORDER 
    if (sortBy == sortByField.customerName){
       if (direction == directions.ascending){
          filteredCustomers.sort((a, b)=>{
             return CompareByCutomerNameAsc(a,b);
          });
       }
       else{
          filteredCustomers.sort((a, b)=>{
             return CompareByCutomerNameDesc(a,b);
          });
       }
    }
    else{
       if (direction == directions.ascending){
          filteredCustomers.sort((a, b)=>{
             return CompareByCutomerPurchasesAsc(a,b);
          });
       }
       else{
          filteredCustomers.sort((a, b)=>{
             return CompareByCutomerPurchasesDesc(a,b);
          });
       }
    }
    return filteredCustomers;    
 };