import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { CenterBox, FormButton } from '../../../../app/components/FormStyles'
import { seatType, seatStatus } from '../../../../constants/enums';
import { orderDetailsChanged } from '../../ticketsSlice';

//const seatsPaintColors = ['#4a6647', '#4a6647', '#4a6647'];
const notAvailiableColor = '#9e1e18';
const availiabeColor = '#4a6647';
const selectedColor = "#b5fc03";
const crewSeatsColor = '#f59842';
const spaceColor = '#e9f0eb'
const crewRowsNumber = 2;
const crewSpaceNumber = 1;
const paddingWidth = 4;
const paddingHeight = 3;

const Seat = (props) => {
  const { cell, currentSelected, width, height } = props;
  const dispatch = useDispatch();

  let seatColor;
  //CURRENT SELECTED
  if (currentSelected && currentSelected == cell.ticketId) {
    seatColor = selectedColor;
    cell.selected = true;
  }
  else {
    seatColor = cell.color;
    cell.selected = false;
  }

  const handleSelected = () => {
    if (cell.status == seatStatus.notAvailiable) {
      return;
    }
    const selected = cell.selected ? false : true
    const seatForDispatch = {
      name: 'seat',
      value: selected ? cell.ticketId : null
    }
    dispatch(orderDetailsChanged(seatForDispatch));
  }

  

  let renderSeat;
  switch (cell.type) {
    case seatType.crew:
      renderSeat = (<Box
        sx={{
          backgroundColor: seatColor,
          borderRadius: '2px',
          height: `calc(100% - ${paddingHeight * 2}px)`,
          width: `calc(100% - ${paddingWidth * 2}px)`,
          cursor: cell.status == seatStatus.availiable ? 'pointer' : 'default'
        }}>
      </Box>);
    case seatType.passenger:
      renderSeat = (<Box
        onClick={() => handleSelected()}
        sx={{
          backgroundColor: seatColor,
          borderRadius: '2px',
          height: `calc(100% - ${paddingHeight * 2}px)`,
          width: `calc(100% - ${paddingWidth * 2}px)`,
          cursor: cell.status == seatStatus.availiable ? 'pointer' : 'default'
        }}>
      </Box>);
      break;
    case seatType.space:
      renderSeat = (<Box
        //onClick={() => handleSelected()}
        sx={{
          backgroundColor: spaceColor,
          borderRadius: '0px',
          height: `calc(100% - ${paddingHeight * 2}px)`,
          width: `calc(100% - ${paddingWidth * 2}px)`,
          cursor: 'default'
        }}>
      </Box>);
      break;
    case seatType.axe:
      renderSeat = (<CenterBox
        //onClick={() => handleSelected()}
        sx={{
          backgroundColor: spaceColor,
          borderRadius: '0px',
          fontSize: '0.7rem',
          fontWeight :'bold',
          height: `calc(100% - ${paddingHeight * 2}px)`,
          width: `calc(100% - ${paddingWidth * 2}px)`,
          cursor: 'default'
        }}>
        {cell.text || ''}
      </CenterBox>);
      break;
  }

  return (
    <CenterBox
      width={`${width}px`}
      height={`${height}px`}
      sx={{
        padding: `${paddingHeight}px, ${paddingWidth}px, ${paddingHeight}px, ${paddingWidth}px`,
        boxSizing: 'border-box'
      }}
    >
      {renderSeat}

    </CenterBox>
  );
}
let totalColumns;

const SeatPicker = ({ model, dimentions, currentSelected, tickets }) => {
  const { rowGroups, columnGroups } = model;
  const { width, height } = dimentions;
  const [seatsLayout, setSeatsLayout] = useState([]);

  useEffect(() => {
    const newLayout = getSeatsLayout();
    setSeatsLayout(newLayout);
  }, [currentSelected]);

  const getSeatsLayout = () => {
    //ROWS
    const passengersRows = rowGroups.reduce((partialSum, grp) => partialSum + grp, 0);
    const crewRows = crewRowsNumber;
    const spaceColsIndicator = 1;
    const separator = 1;
    const totalRows = spaceColsIndicator + crewRows + separator + passengersRows;
    //COLUMNS
    const seatsColumns = columnGroups.reduce((partialSum, grp) => partialSum + grp, 0);
    const spaceColumns = columnGroups.length - 1;
    const indicatorsColumns = 2;
    totalColumns = seatsColumns + spaceColumns + indicatorsColumns;
    //CELL DIMENTIONS
    const cellWidth = Math.floor(width / totalColumns);
    const cellHeight = Math.floor(height / totalRows);

    const matrix = getMatrix();

    const seatsDescription = matrix.map(cell => {
      return (<Seat width={cellWidth}
        height={cellHeight}
        cell={cell}
        currentSelected={currentSelected}
      />);

    });
    return seatsDescription;
  }

  const spaceCell = (index) => {
    return {
      index: index,
      type: seatType.space,
      ticketId: null,
      status: seatStatus.notAvailiable,
      color: spaceColor,
      text: null
    }
  }
  const indicatorCell = (index, isRow, number) => {
    return {
      index: index,
      type: seatType.axe,
      ticketId: null,
      status: seatStatus.notAvailiable,
      color: spaceColor,
      text: isRow ? number : String.fromCharCode(65 + number - 1)
    }
  }
  const passengerCell = (index, row, col, tickets) => {
    const isAvailiable = !tickets[`${row}-${col}`];
    return {
      index: index,
      type: seatType.passenger,
      ticketId: `${row}-${col}`,
      status: isAvailiable ? seatStatus.availiable : seatStatus.notAvailiable,
      color: isAvailiable ? availiabeColor : notAvailiableColor,
      text: null
    }
  }
  const crewCell = (index) => {
    return {
      index: index,
      type: seatType.crew,
      ticketId: null,
      status: seatStatus.notAvailiable,
      color: crewSeatsColor,
      text: null
    }
  }

  const getMatrix = () => {
    const seats = [];
    let seatIndex = 0;
    //1. FIRST ROW - COLUMNS INDICATOR
    //LEFT CORNER
    const cornerLeftSeat = spaceCell(seatIndex);
    seats.push(cornerLeftSeat);
    seatIndex++;
    //INDICATORS
    let colIndex = 1;
    for (let m = 0; m < columnGroups.length; m++) {
      const innerCols = columnGroups[m];
      for (let n = 0; n < innerCols; n++) {
        const colIndicatorSeat = indicatorCell(seatIndex, false, colIndex);
        seats.push(colIndicatorSeat);
        seatIndex++;
        colIndex++
      }
      //BETWEEN EACH GROUP -EMPTY SET
      if (m < (columnGroups.length - 1)) {
        const emptySeat = spaceCell(seatIndex);
        seats.push(emptySeat);
        seatIndex++;
      }
    }
    //RIGHT CORNER
    const cornerRightSeat = spaceCell(seatIndex);
    seats.push(cornerRightSeat);
    seatIndex++;
    //CREW
    Array.from(Array(crewRowsNumber).keys()).map(row => {
      //CORNER 1
      const crewLeftCorner = spaceCell(seatIndex);
      seats.push(crewLeftCorner);
      seatIndex++;
      //CREW SEATS
      for (let m = 0; m < columnGroups.length; m++) {
        const innerCols = columnGroups[m];
        for (let n = 0; n < innerCols; n++) {
          const crewCabCell = crewCell(seatIndex)
          seats.push(crewCabCell);
          seatIndex++;
        }
        //BETWEEN EACH GROUP -EMPTY SET
        if (m < (columnGroups.length - 1)) {
          const crewEmptySeat = spaceCell(seatIndex);
          seats.push(crewEmptySeat);
          seatIndex++;
        }
      }
      //CORNER2
      const crewRightCorner = spaceCell(seatIndex);
      seats.push(crewRightCorner);
      seatIndex++;
    });
    //SEPARATOR
    Array.from(Array(totalColumns).keys()).map(col => {
      const separtorSeat = spaceCell(seatIndex);
      seats.push(separtorSeat);
      seatIndex++;
    });
    //PASSENGERS SEATS
    let rowNmuber = 1;
    for (let i = 0; i < rowGroups.length; i++) {
      const rows = rowGroups[i];
      for (let j = 0; j < rows; j++) {
        //SET ROW INDICATOR
        const passIndicatorLeft = indicatorCell(seatIndex, true, rowNmuber);
        seats.push(passIndicatorLeft);
        seatIndex++;
        //SEATS BY COLUMNS
        let columnNumber = 1;
        for (let m = 0; m < columnGroups.length; m++) {
          const innerCols = columnGroups[m];
          for (let n = 0; n < innerCols; n++) {
            const passengerSeat = passengerCell(seatIndex, rowNmuber, columnNumber, tickets);
            seats.push(passengerSeat);
            seatIndex++;
            columnNumber++;
          }
          if (m < (columnGroups.length - 1)) {
            const passSpaceSeat = spaceCell(seatIndex);
            seats.push(passSpaceSeat);
            seatIndex++;
          }
        }
        const passIndicatorRight = indicatorCell(seatIndex, true, rowNmuber);
        seats.push(passIndicatorRight);
        seatIndex++;

        rowNmuber++;
      }
    }
    return seats;
  }

  //UI
  return (
    <Box name='container'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: `${width}px`,
        height: `${height}px`,
        padding: '0px',
        margin: '0px'
      }}
    >
      {seatsLayout.sort((a, b) => { return a.index - b.index }).map((cell) => cell)}
    </Box>
  )
}





export default SeatPicker
