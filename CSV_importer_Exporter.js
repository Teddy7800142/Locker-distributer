//small sample data
window.data2DArray = [
    ['dhuga', 'Harman', 228, 12],
    ['Gates', 'David', 212, 12],
    ['Oegema', 'Avery', 209, 12]
];

// Handle when the export button is clicked download the csv file
document.getElementById('export-btn').addEventListener('click', function() {
    const csv = arrayToCsv(window.data2DArray);
    downloadCSV(csv, 'data_2d_array.csv');
});

// Function to convert 2D array to csv file
function arrayToCsv(data) {
    let csv = '';
    data.forEach(row => {
        csv += row.join(',') + '\n';
    });
    return csv;
}

//downloading the csv file
function downloadCSV(csv, filename) {
    //create new raw data variable
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    //create and anchor link
    const a = document.createElement('a');
    //hide it from the user
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    //downloads the file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    //cleans up memory after the file is downloaded
    URL.revokeObjectURL(url);
}

// CSV Importer - Converts CSV to a 2D array (4 variables per entry)
function csvToArray(csv) {
    //each line is inputed into the lines variable
    const lines = csv.split('\n').map(line => line.trim()).filter(line => line);
    //array to hold the csv data after
    const result = [];

    //for each line
    lines.forEach(line => {
        //remove all commas and split into seperate variables
        const values = line.split(',').map(item => item.trim());
        //make sure it is the correct length
        if (values.length === 4) {
            // Ensure lockerNumber and grade are numbers
            values[2] = parseInt(values[2], 10); // lockerNumber
            values[3] = parseInt(values[3], 10); // grade
            result.push(values);
        }
    });

    return result;
}

// Function to handle CSV file import and parsing
function handleCSVFileImport(event) {
    //load file into a variable
    const file = event.target.files[0];
    //if there is a file
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const data = csvToArray(contents);
            window.data2DArray = data; // Update global data2DArray
            console.log('2D Array data from CSV:', window.data2DArray);
        };
        reader.readAsText(file);
    }
}

// Event listener to handle file selection for import
document.getElementById('file-input').addEventListener('change', handleCSVFileImport);