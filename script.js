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
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
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
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
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