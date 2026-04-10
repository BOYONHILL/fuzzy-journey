let display = document.getElementById('display');
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = '';
        shouldResetDisplay = false;
    }
    if (number === '.' && display.textContent.includes('.')) return;
    display.textContent += number;
}

function chooseOperator(op) {
    if (display.textContent === '' || display.textContent === 'Error') return;
    if (previousInput !== '' && !shouldResetDisplay) {
        compute();
    }
    operator = op;
    previousInput = display.textContent;
    shouldResetDisplay = true;
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(display.textContent);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.textContent = 'Error';
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    display.textContent = result.toString();
    resetCalculator();
}

function applyTrigFunction(fn) {
    const value = parseFloat(display.textContent);
    if (isNaN(value)) return;

    let result;
    switch (fn) {
        case 'sin':
            result = Math.sin(value);
            break;
        case 'cos':
            result = Math.cos(value);
            break;
        case 'tan':
            result = Math.tan(value);
            break;
        default:
            return;
    }

    display.textContent = result.toString();
    shouldResetDisplay = true;
}

function resetCalculator() {
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    display.textContent = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.textContent));
});

document.querySelectorAll('.function').forEach(button => {
    button.addEventListener('click', () => applyTrigFunction(button.textContent));
});

document.querySelector('.equals').addEventListener('click', compute);

document.querySelector('.clear').addEventListener('click', clearDisplay);