import React from "react";
import { VariableSizeList as List } from "react-window";
import FlightResultDay from '../flightResultDay/FlightResultDay'
import NoResults from "../../../../app/components/NoResults";
import { getWindowSize, appBarHeight, layoutVerticalMarginVh } from "../../../../app/components/layout/layout";
import { mainSurfaceTopPadding } from "../../../../App";
import { FormFrameBoxPadding } from "../../../../app/components/FormStyles";
import {
    bannerPannelHeight, bannerMarginBottom,
    searchPannelHeight, flightResultsMarginTop
} from "../flightsList/FlightsList";

const securitySize = 5;

const FlightSearchResults = ({ flightResults }) => {
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

    if (flightResults.length === 0) {
        return <NoResults message={'Oops.. No Results. Extend your Search!'} />
    }

    const rowHeights = flightResults.map(row => {
        const height = headerHeight + ((itemHeight + itemMarginTop) * row.dateFlights.length) + dayMarginBotton;
        return height;
    })

    const getItemSize = (index) => {
        const size = rowHeights[index];
        return size;
    }
    
    const getListHeight=()=>{
        const windowHeight = getWindowSize().innerHeight;
        const listCalclatedHeight = windowHeight
            - ((2 * layoutVerticalMarginVh) / 100 * windowHeight)
            - appBarHeight
            - mainSurfaceTopPadding
            - (2 * FormFrameBoxPadding)
            - bannerPannelHeight
            - bannerMarginBottom
            - searchPannelHeight
            - flightResultsMarginTop
            // - securitySize;
        
        const listHeight = Math.round(listCalclatedHeight);
        return listHeight
    }
    const ListComponent = () => (
        <List
            height={getListHeight()}
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
