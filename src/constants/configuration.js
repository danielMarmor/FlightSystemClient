export const host = {
    protocol : 'http',
    host : 'localhost',
    port : '8080'
}

export const authentication ={
    secretKey : 'secret-key'
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
        reqHeight : '50'
    }
}




export const numbers ={
    empty : '',
    noSelectedValue : -1,
    noSelectedValueStr : '-1'
}

