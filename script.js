let gamefields = [
    null,
    'circle',
    null,
    null,
    null,
    null,
    'cross',
    null,
    null
];


function init() {
    render(); // Füge hier den Kreis ein
}

function render() {
    // Start the HTML string for the table
    let html = '<table>';

    // Loop to create 3 rows for the table
    for (let row = 0; row < 3; row++) {
        html += '<tr>'; // Add a new table row (<tr>)

        // Loop to create 3 columns for each row
        for (let col = 0; col < 3; col++) {
            // Calculate the index in the 'fields' array based on row and column
            let index = row * 3 + col;

            // Determine the symbol for the current cell
            let symbol = '';
            if (gamefields[index] === 'circle') {
                symbol = renderAnimatedCircle(); // If the field is 'circle', use 'O'
            } else if (gamefields[index] === 'cross') {
                symbol = 'X'; // If the field is 'cross', use 'X'
            }

            // Add a table cell (<td>) with the symbol
            html += `<td>${symbol}</td>`;
        }

        html += '</tr>'; // Close the current table row
    }

    html += '</table>'; // Close the table

    // Update the HTML content of the 'container' div with the generated table
    document.getElementById('container').innerHTML = html;
}

// Hauptfunktion zum Rendern des Spielfelds
function render() {
    // Start the HTML string for the table
    let html = '<table>';

    // Loop to create 3 rows for the table
    for (let row = 0; row < 3; row++) {
        html += '<tr>'; // Add a new table row (<tr>)

        // Loop to create 3 columns for each row
        for (let col = 0; col < 3; col++) {
            // Calculate the index in the 'fields' array based on row and column
            let index = row * 3 + col;

            // Placeholder for cell content
            let cellContent = '';

            // Check if the field contains a circle or cross
            if (gamefields[index] === 'circle') {
                // Füge animierten Kreis für das aktuelle Feld hinzu
                cellContent = renderAnimatedCircle(); // Animierter Kreis
            } else if (gamefields[index] === 'cross') {
                cellContent = renderAnimatedCross(); // Einfaches "X" für das Feld
            }

            // Add a table cell (<td>) with the content
            html += `<td>${cellContent}</td>`;
        }

        html += '</tr>'; // Close the current table row
    }

    html += '</table>'; // Close the table

    // Update the HTML content of the 'container' div with the generated table
    document.getElementById('container').innerHTML = html;
}

// Funktion zum Generieren eines animierten Kreises
function renderAnimatedCircle(color = "#00B0EF", width = 70, height = 70) {
    // Dynamisch die SVG-Größe anpassen und die Farbe übernehmen
    const viewBoxSize = 100;
    const radius = 45; // Fixierter Radius des Kreises
    const circumference = 2 * Math.PI * radius; // Umfang des Kreises für Animation

    return `
        <svg width="${width}" height="${height}" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" xmlns="http://www.w3.org/2000/svg">
            <!-- Hintergrundkreis -->
            <circle cx="50" cy="50" r="${radius}" fill="none" stroke="#e6e6e6" stroke-width="10" />
            
            <!-- Animierter Vordergrundkreis -->
            <circle cx="50" cy="50" r="${radius}" fill="none" stroke="${color}" stroke-width="10"
                stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}" stroke-linecap="round">
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="${circumference}" 
                    to="0" 
                    dur="2s" 
                    repeatCount="1" 
                    fill="freeze" />
            </circle>
        </svg>
    `;
}

function renderAnimatedCross(color = "#FFC000", width = 70, height = 70) {
    const viewBoxSize = 100; // Größe des SVG-Viewports
    const lineWidth = 10; // Breite der Linien des Kreuzes

    return `
        <svg width="${width}" height="${height}" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" xmlns="http://www.w3.org/2000/svg">
            <!-- Diagonale Linie von oben links nach unten rechts -->
            <line x1="20" y1="20" x2="80" y2="80" stroke="${color}" stroke-width="${lineWidth}" stroke-linecap="round"
                stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="84.85" 
                    to="0" 
                    dur="2s" 
                    repeatCount="1" 
                    fill="freeze" />
            </line>
            
            <!-- Diagonale Linie von unten links nach oben rechts -->
            <line x1="20" y1="80" x2="80" y2="20" stroke="${color}" stroke-width="${lineWidth}" stroke-linecap="round"
                stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="84.85" 
                    to="0" 
                    dur="2s" 
                    repeatCount="1" 
                    fill="freeze" />
            </line>
        </svg>
    `;
}