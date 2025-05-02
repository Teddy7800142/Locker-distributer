//wait for the html to fully load to not create errors
document.addEventListener('DOMContentLoaded', () => {
    //create variables of the elements
    const searchBar = document.getElementById('search-bar');
    const suggestionsDiv = document.getElementById('search-suggestions');

    //function to display the suggestions
    function displaySuggestions(suggestions) {
        //create the div
        suggestionsDiv.innerHTML = '';
        //hides or displays the suggestion box based on if there is anything in the box
        suggestionsDiv.style.display = suggestions.length > 0 ? 'block' : 'none';

        //create each row
        suggestions.forEach(row => {
            //create a div to store the suggestions
            const suggestionItem = document.createElement('div');
            //create the style of the suggestion box
            suggestionItem.style.padding = '8px';
            suggestionItem.style.cursor = 'pointer';
            suggestionItem.style.borderBottom = '1px solid #eee';
            //add the information from the imported csv file
            suggestionItem.textContent = `${row[1]} ${row[0]}, Locker ${row[2]}`;
            
            //when the mos is over the box change the color
            suggestionItem.addEventListener('mouseover', () => {
                suggestionItem.style.backgroundColor = '#f0f0f0';
            });
            //when the mouser is moved off the box change the color back
            suggestionItem.addEventListener('mouseout', () => {
                suggestionItem.style.backgroundColor = 'white';
            });
            
            //when clicked write selected and the row in the chat
            suggestionItem.addEventListener('click', () => {
                searchBar.value = row[2]; 
                suggestionsDiv.style.display = 'none'; 
                console.log('Selected:', row); 
            });
            //add each suggested item to the div
            suggestionsDiv.appendChild(suggestionItem);
        });
    }

    function filterData(query) {
        //if the csv is empty dont try to suggest anything
        if (!window.data2DArray || window.data2DArray.length === 0) {
            console.log('No CSV data available');
            return [];
        }
        //convert the search input to all lowercase
        query = query.toLowerCase();
        //checks the query to see if anything from the csv file matches
        return window.data2DArray.filter(row => {
            return (
                row[0].toLowerCase().includes(query) || 
                row[1].toLowerCase().includes(query) || 
                String(row[2]).toLowerCase().includes(query) 
            );
        });
    }

    //only display the suggestions if the user is typing in the search bar
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length > 0) {
            const suggestions = filterData(query);
            displaySuggestions(suggestions);
        } else {
            suggestionsDiv.style.display = 'none'; 
        }
    });

    //display the suggestions if you click on the search bar
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });

    // when the enter key is pressed search for the locker
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const suggestions = filterData(searchBar.value);
            if (suggestions.length > 0) {
                searchBar.value = suggestions[0][2]; // Set to locker number
                suggestionsDiv.style.display = 'none';
                console.log('Selected via Enter:', suggestions[0]);
                // TODO: Add map interaction here
            }
        }
    });
});