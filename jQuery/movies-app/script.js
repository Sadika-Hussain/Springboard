$(document).ready(function () {
    // Add new movie on form submission
    $('.movie-form').on('submit', addMovie);

    // Remove movie by clicking corresponding delete button
    $('.movie-list').on('click', '.delete-btn', function () {
        $(this).parent().remove();
        sortMovies(); // Re-sort movies after deletion
    });

    // Sort movies on click (based on sort criteria)
    const $sortBy = $('#sort-by');
    $sortBy.on('click', sortMovies);

    // Function to add a new movie
    function addMovie(evt) {
        evt.preventDefault();
        let $movieName = $('#name').val();
        let $rating = $('#rating').val();

        if (!$movieName || !$rating) {
            return;
        }

        $('.movie-list').append(createLi($movieName, $rating));

        $('#name').val('');
        $('#rating').val('');

        sortMovies();
    }

    // Function to sort movies based on selected sort criteria and order 
    function sortMovies() {
        if ($sortBy.val() === 'ascending') {
            sortByTitle(true);
        } else if ($sortBy.val() === 'descending') {
            sortByTitle(false);
        } else if ($sortBy.val() === 'lowest') {
            sortByRating(true);
        } else if ($sortBy.val() === 'highest') {
            sortByRating(false);
        }
    }

    // Function to sort movies by title
    function sortByTitle(ascending) {
        const movies = [...$('.movie-list li')];

        // Sort titles in alphabetical (ascending or descending) order
        movies.sort((movie1, movie2) => {
            const title1 = $(movie1).children('div').eq(0).text().toLowerCase();
            const title2 = $(movie2).children('div').eq(0).text().toLowerCase();
            return ascending ? title1.localeCompare(title2) : title2.localeCompare(title1);
        });

        // Append movies sorted by title to ul
        $('.movie-list').empty().append(movies);
    }

    // Function to sort movies by rating
    function sortByRating(ascending) {
        const movies = [...$('.movie-list li')];

        // Sort ratings in ascending or descending order
        movies.sort((a, b) => {
            const ratingA = parseFloat($(a).children('div').eq(1).text());
            const ratingB = parseFloat($(b).children('div').eq(1).text());
            return ascending ? ratingA - ratingB : ratingB - ratingA;
        });

        // Append movies sorted by rating to ul
        $('.movie-list').empty().append(movies);
    }

    // Function to create a new li element containing movie title, rating, and a corresponding delete button
    function createLi(title, rating) {
        const $newLi = $('<li>');
        const $movieDiv = $('<div>').text(title);
        const $ratingDiv = $('<div>').text(rating);
        const $deleteBtn = $('<button>')
            .text('Delete')
            .addClass('delete-btn'); // Class added for easier selection

        $newLi
            .append($movieDiv, $ratingDiv, $deleteBtn);

        return $newLi;
    }
});