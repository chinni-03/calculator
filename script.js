let total = 0;
let buffer = '0';
let operator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            buffer = '0';
            total = 0;
            break;
        case '=':
            if(operator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            operator = null;
            buffer = total;
            total = 0;
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if(buffer === '0') {
        return;
    }
    const newBuffer = parseInt(buffer);
    if(total === 0) {
        total = newBuffer;
    } else {
        flushOperation(newBuffer);
    }
    operator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if(operator === '+') {
        total += intBuffer;
    } else if (operator === '−') {
        total -= intBuffer;
    } else if (operator === '×') {
        total *= intBuffer;
    } else if (operator === '÷') {
        total /= intBuffer;
    }
}

function handleNumber(number) {
    if(buffer === '0') {
        buffer = number;
    } else {
        buffer += number;
    }
}

function init() {
    document.querySelector('.calc-clicks').addEventListener('click', (event) => {
        buttonClick(event.target.innerText);
    })
}

init();