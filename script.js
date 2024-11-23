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
    render();
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
                symbol = 'O'; // If the field is 'circle', use 'O'
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