import React from "react";
import { VariableSizeList as List } from "react-window";
import FlightResultDay from '../flightResultDay/FlightResultDay'

const FlightSearchResults = ({flightResults}) => {
    const itemHeight = 60;
    const headerHeight = 24;
    const itemMarginTop = 5;
    const dayMarginBotton = 5;

    const Row = ({ index, style }) => (
        <div style={style}>
            <FlightResultDay
                dateGroup={flightResults[index]}
                itemHeight={`${itemHeight}px`}
                headerHeight={`${headerHeight}px`}
            />
        </div>
    );

    const rowHeights = flightResults.map(row => {
        const height = headerHeight + ((itemHeight + itemMarginTop) * row.dateFlights.length) + dayMarginBotton;
        return height;
    })

    const getItemSize = (index) => {
        const size = rowHeights[index];
        return size;
    }

    const ListComponent = () => (
        <List
            height={435}
            width={'100%'}
            itemCount={flightResults.length}
            itemSize={getItemSize}
        >
            {Row}
        </List>
    );  
    return (
        <ListComponent />       
    )
}

export default FlightSearchResults
