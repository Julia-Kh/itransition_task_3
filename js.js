import readlineSync from 'readline-sync'; // This is how functions from foreign libraries are imported
import { generateTableOfResults } from './table_of_results.js'; // This is how crap is imported from my files
import { checkWin } from './checkWin.js';
import { generateRandomKey } from './secretKey.js';
import { generateHMAC } from './HMAC.js';


function getMovesNumber (argv) {
    return argv.length;
}

function getTheArguments() {
    let argv = process.argv;
    const countOfUnusedArgv = 2;
    argv = argv.slice(countOfUnusedArgv);
    return argv;
}

function processingArgv (argv, movesNumber) {
    const setOfArgv = new Set(argv);
    if (movesNumber < 3 || movesNumber % 2 === 0 || setOfArgv.size !== movesNumber) {
        console.log("number of arguments at least 3; there must be an odd number of arguments; argument names must not be repeated");
        process.exit(1);
    }
}

function generateComputerMove(movesNumber) {
    return Math.floor(Math.random() * movesNumber) + 1;
}

function showMenu (argv) {
    console.log(`Available moves:\n`);
    for (let i = 0; i < argv.length; i++) {
        console.log(`${i+1} — ${argv[i]}`);
    }
    console.log('0 — exit\n? — help');
}

function getUserMove() {
    return readlineSync.question("Your move: ");
}

function showTableOfResults (table) {
    console.log(table);
}

function showTableOfResultsAndGetUserMove (table, argv, movesNumber, computerMove) {
    showTableOfResults(table);
    let userInput = getUserMove();
    processingUserResponse(userInput, argv, table, movesNumber, computerMove);
    return userInput;
}

function printGameResult (computerMove, userInput, movesNumber, argv) {
    computerMove--;
    userInput--;
    const result = checkWin(computerMove, userInput, movesNumber);
    console.log('Your move: ', argv[userInput], '\nComputer move: ', argv[computerMove]);
    printWhoWin(result);
}

function printWhoWin (result) {
    if (result === -1) console.log('You win');
    else if (result === 1) console.log('Computer win');
    else console.log('Draw');
    console.log('HMAC key: ', randomSecretKey);
}

function processingIncorrectUserResponse (argv, movesNumber, table, computerMove) {
    console.log("\nPlease enter the characters shown in the menu.");
    showMenu(argv);
    let userInput = getUserMove();
    processingUserResponse(userInput, argv, table, movesNumber, computerMove);
}

function processingUserResponse (userInput, argv, table, movesNumber, computerMove) {
    const userInputNumber = Number(userInput);
    if (userInput === '?') userInput = showTableOfResultsAndGetUserMove(table, argv, movesNumber, computerMove);
    else if (userInput === '0') process.exit();
    else if (isNaN(userInputNumber) || userInputNumber > movesNumber || userInputNumber < 1) processingIncorrectUserResponse(argv, movesNumber, table, computerMove);
    else printGameResult(computerMove, userInput, movesNumber, argv);
}

let argv = getTheArguments();
const movesNumber = getMovesNumber(argv);
processingArgv(argv, movesNumber);
const computerMove = generateComputerMove(movesNumber);
const randomSecretKey = generateRandomKey(32);
const hmac = generateHMAC(randomSecretKey, argv[computerMove-1]);
console.log('HMAC: ', hmac);
showMenu(argv);
let userInput = getUserMove();
const table = generateTableOfResults(argv, movesNumber);
processingUserResponse(userInput, argv, table, movesNumber, computerMove);
