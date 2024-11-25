let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle';


function init() {
    render();
}
function render() {
    const contentDiv = document.getElementById('content');
    // Generate table HTML
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += `<td id="cell-${index}" onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    // Set table HTML to contentDiv
    contentDiv.innerHTML = tableHtml;
}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        if (checkGameOver()) {
            drawWinningLine();
        } else {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }  
    }
}

function resetGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    render();

    const line = document.querySelector('.winning-line');
    if (line) {
        line.remove();
    }

    // Reset the winningCombination variable
    winningCombination = null;
}

function checkGameOver() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Mark the winning combination
            winningCombination = combination;
            return true;
        }
    }
    return false;
}

let winningCombination = null;

function drawWinningLine() {
    if (!winningCombination) return;

    const table = document.querySelector('table');
    const firstCell = document.getElementById(`cell-${winningCombination[0]}`);
    const lastCell = document.getElementById(`cell-${winningCombination[2]}`);

    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();

    const line = document.createElement('div');
    line.classList.add('winning-line'); // Add this line
    line.style.position = 'absolute';
    line.style.height = '5px';
    line.style.backgroundColor = '#90EE90';
    line.style.zIndex = '10';
    line.style.transformOrigin = '0 0';

    // Calculate line position and rotation
    const x1 = firstRect.left + firstRect.width / 2;
    const y1 = firstRect.top + firstRect.height / 2;
    const x2 = lastRect.left + lastRect.width / 2;
    const y2 = lastRect.top + lastRect.height / 2;

    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    line.style.width = `${distance}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;

    document.body.appendChild(line);

    // Disable further clicks
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.onclick = null;
    }
}

function generateCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;
    return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
              </circle>
            </svg>`;
}
function generateCrossSVG() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;
    const svgHtml = `
      <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="0; ${width}" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="${width}; 0" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
      </svg>
    `;
    return svgHtml;
}
