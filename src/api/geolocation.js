import distance from 'google-distance-updated';
import { geolocation } from '../constants/configuration';
import axios from 'axios';

distance.apiKey = geolocation.geocoderApiKey;

export const getDistance = async(origin, destination) => {
    //GOOGEL GEOCODE API
    let kilometers = await fetchDistance(origin, destination);
    if (kilometers == null) {
        //EMPTY DATA ===> CALCULATE MANULY BY FORMULA
        const originLocation = await getLocation(origin);
        const destLocation =await getLocation(destination); 
        kilometers = calcDistance(originLocation, destLocation);
    }
    const roundedKilometers = Math.round(kilometers);
    return roundedKilometers;
}

const fetchDistance = async (origin, destination) => {
    const promise = new Promise((resolve, reject) => {
        distance.get({
            origin: origin,
            destination: destination
        },
            (err, data) => {
                if (err) {
                    resolve(null);
                    return;
                }
                //console.log(data);
                const distanceValue = data.distanceValue;
                const kilometers = Math.round(distanceValue / 1000);
                resolve(kilometers);
                return;
            }
        )
    });
    return promise;
}

const calcDistance = (origin, destination) => {
    const latitudeFrom = origin.lat;
    const longitudeFrom = origin.lng;
    const latitudeTo = destination.lat;
    const longitudeTo = destination.lng;

    const theta = longitudeTo - longitudeFrom;

    let distance = Math.sin(deg2rad(longitudeFrom)) * Math.sin(deg2rad(latitudeTo)) + Math.cos(deg2rad(latitudeFrom)) * Math.cos(deg2rad(latitudeTo)) * Math.cos(deg2rad(theta));
    distance = Math.acos(distance);
    distance = rad2deg(distance);

    let miles = distance * 60 * 1.1515;
    let miles2Kilommeters = miles / 0.62137;
    return miles2Kilommeters;
}

const getLocation =async(countryName)=>{
    const requestedUrl = `${geolocation.googlApiBaseUrl}address=${countryName}&key=${geolocation.geocoderApiKey}`;
    const response = await axios.get(requestedUrl);
    const data= response.data;
    const results = data.results;
    if (results.length == 0) {
        return null;
    }
    const location = results[0].geometry.location;
    return location;          
}

const deg2rad = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

const rad2deg = (radian) => {
    var pi = Math.PI;
    return radian * (180 / pi);
}
