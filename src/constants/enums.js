
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
    tickets: 'tickets',
    flights: 'flights',
    flightsSearch: 'flights-search',
    users: 'users',
    administrators: 'administrators',
    customer_bussines: 'customer_bussines',
    airline_bussines: 'airline_bussines'
}

export const appActions = {
    fetchCountries: 'tickets/fetchCountries'
}

export const ticketsActions = {
    fetchTickets: 'tickets/fetchTickets',
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
    addCustomer: 'profile/addCustomer',
    editCustomer: 'profile/editCustomer',
    addAirline: 'profile/addAirline',
    editAirline: 'profile/editAirline'
}

export const manageActions = {
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
    phone_number: 'phone_number',
    credit_card_number: 'credit_card_number'
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







