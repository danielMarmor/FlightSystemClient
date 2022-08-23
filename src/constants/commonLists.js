import Airbus220 from '../assets/Airbus220.jpg';
import Airbus380 from '../assets/Airbus380.jpg';
import Boeing747 from '../assets/Boing747.jpg';
import Dreamlines787 from '../assets/Dreamlines787.jpg';

export const CapacityModels=[
    {   id : 1,
        name : '120 Seats',
        numSeats : 120,
        url :`url(${Airbus220})`
    },
    {   id : 2,
        name : '180 Seats',
        numSeats : 180,
        url :`url(${Boeing747})`
    },
    {   id : 3,
        name : '240 Seats',
        numSeats : 240,
        url :`url(${Dreamlines787})`
    },
    {   id : 4,
        name : '300 Seats',
        numSeats : 300,
        url :`url(${Airbus380})`
    }
]