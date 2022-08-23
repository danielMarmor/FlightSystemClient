import { CapacityModels } from "../../../constants/commonLists";
import { getDistance } from "../../../api/geolocation";
import moment from 'moment';

export const speed = 800;
export const costPerKm = 250;

export class FlightModel {
    constructor(){
    this.countries = null;
    this.updated = null;
    }

    setParams = (countries) => {
        this.countries = countries
    }
    copyData= (data) => {
        this.updated = {
            ...data
        }
    }
    retval= ()=> { return this.updated }

    originCountryUpdated= async (originCountryName) => {
        const country = this.countries.find(cou => cou.name == originCountryName);
        if (!country) {
            this.updated.origin_country_id = null;
            this.updated.origin_country_name = null;
            this.updated.origin_country_city = null;
        }
        else {
            this.updated.origin_country_id = country.id;
            this.updated.origin_country_name = country.name;
            this.updated.origin_country_city = country.city;
        }
        if (this.updated.origin_country_name && this.updated.destination_country_name) {
            const originLocation = `${this.updated.origin_country_city}, ${this.updated.origin_country_name}`;
            const destLocation = `${this.updated.destination_country_city}, ${this.updated.destination_country_name}`;

            const calcedDistance = await getDistance(originLocation, destLocation);
            this.distanceUpdated(calcedDistance);
        }
    }
    destCountryUpdated = async (destCountryName) => {
        const country = this.countries.find(cou => cou.name == destCountryName);
        if (!country) {
            this.updated.destination_country_id = null;
            this.updated.destination_country_name = null;
            this.updated.destination_country_city = null;
        }
        else {
            this.updated.destination_country_id = country.id;
            this.updated.destination_country_name = country.name;
            this.updated.destination_country_city = country.city;
        }
        if (this.updated.origin_country_name && this.updated.destination_country_name) {
            const originLocation = `${this.updated.origin_country_city}, ${this.updated.origin_country_name}`;
            const destLocation = `${this.updated.destination_country_city}, ${this.updated.destination_country_name}`;

            const calcedDistance = await getDistance(originLocation, destLocation);
            this.distanceUpdated(calcedDistance);
        }
    }
    departureTimeUpdated = (departureTime) => {
        this.updated.departure_time = departureTime;
        if (this.updated.departure_time) {
            if (this.updated.distance != null) {
                this.updated.landing_time = this.getLandingTime(this.updated.departure_time, speed, this.updated.distance);
            }
            else {
                this.updated.landing_time = null;
            }
        }
        else {
            this.updated.landing_time = null;
        }
    }
    landingTimeUpdated = (landingTime) => {
        this.updated.landing_time = landingTime;
    }
    distanceUpdated = (distance) => {
        //CALCULATE LANDING TIME
        this.updated.distance = distance;
        if (this.updated.distance != null) {
            if (this.updated.departure_time) {
                this.updated.landing_time = this.getLandingTime(this.updated.departure_time, speed, this.updated.distance);
            }
            else {
                this.updated.landing_time = null;
            }
            this.updated.cost = this.getCost(this.updated.distance, costPerKm);
            if (this.updated.revenues != null) {
                this.updated.profit = this.getProfit(this.updated.revenues, this.updated.cost);
                this.updated.margin = this.getMargin(this.updated.cost, this.updated.profit);
            }
            else {
                this.updated.profit = null;
                this.updated.margin = null;
            }
        }
        else {
            this.updated.landing_time = null;
            this.updated.cost = null;
            this.updated.profit = null;
            this.updated.margin = null;
        }
    }
    capacityModelUpdated = (capcityModelId) => {
        const capModel = CapacityModels.find(cap => cap.id === capcityModelId);
        this.updated.capacityModelId = capcityModelId;
        this.updated.num_seats = capModel.numSeats;
        this.updated.capacityModelUrl = capModel.url;
    
        if (this.updated.price != null) {
            this.updated.revenues = this.getRevenues(this.updated.num_seats, this.updated.price);
            if (this.updated.cost != null) {
                this.updated.profit = this.getProfit(this.updated.revenues, this.updated.cost);
                this.updated.margin = this.getMargin(this.updated.cost, this.updated.profit);
            }
            else {
                this.updated.profit = null;
                this.updated.margin = null;
            }
        }
        else {
            this.updated.revenues = null;
            this.updated.profit = null;
            this.updated.margin = null;
        }
    }
    priceUpdated = (price) => {
        this.updated.price = price;
        if (this.updated.num_seats != null) {
            this.updated.revenues = this.getRevenues(this.updated.num_seats, this.updated.price);
            if (this.updated.cost != null) {
                this.updated.profit = this.getProfit(this.updated.revenues, this.updated.cost);
                this.updated.margin = this.getMargin(this.updated.cost, this.updated.profit);
            }
            else {
                this.updated.profit = null;
                this.updated.margin = null;
            }
        }
        else {
            this.updated.revenues = null;
            this.updated.profit = null;
            this.updated.margin = null;
        }
    }
    getLandingTime = (departure, speen, distance) => {
        const flightDuration = distance / speen;
        const landingTime = this.addHours(departure, flightDuration);
        return landingTime;
    }
    getCost = (kmDistance, pricePerKm) => {
        const cost = kmDistance * pricePerKm;
        return cost;
    }
    getRevenues = (seats, price) => {
        const revenues = seats * price;
        return revenues;
    }
    getProfit = (revenues, costs) => {
        const profit = revenues - costs;
        return profit;
    }
    getMargin = (cost, profit) => {
        const margin = cost == 0 ? null : Math.round((profit / cost) * 100);
        return margin;
    }
    addHours =(date, hours) =>{
        var newDateObj= moment(date).add(hours, 'hours');
        return newDateObj;
    
    }
    static getGridDatesRange =(departure_time, landing_time)=>{
        let datesRange;
        const departureTime = moment(departure_time, 'DD/MM/YYYY HH:MM:SS');
        const landingTime =moment(landing_time, 'DD/MM/YYYY HH:MM:SS');
    
        const depDay = moment(departureTime).format('DD');
        const landDay = moment(landingTime).format('DD');
    
        if (depDay != landDay){
            const month =  moment(departureTime).format('MM');
            const year =  moment(departureTime).format('YY');
            datesRange = `${depDay}-${landDay}/${month}/${year}`;
        }
        else{
            datesRange = moment(departureTime).format('DD/MM/YY')
        }
        return datesRange;
    }

    static getFlightsToGrid=(flights)=>{
        const flightsToGrid = flights.map(fli =>{
            const soldTickets= fli.num_seats - fli.remaining_tickets;
            const occupance = fli.num_seats === 0 ? 0 : (parseFloat(soldTickets/ fli.num_seats) * 100).toFixed(2);
            const revenue = soldTickets * fli.price; 
            const cost = fli.distance * costPerKm;
            const profit =  revenue - cost;         
            const result = {
                id :fli.flight_id,
                datesRange: this.getGridDatesRange(fli.departure_time, fli.landing_time),
                origin_country_name :fli.origin_country_name,
                dest_country_name : fli.dest_country_name,
                soldTickets :soldTickets,
                occupance :occupance,
                revenue : revenue,
                cost: cost,
                profit: profit
            };
            return result;
        });
        return flightsToGrid;
    }

}