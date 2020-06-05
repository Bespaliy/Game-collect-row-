'use strict';
let field = document.querySelector('.field');

let count = 0;
let vert = [];//массив который содержит ячейки и ряды

let firstPlayer = 'gamer1';
let secondPlayer = 'gamer2';

let vertically = 25;
let horizontally = 45;

makeTable(field, vertically, horizontally, vert);

let colums = getTransColone(vert);
let firstDiagonal = getFirstDiagonal(vert);
let secondDiagonal = getSecondDiagonal(vert);
let transVert = vert.concat(colums, firstDiagonal, secondDiagonal);

//построение таблицы и ячеек
function makeTable(field, vertically, horizontally,vert) {
   
    for (let i = 0; i < vertically; i++) {
        vert[i] = [];
        let tr = document.createElement('tr');
        for (let j = 0; j < horizontally; j++) {
            let td = document.createElement('td');
            vert[i][j] = td;
            tr.appendChild(td);
            td.addEventListener('click', clickOnCell);   
        };
        field.appendChild(tr);
    };
    return vert;
};
//функция для клика и зарисовки ячеек
function clickOnCell() {
    //условие для того что б при повторном клике на ячейку она не миняла цвет
    if (this.classList == firstPlayer || this.classList == secondPlayer) {
        return undefined;
    }
    if (count == 0) {
        this.classList.add(firstPlayer);
        count++;
    }
        else {
            this.classList.add(secondPlayer);
            count = 0;
    }
    endOfGame(transVert, firstPlayer);
    endOfGame(transVert, secondPlayer);
};

//проверка существует ли соседние ячейки с одинаковым цветом
function whoIsWinner(transVert, gamer) {
    for (let i = 0; i < transVert.length; i++) {
        for (let j = 4; j < transVert[i].length; j++) {
            if (transVert[i][j - 4].classList == gamer &&
                transVert[i][j - 3].classList == gamer &&
                transVert[i][j - 2].classList == gamer &&
                transVert[i][j - 1].classList == gamer &&
                transVert[i][j].classList == gamer) {
                return true;
            }
        }        
    }
 return false;
};

//функция проверяет собран ли ряд и если собран заканчивает игру
function endOfGame(transVert, gamer) {
    if (whoIsWinner(transVert, gamer)) {
        alert(`WINNER is ` + `${gamer}`)
        return blockGame(transVert);
    }
};

//после заканчивания игры, запрещает закрашивать ячейки
function blockGame(vert) {
    for (let i = 0; i < vert.length; i++) {
        for (let j = 0; j < vert[i].length; j++) {
            let cell = vert[i][j];
            cell.removeEventListener('click', clickOnCell);
        }
    }
};

//функция изменяет ряды и столбики местами
function getTransColone(vert) {
    let res = [];
    for (let i = 0; i < vert.length; i++) {
        for (let j = 0; j < vert[i].length; j++) {
            if (res[j] === undefined) {
                res[j] = [];
            }
            res[j][i] = vert[i][j];
        }
    }
    return res;
};

//функция делает массивы с элементов vert,которые находят по диагонали
function getFirstDiagonal(vert) {
    let res = [];
    for (let i = 0; i < vert.length; i++) {
        for (let j = 0; j < vert[i].length; j++) {
            if (res[j + i] === undefined) {
                res[j + i] = [];
            }
            res[j + i].push(vert[i][j]);
        }
    }
    return res;
};

//функция пределавает массив vert используя вторую диагональ
function getSecondDiagonal(vert) {
    let res = [];
    for (let i = 0; i < vert.length; i++) {
        vert[i].reverse();
        for (let j = 0; j < vert[i].length; j++) {
            if (res[j + i] === undefined) {
                res[j + i] = [];
            }
            res[j + i].push(vert[i][j]);
        }
    }
    return res;
};