import React from 'react'
import axios from 'axios';
import { composeEndPoint } from './composeReuqests';

const axisoConfig ={
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*', 
    }
}

const get =async(endpoint ,params, queryParams)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, queryParams); 
    const response = await axios.get(composedEndPoint, axisoConfig);   
    const data = await response.data;
    return data;    
}

const post =async(endpoint ,params, body)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, null); 
    const response = await axios.post(composedEndPoint, body, axisoConfig);
    const data = await response.data;
    return data;          
}

const put =async(endpoint ,params, body)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, null); 
    const response = await axios.put(composedEndPoint, body, axisoConfig);
    const reponseStatus = response.status;
    return reponseStatus;      
}

const remove =async(endpoint ,params)=>{
    const composedEndPoint = composeEndPoint(endpoint, params. null); 
    const response = await axios.delete(composedEndPoint, axisoConfig);
    const reponseStatus = response.status;
    return reponseStatus;     
}

export const client ={get, post, put, remove};


