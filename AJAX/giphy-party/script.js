const searchTerm = $('#search-term');
const form = $('#search-form');
const deleteBtn = $('#delete');
const giphys = $('#giphy-container');

// Event listener for form submission, calls renderGifs function
form.on('submit', renderGifs);

// Event listener for delete button click, calls removeGifs function
deleteBtn.click(removeGifs);

// Asynchronous function to search for a gif using Giphy API
async function searchGiphy() {
    try {
        // Sending a GET request to Giphy API and storing the response
        const response = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm.val()}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
        // Extracting the data from the response
        const searchData = response.data.data;
        // Returning null if no results found
        if (searchData.length === 0) {
            return null;
        }
        // Generating a random index to select a random gif from the search results
        const randIdx = Math.floor(Math.random() * searchData.length);
        // Returning the URL of the downsized image of the randomly selected gif
        return searchData[randIdx].images.downsized.url;
    } catch (error) {
        // Catching and logging errors that occurred during the search process
        console.error('Error searching Giphy:', error);
        return null; // Return null in case of an error
    }

}

// Asynchronous function to render gifs based on the search term
async function renderGifs(e) {
    e.preventDefault();
    if (!searchTerm.val()) {
        return;
    }
    // Searching for a gif based on the input search term
    const gifUrl = await searchGiphy();
    if (gifUrl) {
        // Appending the found gif to the giphys container
        giphys.prepend(`<img class='gifs' src="${gifUrl}">`);
    } else {
        // Logging a message if no gif was found
        console.log('No results found');
    }
    searchTerm.val('');
}

// Function to remove all gifs from the giphys container
function removeGifs() {
    giphys.empty();
}
