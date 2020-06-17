'use strict';
const addEmptyRow = (fields, i) => fields[i] = [];

const fillRow = (i, horizontalSize, arrOfField, row) => {
  for (let j = 0; j < horizontalSize; j++) {
    const cell = document.createElement('td');
    arrOfField[i][j] = cell;
    row.appendChild(cell);
    cell.addEventListener('click', () => { clickOnCell(cell); });
  }
};

const makeTable = (field, verticalSize, horizontalSize, arrOfField) => {
  for (let i = 0; i < verticalSize; i++) {
    addEmptyRow(arrOfField, i);
    const row = document.createElement('tr');
    fillRow(i, horizontalSize, arrOfField, row);
    field.appendChild(row);
  }
  return arrOfField;
};

const whoIsWinner = (arr, gamer) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 2; j < arr[i].length; j++) {
      if (arr[i][j - 2].classList.contains(gamer) &&
          arr[i][j - 1].classList.contains(gamer) &&
          arr[i][j].classList.contains(gamer)) {
        return true;
      }

    }
  }
  return false;
};


const blockGame = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const cel = arr[i][j];
      cel.removeEventListener('click', clickOnCell);
    }
  }
};

const endOfGame = (arr, gamer) => {
  if (whoIsWinner(arr, gamer)) {
    alert(`Winner is ${gamer}`);
    return blockGame(arr);
  }
};


const getTransColone = arr => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (result[j] === undefined) {
        result[j] = [];
      }
      result[j][i] = arr[i][j];
    }
  }
  return result;
};


const getFirstDiagonal = arr => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (result[j + i] === undefined) {
        result[j + i] = [];
      }
      result[j + i].push(arr[i][j]);
    }
  }
  return result;
};


const getSecondDiagonal = arr => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i].reverse();
    for (let j = 0; j < arr[i].length; j++) {
      if (result[j + i] === undefined) {
        result[j + i] = [];
      }
      result[j + i].push(arr[i][j]);
    }
  }
  return result;
};


const field = document.querySelector('.field');
const arrOfField = [];
const gamers = ['gamer1', 'gamer2'];
const verticalSize = 25;
const horizontalSize = 45;
let countGamer = 0;

makeTable(field, verticalSize, horizontalSize, arrOfField);

const colums = getTransColone(arrOfField);
const firstDiagonal = getFirstDiagonal(arrOfField);
const secondDiagonal = getSecondDiagonal(arrOfField);
const mainArr = arrOfField.concat(colums, firstDiagonal, secondDiagonal);


function clickOnCell(cell) {
  if (cell.classList.item(0)) {
    return undefined;
  }
  cell.classList.add(gamers[countGamer]);
  countGamer++;
  if (countGamer === gamers.length) {
    countGamer = 0;
  }
  endOfGame(mainArr, gamers[countGamer]);
}
