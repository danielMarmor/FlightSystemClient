import { fields } from "../constants/enums";

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

