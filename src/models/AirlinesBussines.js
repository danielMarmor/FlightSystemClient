import {  entries, resources} from '../constants/enums';
import { combineHost } from "../constants/configuration";
import { client } from '../api/client';
import { CompareByAirlineName } from '../utilities/compare';
import { numbers } from '../constants/configuration';

export const GetAirlinesBussiness=async(search)=>{
    const searchParams = {'search': search};
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}/${resources.airline_bussines}`;
    const airlines = await client.get(endpoint, null, searchParams);
    return airlines;
 }

 export const SortAirlinesBusinnes=(airlines, filters)=>{
    const {active, country_id} = filters;
    const  filteredAirlines =  airlines.filter(air =>{
        const isActive = !active  || (active  && air.sum_sales >0);
        const isCountry = country_id == numbers.noSelectedValue || air.country_id == country_id;
        return isActive && isCountry;
    });
    return filteredAirlines.sort((a, b)=>{
        return CompareByAirlineName(a, b);
    });
 }
 


