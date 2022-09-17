import { CapacityModels } from "../../../constants/commonLists";
import { getDistance, getLocation } from "../../../api/geolocation";
import { CompareByFligthId } from "../../../utilities/compare";
import moment from 'moment';

export const speed = 800;
export const costPerKm = 16.75;

export class FlightModel {
    constructor() {
        this.countries = null;
        this.updated = null;
    }

    static NO_DISTANCE = -999;

    setParams = (countries) => {
        this.countries = countries
    }
    copyData = (data) => {
        this.updated = {
            ...data
        }
    }
    retval = () => { return this.updated }
    distance = () => { return this.updated.distance }

    originCountryUpdated = async (originCountryName) => {
        if (!originCountryName) {
            return;
        }
        const country = this.countries.find(cou => cou.name == originCountryName);
        if (!country) {
            this.updated.origin_country_id = null;
            this.updated.origin_country_name = null;
            this.updated.origin_country_city = null;
            //REMOVE COUNTRY MARKER
            this.removeMarker('origin');
            this.focusMarker();
        }
        else {
            this.updated.origin_country_id = country.id;
            this.updated.origin_country_name = country.name;
            this.updated.origin_country_city = country.city;

            const newPosition = `${this.updated.origin_country_city}, ${this.updated.origin_country_name}`;
            //FIRST REMOVE OLD POSITION
            this.removeMarker('origin');
            //NOW ADD NEW MARKER
            await this.addMarker('origin', newPosition);
            this.focusMarker();
        }
        if (this.updated.origin_country_name && this.updated.destination_country_name) {
            const originLocation = `${this.updated.origin_country_city}, ${this.updated.origin_country_name}`;
            const destLocation = `${this.updated.destination_country_city}, ${this.updated.destination_country_name}`;

            const calcedDistance = await getDistance(originLocation, destLocation);
            this.distanceUpdated(calcedDistance);
        }
    }
    destCountryUpdated = async (destCountryName) => {
        if (!destCountryName) {
            return;
        }
        const country = this.countries.find(cou => cou.name == destCountryName);
        if (!country) {
            this.updated.destination_country_id = null;
            this.updated.destination_country_name = null;
            this.updated.destination_country_city = null;
            //FIRST REMOVE OLD POSITION
            this.removeMarker('dest');
            this.focusMarker();
        }
        else {
            this.updated.destination_country_id = country.id;
            this.updated.destination_country_name = country.name;
            this.updated.destination_country_city = country.city;

            const newPosition = `${this.updated.destination_country_city}, ${this.updated.destination_country_name}`;
            //FIRST REMOVE OLD POSITION
            this.removeMarker('dest');
            //NOW ADD NEW MARKER
            await this.addMarker('dest', newPosition);
            this.focusMarker();
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
                this.updated.landing_time = FlightModel.getLandingTime(this.updated.departure_time, speed, this.updated.distance);
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
                this.updated.landing_time = FlightModel.getLandingTime(this.updated.departure_time, speed, this.updated.distance);
            }
            else {
                this.updated.landing_time = null;
            }
            this.updated.cost = FlightModel.getCost(this.updated.distance, costPerKm);
            if (this.updated.revenues != null) {
                this.updated.profit = FlightModel.getProfit(this.updated.revenues, this.updated.cost);
                this.updated.margin = FlightModel.getMargin(this.updated.cost, this.updated.profit);
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
        this.updated.remaining_tickets = this.updated.num_seats;
        this.updated.capacityModelUrl = capModel.url;

        if (this.updated.cost != null) {
            this.updated.price = FlightModel.getBreakEvenPrice(this.updated.cost, this.updated.num_seats);
            this.priceUpdated(this.updated.price);
            return;
        }
        if (this.updated.price || this.updated.price == -0) {
            this.updated.revenues = FlightModel.getRevenues(this.updated.num_seats, this.updated.price);
            if (this.updated.cost != null) {
                this.updated.profit = FlightModel.getProfit(this.updated.revenues, this.updated.cost);
                this.updated.margin = FlightModel.getMargin(this.updated.cost, this.updated.profit);
            }
            else {
                this.updated.profit = null;
                this.updated.margin = null;
            }
        }
        else {
            if (this.updated.cost != null) {
                this.updated.price = FlightModel.getBreakEvenPrice(this.updated.cost, this.updated.num_seats);
                this.priceUpdated(this.updated.price);
            }
            else {
                this.updated.price = null;
                this.updated.revenues = null;
                this.updated.profit = null;
                this.updated.margin = null;
            }
        }

    }
    priceUpdated = (price) => {
        this.updated.price = price;
        if (this.updated.num_seats != null) {
            this.updated.revenues = FlightModel.getRevenues(this.updated.num_seats, this.updated.price);
            if (this.updated.cost != null) {
                this.updated.profit = FlightModel.getProfit(this.updated.revenues, this.updated.cost);
                this.updated.margin = FlightModel.getMargin(this.updated.cost, this.updated.profit);
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
    addMarker = async (markerType, requestedPosition) => {
        const existMarkers = this.updated.markers && this.updated.markers.length > 0;
        if (!existMarkers) {
            this.updated.markers = [];
        }
        const markerLocation = await getLocation(requestedPosition)
        if (!markerLocation) {
            return;
        }
        const newMarker = {
            markerType: markerType,
            markerName: requestedPosition,
            markerLocation: markerLocation
        }
        this.updated.markers.push(newMarker);
        //ADD 2 MARKKERS 
    }
    removeMarker = (markerType) => {
        if (this.updated.markers) {
            this.updated.markers = this.updated.markers.filter(mark => mark.markerType !== markerType);
        }
    }

    focusMarker = () => {
        if (this.updated.markers) {
            const lastMarkerIndex = this.updated.markers.length - 1;
            this.updated.markers = this.updated.markers.map((marker, index) => {
                return index === lastMarkerIndex ? { ...marker, focus: true } : { ...marker, focus: false };
            });
        }

    }
    static getLandingTime = (departure, speen, distance) => {
        const flightDuration = distance / speen;
        const landingTime = this.addHours(departure, flightDuration);
        return landingTime;
    }
    static getCost = (kmDistance, pricePerKm) => {
        const cost = kmDistance * pricePerKm;
        return cost;
    }
    static getBreakEvenPrice = (cost, num_seats) => {
        const breakEvenPrice = num_seats === 0 ? 0 : parseFloat(cost / num_seats);
        return breakEvenPrice;
    }
    static getRevenues = (seats, price) => {
        const revenues = seats * price;
        return revenues;
    }
    static getProfit = (revenues, costs) => {
        const profit = revenues - costs;
        return profit;
    }
    static getMargin = (cost, profit) => {
        const margin = cost == 0 ? null : (profit / cost) * 100;
        return margin;
    }
    static addHours = (date, hours) => {
        var newDateObj = moment(date).add(hours, 'hours');
        return newDateObj;

    }
    static getFlight = (entity) => {
        const capacityMode = CapacityModels.find(cap => cap.numSeats == entity.num_seats);
        const mapToFlight = {
            flightNumber: `${entity.airline_iata}-${entity.flight_id}`,
            airline_company_id: entity.airline_company_id,
            origin_country_id: entity.origin_country_id,
            origin_country_name: entity.origin_country_name,
            departure_time: moment(entity.departure_time, 'DD/MM/YYYY HH:mm:SS'),
            destination_country_id: entity.destination_country_id,
            destination_country_name: entity.dest_country_name,
            landing_time: moment(entity.landing_time, 'DD/MM/YYYY HH:mm:SS'),
            capacityModelId: capacityMode.id,
            num_seats: entity.num_seats,
            remaining_tickets: entity.remaining_tickets,
            disable_changes: entity.remaining_tickets < entity.num_seats,
            distance: entity.distance,
            price: entity.price
        }
        //DERIVATIVES
        mapToFlight.cost = this.getCost(entity.distance, costPerKm);
        mapToFlight.revenues = this.getRevenues(entity.num_seats, entity.price);
        mapToFlight.profit = this.getProfit(mapToFlight.revenues, mapToFlight.cost);
        mapToFlight.margin = this.getMargin(mapToFlight.cost, mapToFlight.profit);
        return mapToFlight;
    }

    addMarkers = async (originCountryName, destCountryName) => {
        if (!originCountryName || !destCountryName) {
            return;
        }
        const existMarkers = this.updated.markers && this.updated.markers.length > 0;
        if (!existMarkers) {
            this.updated.markers = [];
        }
        const originCountry = this.countries.find(cou => cou.name == originCountryName);
        const originPosition = `${originCountry.city}, ${originCountry.name}`;

        const destCountry = this.countries.find(cou => cou.name == destCountryName);
        const destPosition = `${destCountry.city}, ${destCountry.name}`;

        const originLocation = await getLocation(originPosition);
        if (originLocation) {
            const originMarker = {
                markerType: 'origin',
                markerName: originPosition,
                markerLocation: originLocation
            }
            this.updated.markers.push(originMarker);
        }
        const destLocation = await getLocation(destPosition)
        if (destLocation) {
            const destMarker = {
                markerType: 'dest',
                markerName: destPosition,
                markerLocation: destLocation
            }
            this.updated.markers.push(destMarker);
        }

        this.focusMarker();

    }
    static getGridDatesRange = (departure_time, landing_time) => {
        let datesRange;
        const departureTime = moment(departure_time, 'DD/MM/YYYY HH:mm:SS');
        const landingTime = moment(landing_time, 'DD/MM/YYYY HH:mm:SS');

        const depDay = moment(departureTime).format('DD');
        const landDay = moment(landingTime).format('DD');

        if (depDay != landDay) {
            const month = moment(departureTime).format('MM');
            const year = moment(departureTime).format('YY');
            datesRange = `${depDay}-${landDay}/${month}/${year}`;
        }
        else {
            datesRange = moment(departureTime).format('DD/MM/YY')
        }
        return datesRange;
    }

    static getFlightsToGrid = (flights) => {
        const flightsToGrid = flights.map(fli => {
            const soldTickets = fli.num_seats - fli.remaining_tickets;
            const occupance = fli.num_seats === 0 ? 0 : (parseFloat(soldTickets / fli.num_seats) * 100).toFixed(2);
            const revenue = fli.revenues
            const cost = fli.distance * costPerKm;
            const profit = revenue - cost;
            const result = {
                id: fli.flight_id,
                flightNumber: `${fli.airline_iata}-${fli.flight_id}`,
                datesRange: this.getGridDatesRange(fli.departure_time, fli.landing_time),
                origin_country_name: fli.origin_country_name,
                dest_country_name: fli.dest_country_name,
                soldTickets: soldTickets,
                occupance: occupance,
                revenue: revenue,
                cost: cost,
                profit: profit
            };
            return result;
        });
        const orderedFlights = flightsToGrid.sort((a, b) => {
            return CompareByFligthId(a, b);
        });
        return orderedFlights;
    }
    static getDurationFormat = (departure, landing) => {
        const diferenceMinutes = moment
            .duration(moment(landing, 'YYYY/MM/DD HH:mm')
                .diff(moment(departure, 'YYYY/MM/DD HH:mm'))
            ).asMinutes();
        const duration = moment.duration(diferenceMinutes, 'minutes');
        const durationFormat = duration.format('HH:mm')
        return durationFormat;
    }

}