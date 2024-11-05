document.addEventListener('DOMContentLoaded', function() {
    const resultDisplay = document.getElementById('result');
    const errorDisplay = document.getElementById('error');
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    let currentOperation = null;
    let activeInput = input1; 

    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (key === '+' || key === '-' || key === '*' || key === '/') {
            setOperation(key);
        }

        else if (key === 'Enter') {
            calculateResult();
        }

        else if (key.toLowerCase() === 'c') {
            clearInputs();
        }
    });

    function appendNumber(number) {
        activeInput.value += number;
    }

    function setActiveInput(input) {
        activeInput = input;
    }

    function setOperation(op) {
        
        if (op === '÷') {
            currentOperation = '/';
        } else if (op === 'x' || op === '×') {
            currentOperation = '*';
        } else {
            currentOperation = op;
        }

        errorDisplay.textContent = ''; 
        setActiveInput(input2); 
    }

    function calculateResult() {
        const num1 = parseFloat(input1.value);
        const num2 = parseFloat(input2.value);

        if (input1.value.trim() === '' || input2.value.trim() === '') {
            errorDisplay.textContent = 'Помилка: обидва поля повинні бути заповнені.';
            return;
        }
        if (isNaN(num1) || isNaN(num2)) {
            errorDisplay.textContent = 'Помилка: введіть коректні числа в обидва поля.';
            return;
        }
        if (currentOperation === null) {
            errorDisplay.textContent = 'Помилка: виберіть операцію.';
            return;
        }
        
        let result;
        switch (currentOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    errorDisplay.textContent = 'Помилка: ділення на нуль.';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return;
        }

        resultDisplay.textContent = `Результат: ${result.toFixed(2)}`;
        errorDisplay.textContent = ''; 
    }

    function clearInputs() {
        input1.value = '';
        input2.value = '';
        resultDisplay.textContent = 'Результат';
        errorDisplay.textContent = '';
        currentOperation = null;
        setActiveInput(input1); 
    }

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => appendNumber(button.textContent));
    });

    document.querySelectorAll('.operation').forEach(button => {
        button.addEventListener('click', () => setOperation(button.textContent));
    });

    document.querySelector('.equals').addEventListener('click', calculateResult);
    document.querySelector('.clear').addEventListener('click', clearInputs);

    input1.addEventListener('focus', () => setActiveInput(input1));
    input2.addEventListener('focus', () => setActiveInput(input2));
});
