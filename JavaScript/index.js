 
let movies = [];

// Function to add a movie to the array
function addMovie(title, year, genre, description) {
  movies.push({ title: title, year: year, genre: genre, description: description });
}

// Sample movie data
addMovie("North by Northwest", "1959", "Action", "One of the most beloved and iconic films from legendary director Alfred Hitchcock, North by Northwest follows advertising man Roger Thornhill, the furthest thing from an action hero. The film blends mystery, comedy, and action to create a perfect blending and one-of-a-kind experience that would prove to be highly influential for action movies as a whole. North by Northwest proves the creativity and magic of action movies as a whole, showing that highly exhilarating setpieces and sequences don't have to come from a standard hero storyline. The film's implementation of comedy was also highly effective for the era, creating a distinct style that was incredibly ahead of its time when it came to action comedy filmmaking.");
addMovie("Princess Mononoke", "1997", "Action", "One of the very few animated action movies to be highly praised by IMDb, Princess Mononoke follows the story of Ashitaka, the prince of the disappearing Emishi people. In the west, he finds himself at the center of an ecological battle, with one side featuring San, a woman raised by wolves fighting to protect the forest, and the other side featuring Lady Eboshi, the leader of a local tribe looking to destroy the forest for the sake of her growing community. Despite the preconceived notions of an animated film, Princess Mononoke makes the most of the medium to create one of the most enthralling and exciting action movie experiences possible.");
addMovie("Star Wars: Episode VI - Return of the Jedi", "1983", "Action", "The final chapter of the original sci-fi masterpiece trilogy, Return of the Jedi initially follows Luke Skywalker as he leads a mission to save his friend Han Solo from the clutches of the nefarious Jabba the Hutt. Luke must find the honor and power within himself to stop the Emperor as well as confront his father, Darth Vader. Capping off one of the most iconic and beloved science fiction franchises of all time is a tough task in itself, yet for the most part, Return of the Jedi acted as a highly satisfying finale for the franchise. ");
addMovie("Oldboy", "2003", "Action", "Director Park Chan-wook has already established a reputation for producing unsettling films with unexpected turns, the most notable of which was Oldboy. Viewers who are tired of Hollywood's action movies can turn to Oldboy, a masterpiece of Asian cinema, and enjoy a seamless integration of heart-wrenching drama mixed with heart-pounding action sequences, all of which makes the movie a riveting one that no remake will ever be able to match.");
addMovie("Avengers: Infinity War", "2018", "Action", "Acting as the beginning of the end for the Infinity Saga of the MCU, Avengers: Infinity War saw the Avengers finally facing off against the mad titan himself, Thanos. However, Thanos as a central and powerful villain is the key to making the film work as well as it does, as it massively increases the stakes and has the entire film built around him and his ominous power. The result is a film with still highly memorable action sequences, as well as perfectly setting the stage for one of the biggest films in cinematic history.");

addMovie("Movie 1", "2019", "Comedy", "Description of Movie 2");
addMovie("Movie 2", "2019", "Comedy", "Description of Movie 2");
addMovie("Movie 3", "2019", "Comedy", "Description of Movie 2");
addMovie("Movie 4", "2019", "Comedy", "Description of Movie 2");
addMovie("Movie 5", "2019", "Comedy", "Description of Movie 2");

addMovie("Movie 1", "2018", "Drama", "Description of Movie 3");
addMovie("Movie 2", "2018", "Drama", "Description of Movie 3");
addMovie("Movie 3", "2018", "Drama", "Description of Movie 3");
addMovie("Movie 4", "2018", "Drama", "Description of Movie 3");
addMovie("Movie 5", "2018", "Drama", "Description of Movie 3");

addMovie("Movie 1", "2017", "Sci-Fi", "Description of Movie 4");
addMovie("Movie 2", "2017", "Sci-Fi", "Description of Movie 4");
addMovie("Movie 3", "2017", "Sci-Fi", "Description of Movie 4");
addMovie("Movie 4", "2017", "Sci-Fi", "Description of Movie 4");
addMovie("Movie 5", "2017", "Sci-Fi", "Description of Movie 4");

addMovie("Movie 1", "2016", "Horror", "Description of Movie 5");
addMovie("Movie 2", "2016", "Horror", "Description of Movie 5");
addMovie("Movie 3", "2016", "Horror", "Description of Movie 5");
addMovie("Movie 4", "2016", "Horror", "Description of Movie 5");
addMovie("Movie 5", "2016", "Horror", "Description of Movie 5");

// Function to render movie posters
function renderMoviePosters(movies) {
  $("#movie-posters").empty();
  if (movies.length === 0) {
    $("#movie-posters").html("<p>No movies found for this genre.</p>");
    return;
  }
  movies.forEach(movie => {
    const posterHTML = `
      <div class="col-md-4">
        <div class="card movie-poster">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.year}</p>
            <p class="card-text">${movie.genre}</p>
            <a href="#" class="btn btn-primary stretched-link view-details" data-bs-toggle="modal" data-bs-target="#movieDetailsModal" data-title="${movie.title}" data-year="${movie.year}" data-genre="${movie.genre}" data-description="${movie.description}">View Details</a>
          </div>
        </div>
      </div>`;
    $("#movie-posters").append(posterHTML);
  });
}

// Function to filter movies by genre
function filterMoviesByGenre(genre) {
    const filteredMovies = movies.filter(movie => movie.genre === genre);
    renderMoviePosters(filteredMovies);
  }

// Filter movies by genre
$(".genre-link").click(function(e) {
  e.preventDefault();
  const genre = $(this).data("genre");
  const filteredMovies = movies.filter(movie => movie.genre === genre);
  renderMoviePosters(filteredMovies);
});

// Show movie details in modal
$(document).on("click", ".view-details", function() {
  const title = $(this).data("title");
  const year = $(this).data("year");
  const genre = $(this).data("genre");
  const description = $(this).data("description");

  $("#movieDetailsModal .modal-title").text(title);
  const modalBody = `
    <p><strong>Year:</strong> ${year}</p>
    <p><strong>Genre:</strong> ${genre}</p>
    <p><strong>Description:</strong> ${description}</p>
  `;
  $("#movieDetailsModal .modal-body").html(modalBody);
});

// Initial render
renderMoviePosters(movies);



$(document).ready(function() {
    // Flag variable to track form submission status
    let isSubmitting = false;

    // Function to handle form submission
    $("#addMovieForm").submit(function(event) {
      event.preventDefault();

      // If form submission is already in progress, return
      if (isSubmitting) return;
      
      // Set the flag to indicate that form submission is in progress
      isSubmitting = true;

      const title = $("#movieTitle").val();
      const year = $("#movieYear").val();
      let genre = $("#movieGenre").val().trim().toLowerCase(); // Ensure genre is trimmed and lowercase
      const description = $("#movieDescription").val();
      
      // Validate movie title (not empty)
      if (!title.trim()) {
        alert("Please enter a valid movie title.");
        resetForm();
        return;
      }

      // Validate year (four-digit number)
      const yearRegex = /^\d{4}$/;
      if (!year.match(yearRegex)) {
        alert("Please enter a valid four-digit year (YYYY).");
        resetForm();
        return;
      }

      // Validate movie genre (not empty)
      if (!genre) {
        alert("Please enter a valid movie genre.");
        resetForm();
        return;
      }

      // Validate movie description (not empty)
      if (!description.trim()) {
        alert("Please enter a valid movie description.");
        resetForm();
        return;
      }

      // If all validations pass, add the movie to the DOM
      addMovie(title, year, genre, description);

      // Reset the form
      resetForm();

      // Show confirmation modal
      $("#addMovieConfirmationModal").modal("show");

      // Reset the flag immediately after submission
      isSubmitting = false;

      // Filter movies by the added movie's genre
      filterMoviesByGenre(genre);
    });

    // Function to reset the form
    function resetForm() {
      $("#addMovieForm")[0].reset();
    }

    // Function to filter movies by genre
    function filterMoviesByGenre(genre) {
      $(".movie-card").hide();
      $(`.movie-card[data-genre="${genre}"]`).show();
    }
  });

  $(document).ready(function() {
    // Function to fetch a random quote from Forismatic API
    function fetchQuote() {
        $.ajax({
            jsonp: "jsonp",
            dataType: "jsonp",
            url: "http://api.forismatic.com/api/1.0/",
            contentType: "application/jsonp",
            data: {
              lang: "en",
              method: "getQuote",
              format: 'jsonp'
            },
            success: function(response) {
                // Extract the quote and author from the response
                var quote = response.quoteText;
                var author = response.quoteAuthor || "Unknown";
        
                // Update the quote content on the webpage
                $(".quote-text").html(quote);
                $(".quote-author").html(author);
              },
              error: function() {
                // Display an error message if the request fails
                $(".quote-text").html("Failed to fetch a quote.");
              }
            });
          }
        
          // Event listener for the button click
          $(".fetch-button").click(function() {
            fetchQuote();
          });
        
          // Fetch a quote when the page loads
          fetchQuote();
        });