document.addEventListener('DOMContentLoaded', () => {
    // Initialize Phosphor Icons
    if (typeof PhosphorIcon !== 'undefined') {
        PhosphorIcon.replace();
    }

    // Auto-dismiss toasts after 5 seconds
    const toasts = document.querySelectorAll('.toast');
    if (toasts.length > 0) {
        setTimeout(() => {
            toasts.forEach(toast => {
                toast.style.transform = 'translateX(100%)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            });
        }, 5000);
    }

    // --- Calculator Logic ---
    const calcToggle = document.getElementById('calculator-toggle');
    const calcPanel = document.getElementById('calculator-panel');
    const calcClose = document.getElementById('calculator-close');
    const calcDisplay = document.getElementById('calc-display');

    if (calcToggle && calcPanel) {
        calcToggle.addEventListener('click', () => {
            calcPanel.classList.toggle('hidden');
        });

        calcClose.addEventListener('click', () => {
            calcPanel.classList.add('hidden');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!calcPanel.contains(e.target) && !calcToggle.contains(e.target)) {
                calcPanel.classList.add('hidden');
            }
        });
    }

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    window.calcNum = (num) => {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = num === '.' ? '0.' : num;
            shouldResetScreen = false;
        } else {
            if (num === '.' && currentInput.includes('.')) return;
            currentInput += num;
        }
        updateDisplay();
    };

    window.calcOp = (op) => {
        if (operation !== null) calcEqual();
        previousInput = currentInput;
        operation = op;
        shouldResetScreen = true;
    };

    window.calcClear = () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    };

    window.calcEqual = () => {
        if (operation === null || shouldResetScreen) return;
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '*': result = prev * current; break;
            case '/': 
                if (current === 0) {
                    alert('Divisão por zero!');
                    calcClear();
                    return;
                }
                result = prev / current; 
                break;
            default: return;
        }

        currentInput = result.toString();
        operation = null;
        shouldResetScreen = true;
        updateDisplay();
    };

    function updateDisplay() {
        if (calcDisplay) {
            calcDisplay.value = currentInput.replace('.', ',');
        }
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (calcPanel && !calcPanel.classList.contains('hidden')) {
            if (e.key >= '0' && e.key <= '9') calcNum(e.key);
            if (e.key === '.') calcNum('.');
            if (e.key === ',') calcNum('.');
            if (e.key === '+') calcOp('+');
            if (e.key === '-') calcOp('-');
            if (e.key === '*') calcOp('*');
            if (e.key === '/') calcOp('/');
            if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                calcEqual();
            }
            if (e.key === 'Escape') calcPanel.classList.add('hidden');
            if (e.key === 'Backspace' || e.key === 'Delete') calcClear();
        }
    });
});
