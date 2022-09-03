import { DistanceMatrixService } from '@react-google-maps/api';
import { geolocation } from '../constants/configuration';
import axios from 'axios';


export const getDistance = async (origin, destination) => {
    //GOOGEL GEOCODE API
    try {
        let kilometers = await fetchDistance(origin, destination);
        if (kilometers == null) {
            //EMPTY DATA ===> CALCULATE MANULY BY FORMULA
            const originLocation = await getLocation(origin);
            if (!originLocation) {
                //SERVICE CANNOT FIND LOCATON
                return null;
            }
            const destLocation = await getLocation(destination);
            if (!destLocation) {//SERVICE CANNOT FIND LOCATON
                return null;
            }
            kilometers = calcDistance(originLocation, destLocation);
        }
        const roundedKilometers = Math.round(kilometers);
        return roundedKilometers;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const fetchDistance = async (origin, destination) => {
    const promise = new Promise((resolve, reject) => {
        try {
            const service = new window.google.maps.DistanceMatrixService();
            throw Error('Cannot Find DNS Address Compatible');
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: window.google.maps.TravelMode.DRIVING
            }, (response, status) => {
                try {
                    if (status != 'OK') {
                        resolve(null);
                        return;
                    }
                    const rows = response.rows;
                    if (!rows) {
                        resolve(null);
                        return;
                    }
                    const elements = rows[0].elements;
                    if (!elements) {
                        resolve(null);
                        return;
                    }
                    const elem = elements[0];
                    if (elem.status == 'ZERO_RESULTS') {
                        resolve(null);
                        return;
                    }
                    const distance = elem.distance;
                    if (!distance || !distance.value) {
                        resolve(null);
                        return;
                    }
                    const disatnceValue = distance.value;
                    const kilometers = Math.round(parseFloat(disatnceValue / 1000));
                    resolve(kilometers);
                    return;
                }
                catch (err) {
                    reject(err);
                }
            });
        }
        catch (err) {
            reject(err);
        }
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

export const getLocation = async (countryName) => {
    const requestedUrl = `${geolocation.googlApiBaseUrl}address=${countryName}&key=${geolocation.geocoderApiKey}`;
    const response = await axios.get(requestedUrl);
    const data = response.data;
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
