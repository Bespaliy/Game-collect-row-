function winnerOfGame(vert, gamer) {
    for (let i = 0; i < vert.length; i++) {
        for (let j = 4; j < vert[i].length; j++) {
            if (vert[i][j - 4].classList == gamer &&
                vert[i][j - 3].classList == gamer &&
                vert[i][j - 2].classList == gamer &&
                vert[i][j - 1].classList == gamer &&
                vert[i][j].classList == gamer) {
                  return true;
            }
            }      
    }
 return false;
}