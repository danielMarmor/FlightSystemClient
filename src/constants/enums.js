
export const status = {
    idle: 0,
    pending: 1,
    success: 2,
    error: 3
}

export const result = {
    idle: 0,
    success: 1,
    error: 2
}

export const methods = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE'
}

export const entries = {
    anonym: 'anonym',
    customer: 'cust',
    airlien: 'airline',
    admin: 'admin'
}

export const userType = {
    anonym: 0,
    customer: 1,
    airline: 2,
    admin: 3
}

export const resources = {
    login: 'login',
    countries: 'countries',
    airlines: 'airlines',
    customers: 'customers',
    administrators: 'administrators',
    adminSearch: 'admin-search',
    tickets: 'tickets',
    flights: 'flights',
    flightsSearch: 'flights-search',
    users: 'users', 
    customer_bussines: 'customer_bussines',
    airline_bussines: 'airline_bussines'
}

export const appActions = {
    fetchCountries: 'tickets/fetchCountries'
}

export const ticketsActions = {
    fetchTickets: 'tickets/fetchTickets',
    fetchFlightById: 'tickets/fetchFlightById',
    fetchFlights: 'tickets/fetchFligths',
    addTicket: 'tickets/addTicket',
    removeTicket: 'tickets/removeTicket'
}

export const flightsActions = {
    fetchAirline: 'flights/fetchAirline',
    fetchFlights: 'flights/fetchFlights',
    addFlight: 'flights/addFlight',
    editFlight: 'flights/editFlight',
    removeFlight: 'flights/removeFlight'
}

export const profileActions = {
    login: 'profile/login',
    fetchCutomerById: 'profile/fetchCutomerById',
    addCustomer: 'profile/addCustomer',
    editCustomer: 'profile/editCustomer',
    addAirline: 'profile/addAirline',
    editAirline: 'profile/editAirline',
    editAdministrator :  'profile/editAdministrator'
}

export const manageActions = {
    fetchAdminById :  'manage/fetchAdminById',
    fetchCustomersBussiness: 'manage/fetchCustomersBussiness',
    fetchAirlineBussiness: 'manage/fetchAirlineBussiness',
    fetchStatistics: 'manage/fetchStatistics',
    addCustomer: 'manage/addCustomer',
    editCustomer: 'manage/editCustomer',
    removeCustomer: 'manage/removeCustomer',
    addAirline: 'manage/addAirline',
    editAirline: 'manage/editAirline',
    removeAirline: 'manage/removeAirline',
    addAdministrator: 'manage/addAdministrator',
    editAdministrator: 'manage/editAdministrator',
    removeAdministrator: 'manage/removeAdministrator'

}

export const fields = {
    username: 'username',
    password: 'password',
    confirmPassword: 'confirmPassword',
    email: 'email',
    first_name : 'first_name',
    last_name : 'last_name',
    address : 'address',
    phone_number: 'phone_number',
    credit_card_number: 'credit_card_number',
    name :'name',
    iata :'iata',
    distance :'distance',
    num_seats :'num_seats',
    price : 'price',
    expirationDate : 'expirationDate',
    securityCode : 'securityCode',
    origin_country_name : 'origin_country_name',
    dest_country_name : 'dest_country_name',
    departure_time : 'departure_time',
    landing_time : 'landing_time'
}

export const messages={
    succefulyCommited : 'Succecfuly Committed'
}

export const sortByField = {
    purchases: 1,
    customerName: 2
}

export const directions = {
    ascending: 1,
    descending: 2
}
export const cusotmerFlightStatus={
    availiable : 1,
    soldout : 2,
    booked : 3,
    departured : 4,
    userTypeBlocked : 5
}

export const seatType={
    passenger :1,
    crew : 2,
    space : 3,
    axe : 4
}

export const seatStatus={
    notAvailiable : 0,
    availiable : 1,
    taken : 2  
}

export const loginErrorTemplate = (message) => {
    return {
        feature: 'Login',
        message: message,
        details: 'Please check it out and try again..'
    }

}

export const FlightSearchErrorTemplate = (message) => {
    return {
        feature: 'Flight Search',
        message: message,
        details: 'Wait a bit and try again..'
    }

}

export const ProfileErrorTemplate = (message) => {
    return {
        feature: 'Profile',
        message: message,
        details: 'Wait a bit and try again..'
    }

}

export const OrderErrorTemplate = (message) => {
    return {
        feature: 'Order',
        message: message,
        details: 'Wait a bit and try again..'
    }

}

export const OrderSuccessTemplate = (message, url) => {
    return {
        feature: 'Order',
        message: message,
        details: 'Purchase Completed',
        url: url
    }

}

export const ProfileSuccessTemplate = (message, url) => {
    return {
        feature: 'Profile',
        message: message,
        details: 'Profile updated',
        url: url
    }

}

export const FlightErrorTemplate = (message) => {
    return {
        feature: 'Flight',
        message: message,
        details: 'Wait a bit and try again..'
    }

}

export const FlightSuccessTemplate = (message,url) => {
    return {
        feature: 'Flight',
        message: message,
        details: 'Flights list updated',
        url: url
    }

}

export const TicketsErrorTemplate = (message) => {
    return {
        feature: 'Tickets',
        message: message,
        details: 'Wait a bit and try again..'
    }

}

export const TicketsSuccesTemplate = (message) => {
    return {
        feature: 'Tickets',
        message: message,
        details: 'Purchases list updated'
    }

}







