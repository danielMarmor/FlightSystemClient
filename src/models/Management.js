import {  entries, resources} from '../constants/enums';
import { combineHost } from "../constants/configuration";
import { client } from '../api/client';

export const GetAdministratorsByParams=async(search)=>{
    const searchParams = {'search': search};
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}/${resources.adminSearch}`;
    const airlines = await client.get(endpoint, null, searchParams);
    return airlines;
 }