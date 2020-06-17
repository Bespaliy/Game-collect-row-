'use strict';
const makeTable = (field, verticalSize, horizontalSize, arrOfField) => {
  for (let i = 0; i < verticalSize; i++) {
    arrOfField[i] = [];
    const row = document.createElement('tr');
    for (let j = 0; j < horizontalSize; j++) {
      const cell = document.createElement('td');
      arrOfField[i][j] = cell;
      row.appendChild(cell);
      cell.addEventListener('click', clickOnCell);
    }
    field.appendChild(row);
  }
  return arrOfField;
};

const whoIsWinner = (arr, gamer) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 4; j < arr[i].length; j++) {
      if (arr[i][j - 4].classList.contains(gamer) &&
                  arr[i][j - 3].classList.contains(gamer) &&
                  arr[i][j - 2].classList.contains(gamer) &&
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
    alert(`${gamer}`);
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


function clickOnCell() {
  if (this.classList.item(0)) {
    return;
  }
  this.classList.add(gamers[countGamer]);
  countGamer++;
  if (countGamer === gamers.length) {
    countGamer = 0;
  }
  endOfGame(mainArr, gamers[countGamer]);
}
