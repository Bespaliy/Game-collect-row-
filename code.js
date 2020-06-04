let field = document.querySelector('.field');

let count = 0;
let vert = [];

let firstPlayer = 'gamer1';
let secondPlayer = 'gamer2';

let vertically = 20
let horizontally = 20;

 makeTable(field, vertically, horizontally,vert);

//построение таблицы
function makeTable(field, vertically, horizontally,vert) {
   
    for (let i = 0; i < vertically; i++) {
        vert[i] = [];
        let tr = document.createElement('tr')
        for (let j = 0; j < horizontally; j++) {
            let td = document.createElement('td')
            vert[i][j] = td;
            tr.appendChild(td);
            td.addEventListener('click', clickOnCell);   
        }
        field.appendChild(tr);
    }
    return vert;
}
//функция для клика и зарисовки ячеек
function clickOnCell() {
    //условие для того что б при повторном клике на ячейку она не изменяла цвет
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
}