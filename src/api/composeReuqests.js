import React from 'react'

export const composeEndPoint =(endpoint, params, queryParams)=>{
    if (!params && !queryParams){
        return endpoint;
    }
    let composedEndPoint = endpoint;
    if (params){
        const arrParams= Object.keys(params).map(key =>{
            const item = params[key];
            return item;
        });
        const paramsString =arrParams.join('/');
        composedEndPoint = `${composedEndPoint}/${paramsString}`; 
    }
    if (queryParams){
        const arrQuery = Object.keys(queryParams).map(key =>{
            const item = `${key}=${queryParams[key]}`;
            return item;
        });
        const queryString = arrQuery.join('&');
        composedEndPoint = `${composedEndPoint}?${queryString}`;
    }
    return composedEndPoint;
}

