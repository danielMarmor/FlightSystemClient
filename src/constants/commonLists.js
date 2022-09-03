import Airbus220 from '../assets/Airbus220.jpg';
import Airbus380 from '../assets/Airbus380.jpg';
import Boeing747 from '../assets/Boing747.jpg';
import Dreamlines787 from '../assets/Dreamlines787.jpg';

export const CapacityModels=[
    {   id : 1,
        name : '120 Seats',
        numSeats : 120,
        airplane :'Airbus220-I',
        url :`url(${Airbus220})`,
        rowGroups : [12],
        columnGroups : [3, 4, 3],
        width : 350
    },
    {   id : 2,
        name : '180 Seats',
        numSeats : 180,
        airplane :'Boeing-747',
        url :`url(${Boeing747})`,
        rowGroups : [8, 10],
        columnGroups : [3, 4, 3],
        width : 300
    },
    {   id : 3,
        name : '200 Seats',
        numSeats : 200,
        airplane :'Dreamliner-787',
        url :`url(${Dreamlines787})`,
        rowGroups : [10, 10],
        columnGroups : [3, 4, 3],
        width : 300
    },
    {   id : 4,
        name : '240 Seats',
        numSeats : 240,
        airplane :'Dreamliner-787',
        url :`url(${Dreamlines787})`,
        rowGroups : [8, 8, 8],
        columnGroups : [3, 4, 3],
        width : 300
    },
    {   id : 5,
        name : '300 Seats',
        numSeats : 300,
        airplane :'Airbus380-A',
        url :`url(${Airbus380})`,
        rowGroups : [8, 17],
        columnGroups : [4, 4, 4],
        width : 300
    }
]