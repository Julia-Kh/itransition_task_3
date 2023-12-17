export function checkWin (computerMove, userMove, movesNumber) {
    let p =  Math.floor(movesNumber / 2);
    return Math.sign((computerMove - userMove + p + movesNumber) % movesNumber - p);
}
