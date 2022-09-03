import React from 'react'
import axios from 'axios';
import { composeEndPoint } from './composeReuqests';

const axisoConfig ={
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'      
    },
    withCredentials: true,
    timeout : 800000    
}

const get =async(endpoint ,params, queryParams)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, queryParams); 
    const response = await axios.get(composedEndPoint, axisoConfig)
    .catch(async(error)=>{
        const errorData = await handleError(error);
        return errorData;
    });
    const data = await response.data;
    return data;    
}

const post =async(endpoint ,params, body)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, null); 
    const response = await axios.post(composedEndPoint, body, axisoConfig)
    .catch(async(error)=>{
        const errorData = await handleError(error);
        return errorData;
    });
    const data = await response.data;
    return data;          
}

const put =async(endpoint ,params, body)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, null); 
    const response = await axios.put(composedEndPoint, body, axisoConfig)
    .catch(async(error)=>{
        const errorData = await handleError(error);
        return errorData;
    });
    const data = await response.data;
    return data;      
}

const remove =async(endpoint ,params)=>{
    const composedEndPoint = composeEndPoint(endpoint, params, null); 
    const response = await axios.delete(composedEndPoint, axisoConfig)
    .catch(async(error)=>{
        const errorData = await handleError(error);
        return errorData;
    });
    const reponseStatus = response.status;
    return reponseStatus;     
}

const handleError=async(error)=>{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;
        const data = await error.response.data;  
        if (!data){
            throw Error('Service unavailiable');
        }
        throw Error(data);
        return data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        throw Error('Service unavailiable');
      } else {
        console.log(error.config);
        // Something happened in setting up the request that triggered an Error
        throw Error('Invalid Request!');        
      }
      
}

export const client ={get, post, put, remove};


