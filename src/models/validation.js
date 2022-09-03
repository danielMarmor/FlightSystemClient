import { fields } from "../constants/enums";


export const LoginValidations = (field) => {
    switch (field) {
        case fields.username:
            return {
                required: true,
                maxLength: 40,
                type: 'text'
            }
        case fields.password:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
    }
}

export const CustomerValidations = (field) => {
    switch (field) {
        case fields.username:
            return {
                required: true,
                maxLength: 40,
                type: 'text'
            }
        case fields.password:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
        case fields.confirmPassword:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
        case fields.email:
            return {
                required: true,
                maxLength: 100,
                type: 'text'
            }
        case fields.first_name:
            return {
                required: true,
                maxLength: 50,
                type: 'text'
            }
        case fields.last_name:
            return {
                required: true,
                maxLength: 50,
                type: 'text'
            }
        case fields.address:
            return {
                required: true,
                maxLength: 200,
                type: 'text'
            }
        case fields.phone_number:
            return {
                required: true,
                maxLength: 50,
                type: 'text'
            }
        case fields.credit_card_number:
            return {
                required: true,
                maxLength: 24,
                type: 'text'
            }

    }
}
export const AirlineValidations = (field) => {
    switch (field) {
        case fields.username:
            return {
                required: true,
                maxLength: 40,
                type: 'text'
            }
        case fields.password:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
        case fields.confirmPassword:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
        case fields.email:
            return {
                required: true,
                maxLength: 100,
                type: 'text'
            }
        case fields.name:
            return {
                required: true,
                maxLength: 100,
                type: 'text'
            }
        case fields.iata:
            return {
                required: true,
                maxLength: 3,
                type: 'text'
            }
    }
}

export const PaymentValidations = (field) => {
    switch (field) {
        case fields.credit_card_number:
            return {
                required: true,
                maxLength: 24,
                type: 'password'
            }
        case fields.expirationDate:
            return {
                required: true,
                maxLength: 5,
                type: 'text'
            }

        case fields.securityCode:
            return {
                required: true,
                maxLength: 3,
                type: 'password'
            }

    }
}
export const AdminValidations = (field) => {
    switch (field) {
        case fields.username:
            return {
                required: true,
                maxLength: 40,
                type: 'text'
            }
        case fields.password:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
        case fields.confirmPassword:
            return {
                required: true,
                maxLength: 20,
                type: 'password'
            }
        case fields.email:
            return {
                required: true,
                maxLength: 100,
                type: 'text'
            }
        case fields.first_name:
            return {
                required: true,
                maxLength: 50,
                type: 'text'
            }
        case fields.last_name:
            return {
                required: true,
                maxLength: 50,
                type: 'text'
            }

    }
}

export const FlightValidations = (field) => {
    switch (field) {
        case fields.origin_country_name:
            return {
                required: true,
                maxLength: 10,
                type: 'text'
            }
        case fields.dest_country_name:
            return {
                required: true,
                maxLength: 10,
                type: 'text'
            }
        case fields.departure_time:
            return {
                required: true,
                maxLength: 10,
                type: 'text'
            }
        case fields.landing_time:
            return {
                required: true,
                maxLength: 10,
                type: 'text'
            }
        case fields.price:
            return {
                required: true,
                maxLength: 10,
                type: 'number'
            }
        case fields.num_seats:
            return {
                required: true,
                maxLength: 10,
                type: 'number'
            }

        case fields.distance:
            return {
                required: true,
                maxLength: 10,
                type: 'number'
            }

    }
}
export const FormBlock = (key, values) => {
    switch (key) {
        case fields.username:
            return BlockUserName(values);
        case fields.password:
        case fields.confirmPassword:
            return BlockPassword(values);
        case fields.email:
            return BlockEmail(values);
        case fields.phone:
            return BlockPhone(values);
        case fields.creditCard:
            return BlockCreditCard(values);
        default: return false;
    }
}

const BlockUserName = ({ value }) => {
    const blocked = value.length > 10;
    return blocked;
}

const BlockPassword = ({ value }) => {
    const blocked = value.length > 10;
    return blocked;
}

const BlockEmail = ({ value }) => {
    const blocked = value.length > 10;
    return blocked;
}


const BlockPhone = ({ value }) => {
    const blocked = value.length > 10;
    return blocked;
}

const BlockCreditCard = ({ value }) => {
    const blocked = value.length > 10;
    return blocked;
}

