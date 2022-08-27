import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectFlightsSearch, fetchFligths } from "../../ticketsSlice";
import { VariableSizeList as List } from "react-window";
import { FormFrameBox } from "../../../../app/components/FormStyles";
import { catchAppError } from "../../../../app/appSlice";
import { FlightSearchErrorTemplate } from "../../../../constants/enums";
import FlightResultDay from '../flightResultDay/FlightResultDay'

const FlightSearchResults = () => {
    const flightResults = useSelector(SelectFlightsSearch);
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

    const dispatch = useDispatch();

    useEffect(() => {
        const loadFlights = async () => {
            try {
                await dispatch(fetchFligths({})).unwrap();
            }
            catch (err) {
                dispatch(catchAppError(FlightSearchErrorTemplate(err)))
            }
        };
        loadFlights();
    }, []);
    return (
        <ListComponent />       
    )
}

export default FlightSearchResults
