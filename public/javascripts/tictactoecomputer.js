window.onload = () => {
    const squares = document.querySelectorAll('td');
    let count = 0;

    for (let index in squares) {
        if (index === 'length') {
            break;
        }

        squares[index].addEventListener('click', event => {
            if (squares[index].innerHTML === empty) {
                let currentMark = getCurrentMark();

                squares[index].innerHTML = currentMark;
                let status = getStatus(squares, currentMark);

                if (status.message !== notFinishedMessage) {
                    disableTicTacToe(squares, status);
                    setTimeout(() => {
                        terminateTicTacToe(status);
                        submitResult(status.score);
                    }, 1000);
                } else {
                    if (count++ % 2 == 0) {
                        runComputerTurn(squares);
                    }
                }
            }
        });
    }
}

const empty = "<input type=\"image\" src=\"/images/empty.png\">";
const xMark = "<input type=\"image\" src=\"/images/x.png\">";
const oMark = "<input type=\"image\" src=\"/images/o.png\">";
const winMessage = "You Win!";
const loseMessage = "You lose...";
const drawMessage = "Draw.";
const notFinishedMessage = "Still on progress.";

const getCurrentMark = () => {
    if (getCurrentMark.mark === oMark) {
        getCurrentMark.mark = xMark;
    } else {
        getCurrentMark.mark = oMark;
    }

    return getCurrentMark.mark;
};

const getNextMark = currentMark => {
    return currentMark === oMark ? xMark : oMark;
};

const runComputerTurn = squares => {
    let available = Array.from(squares).filter(square => square.innerHTML === empty);

    let shuffled = available.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 1);

    selected[0].click();
};

const runAITurn = (squares, mark = xMark) => {
    var available = Array.from(squares).filter(square => square.innerHTML === empty);
    var status = getStatus(squares);
    var moves = [];

    if (status === winMessage) {
        return { score: -10 };
    } else if (status === loseMessage) {
        return { score: 10 };
    } else if (available.length === 0) {
        return { score: 0 };
    }

    for (let index in available) {
        let move = {};
        move.index = available[index];

        if (mark === xMark) {
            let result = runAITurn(squares, oMark);
            move.score = result.score;
        } else {
            let result = runAITurn(squares, xMark);
            move.score = result.score;
        }
        
        available[index] = move.index;

        moves.push(move);
    }

    let best;

    if (mark === xMark) {
        let score = -100;
        for (let index in moves) {
            if (moves[index].score > score) {
                score = moves[index].score;
                best = index;
            }
        }
    } else {
        let score = 100;

        for (let index in moves) {
            if (moves[index].score < score) {
                score = moves[index].score;
                best = index;
            }
        }
    }

    return moves[best];
};

const getStatus = (squares, currentMark) => {
    const boardIndexes = [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]; 
    const possibleBingoIndexes = [[ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ], [ 0, 4, 8 ], [ 2, 4, 6 ]];
    const nextMark = getNextMark(currentMark);

    for (let index in possibleBingoIndexes) {
        let possibleBingo = possibleBingoIndexes[index].map(x => squares[x].innerHTML);

        if (!possibleBingo.includes(empty) && !possibleBingo.includes(nextMark)) {
            if (currentMark === oMark) {
                return { message: winMessage, targets: possibleBingoIndexes[index], score: 500 };
            } else {
                return { message: loseMessage, targets: possibleBingoIndexes[index], score: 0 };
            }
        }
    }

    if (boardIndexes.map(x => squares[x].innerHTML).includes(empty)) {
        return { message: notFinishedMessage, targets: boardIndexes, score: 0 };
    } else {
        return { message: drawMessage, targets: boardIndexes, score: 0 };
    }
};

const disableTicTacToe = (squares, status) => {
    let bingo = status.targets.map(x => squares[x]);

    for (let index in squares) {
        if (index === 'length') {
            break;
        }

        squares[index].disabled = true;
    }

    for (let index in bingo) {
        bingo[index].style.background = 'red';
    }
};

const terminateTicTacToe = status => {
    const header = document.querySelector('#header');
    const content = document.querySelector('#content');
    const endMessage = document.querySelector('#end-message');

    header.setAttribute('class', 'blur');
    content.setAttribute('class', 'blur');

    endMessage.innerHTML = `<span id=\"status\">${status.message}</span><br>You've just got ${status.score} point(s).`;
    endMessage.style.display = 'block';
};

const submitResult = score => {
    const scoreBox = document.querySelector('#score');
    const form = document.forms["stageResult"];

    scoreBox.value = score;
    form.submit();
};