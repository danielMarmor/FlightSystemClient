export const host = {
    protocol : 'http',
    host : 'localhost',
    port : '8080'
}

export const authentication ={
    secretKey : 'secret-key'
}

export const images ={
    personImageDeafultURL :'https://i.stack.imgur.com/l60Hf.png',
    iconImageDefaultURL : 'upload.wikimedia.org/wikipedia/commons/0/0a/Antu_application-default-icon.svg'
}

export const combineHost = `${host.protocol}://${host.host}:${host.port}`;
const geocoderApiKey = 'AIzaSyAqrDN8IHpf4sU11JSW7e0U7zGVnvgmQY8';
const googlApiBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const geolocation = {geocoderApiKey, googlApiBaseUrl};

export const endpoints={
    countriesFlags : 'https://countryflagsapi.com/png/',
    airlineCompanies:{
        logoPrefix : 'http://pics.avs.io/',
        logoPostfix : '@2x.png',
        reqWidth : '100',
        reqHeight : '50',
    },
    profileImages :{
        baseUrl :'https://api.unsplash.com/photos/random/?page=1&per_page=1',
        apiKey :'qPMdH6PKUt-gghpnUkAylcc2BLo3k3JDR75VUN3sxhc'
    }
}




export const numbers ={
    empty : '',
    noSelectedValue : -1,
    noSelectedValueStr : '-1'
}

