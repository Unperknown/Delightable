const maxNumberQuantity = 21;
const maxOfNumber = 100;

window.onload = () => {
    const answerIndex = pickRandomNumber(maxNumberQuantity);
    const buttons = document.querySelectorAll(".random-button");
    const message = document.querySelector("#end-message");

    for (let index in buttons) {
        if (index === 'length')
            break;

        buttons[index].style.background = pickRandomColor();
        buttons[index].innerHTML = pickRandomNumber(maxOfNumber);

        buttons[index].addEventListener('click', event => {
            let answer = buttons[answerIndex].innerHTML;
            let score = 0;

            if (event.target.innerHTML === answer) {
                message.innerHTML = `<span id="answer">${answer}</span><br>Wow, You\'ve just got <b>500 points</b>!`;
                score = 500;
            } else {
                message.innerHTML = `<span id="answer">${answer}</span><br>Uh, oh... Try again next time!</h1>`;
            }

            message.style.display = 'block';

            disableAll(buttons, answerIndex);
            setTimeout(() => {
                submitResult(score);
            }, 500);
        });
    }
}

const pickRandomColor = () => {
    const color = [ 'darkblue', 'darkred', 'darkmagenta', 'darkgoldenrod' ];
    const shuffled = color.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 1);
};

const pickRandomNumber = max => {
    pickRandomNumber.pickedNumber = pickRandomNumber.pickedNumber || [];
    let number = Math.floor(Math.random() * max + 1);

    if (pickRandomNumber.pickedNumber.includes(number)) {
        return pickRandomNumber(max);
    } else {
        pickRandomNumber.pickedNumber.push(number);
        return number;
    }
};

const disableAll = (buttons, exceptionIndex) => {
    const screen = document.querySelector('#content');
    const header = document.querySelector('#header');
    header.setAttribute('class', 'blur');
    screen.setAttribute('class', 'blur');

    for (let index in buttons) {
        if (index === 'length')
            break;

        buttons[index].disabled = true;

        if (index != exceptionIndex) {
            buttons[index].style.background = 'lightgray';
        }
    }
};

const submitResult = score => {
    const scoreBox = document.querySelector('#score');
    const form = document.forms["stageResult"];

    scoreBox.value = score;
    form.submit();
};