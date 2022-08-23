import { client } from "./client";
import {useQuery} from 'react-query';
import { combineHost } from "../constants/configuration";
import { entries, resources } from "../constants/enums";


export const getAlCountries =async()=>{
    const entry =entries.anonym;
    const endpoint = `${combineHost}/${entry}/${resources.countries}`;
    const countries = await client.get(endpoint, null, null);
    return countries;
}

