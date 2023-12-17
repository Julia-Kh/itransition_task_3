import Table from 'cli-table';

function createHeaderOfTheTableOfResults (argv) {
    const headerOfTheTable = ["v PC\\User >"];
    for (let arg of argv) {
        headerOfTheTable.push(arg);
    }
    return headerOfTheTable;
}

function createBodyOfTheTableOfResults (argv, table, headerOfTheTable, movesNumber) {
    let currentElement = "",
        elementsBeforeCurrent = [],
        elementsAfterCurrent = [],
        arr = [],
        tableRow = {},
        key = "";
    const halfOfCountOfArgv = Math.floor(movesNumber / 2);
    for (let i = 0; i < movesNumber; i++) {
        key = argv[i];
        tableRow[key] = [];
        for (let j = 0; j < movesNumber; j++) {
            currentElement = argv[j];
            if (currentElement === headerOfTheTable[i + 1]) {
                tableRow[key].push("draw");
                continue;
            }
            if (j !== 0) {
                elementsBeforeCurrent = argv.slice(0, j);
            } else {
                elementsBeforeCurrent = [];
            }
            if (j !== argv.length - 1) {
                elementsAfterCurrent = argv.slice(j + 1);
            } else {
                elementsAfterCurrent = [];
            }
            arr = [
                currentElement,
                ...elementsAfterCurrent,
                ...elementsBeforeCurrent,
            ];
            if (arr.indexOf(headerOfTheTable[i + 1]) <= halfOfCountOfArgv) {
                tableRow[key].push("lose");
                continue;
            }
            tableRow[key].push("win");
            arr = [];
            elementsAfterCurrent = [];
            elementsBeforeCurrent = [];
        }
        table.push(tableRow);
        tableRow = {}; // without this line the table goes to hell
    }
}

export function generateTableOfResults(argv, movesNumber) {
    const headerOfTheTable = createHeaderOfTheTableOfResults(argv);
    let table = new Table({ head: headerOfTheTable });
    createBodyOfTheTableOfResults(argv, table, headerOfTheTable, movesNumber);
    return table.toString();
}
