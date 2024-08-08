let count = 0;
let history = [];
let hashTable = {};

updateBackgroundColor();

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (['2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K', 'A'].includes(key)) {
        handleInput(key === '0' ? '10' : key);
    } else if (event.key === 'Backspace') {
        deleteLast();
    }
});

function handleInput(input) {
    history.push(input);
    updateCount(input);
    updateHashTable(input, 1);
    updateTable();
    displayCount();
    updateBackgroundColor(); // Chama a função para atualizar a cor de fundo
}

function updateBackgroundColor() {
    if (count <= 5) {
        document.body.style.backgroundColor = '#FFCCCC'; // vermelho pastel
    } else if (count <= 22) {
        document.body.style.backgroundColor = '#FFFFCC'; // amarelo pastel
    } else {
        document.body.style.backgroundColor = '#CCFFCC'; // verde pastel
    }
}

function updateCount(input) {
    if (['2', '3', '4', '5', '6'].includes(input)) {
        count += 1;
    } else if (['10', 'J', 'Q', 'K', 'A'].includes(input)) {
        count -= 1;
    }
}

function deleteLast() {
    const lastInput = history.pop();
    if (lastInput) {
        updateHashTable(lastInput, -1);
        if (['2', '3', '4', '5', '6'].includes(lastInput)) {
            count -= 1;
        } else if (['10', 'J', 'Q', 'K', 'A'].includes(lastInput)) {
            count += 1;
        }
    }
    updateTable();
    displayCount();
}

function updateHashTable(input, change) {
    if (!hashTable[input]) {
        hashTable[input] = 0;
    }
    hashTable[input] += change;
    if (hashTable[input] === 0) {
        delete hashTable[input];
    }
}

function displayCount() {
    document.getElementById('result').textContent = count;
}

function updateTable() {
    const tableBody = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpa a tabela antes de atualizá-la

    for (let key in hashTable) {
        const row = tableBody.insertRow();
        const cellKey = row.insertCell(0);
        const cellValue = row.insertCell(1);
        cellKey.textContent = key;
        cellValue.textContent = hashTable[key];
    }
}
