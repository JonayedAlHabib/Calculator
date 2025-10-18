let input = document.getElementById('input-box');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerHTML;
        
        if(buttonText == '='){
            try {
                // Replace display operators with JavaScript operators
                let expression = string.replace(/×/g, '*').replace(/÷/g, '/');
                string = eval(expression).toString();
                input.value = string;
            } catch (error) {
                input.value = "Error";
                string = "";
            }
        }
        else if(buttonText == 'AC'){
            string = "";
            input.value = "0";
        }
        else if(buttonText == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string || "0";
        }
        else {
            // Prevent multiple operators or decimal points
            if(buttonText === '.' && string.includes('.')) {
                return;
            }
            
            // Handle operators
            const operators = ['+', '-', '*', '/', '%'];
            if(operators.includes(buttonText)) {
                // Prevent multiple consecutive operators
                if(operators.includes(string.slice(-1))) {
                    string = string.slice(0, -1) + buttonText;
                } else {
                    string += buttonText;
                }
            } else {
                string += buttonText;
            }
            
            input.value = string;
        }
    });
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if('0123456789.'.includes(key)) {
        if(key === '.' && string.includes('.')) return;
        string += key;
        input.value = string;
    }
    else if('+-*/%'.includes(key)) {
        const operators = ['+', '-', '*', '/', '%'];
        if(operators.includes(string.slice(-1))) {
            string = string.slice(0, -1) + key;
        } else {
            string += key;
        }
        input.value = string;
    }
    else if(key === 'Enter' || key === '=') {
        try {
            string = eval(string).toString();
            input.value = string;
        } catch (error) {
            input.value = "Error";
            string = "";
        }
    }
    else if(key === 'Escape') {
        string = "";
        input.value = "0";
    }
    else if(key === 'Backspace') {
        string = string.substring(0, string.length-1);
        input.value = string || "0";
    }
});