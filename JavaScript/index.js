let movies = [];
let selectedGenre = "";

function addMovie(title, year, genre, description){
  movies.push({ title: title, year: year, genre: genre, description: description });

  const selectedGenre = $(".genre-link.active").data("genre");
  filterMoviesByGenre(selectedGenre);

  if (selectedGenre && selectedGenre === genre){
    const posterHTML = `
      <div class="col-md-4 movie-card" data-genre="${genre}">
        <div class="card movie-poster">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${year}</p>
            <p class="card-text">${genre}</p>
            <a href="#" class="btn btn-primary stretched-link view-details" data-bs-toggle="modal" data-bs-target="#movieDetailsModal" data-title="${title}" data-year="${year}" data-genre="${genre}" data-description="${description}">View Details</a>
          </div>
        </div>
      </div>`;
    $("#movie-posters").append(posterHTML);
  }

  filterMoviesByGenre(selectedGenre);
}

function filterMoviesByGenre(genre){
  $("#movie-posters").empty();
  
  movies.forEach(movie =>{
    if (!genre || movie.genre.toLowerCase() === genre.toLowerCase()){
      const posterHTML = `
        <div class="col-md-4 movie-card" data-genre="${movie.genre}">
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
    }
  });
}

$(document).on("click", ".view-details", function(){
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

$(document).ready(function(){
  let isSubmitting = false;

  $(".dropdown-menu a").click(function(e){
    e.preventDefault();
    const selectedGenre = $(this).text();
    renderMoviesByGenre(selectedGenre);
  });

  $("a[href='#movie-posters']").click(function(e){
    e.preventDefault();
    filterMoviesByGenre('');
  });

  $(".genre-link").click(function(e){
    e.preventDefault();
    selectedGenre = $(this).data("genre");
    renderMoviesByGenre(selectedGenre);
  });

  $("#addMovieForm").submit(function(event){
    event.preventDefault();

    if(isSubmitting) return;
    isSubmitting = true;

    const title = $("#movieTitle").val();
    const year = $("#movieYear").val();
    let genre = $("#movieGenre").val().trim().toLowerCase();
    const description = $("#movieDescription").val();
      
    if(!title.trim()){
      alert("Please enter a valid movie title.");
      resetForm();
      return;
    }

    const yearRegex = /^\d{4}$/;
    if(!year.match(yearRegex)){
      alert("Please enter a valid four-digit year (YYYY).");
      resetForm();
      return;
    }

    if(!genre){
      alert("Please enter a valid movie genre.");
      resetForm();
      return;
    }

    if(!description.trim()){
      alert("Please enter a valid movie description.");
      resetForm();
      return;
    }

    addMovie(title, year, genre, description);

    resetForm();

    $("#addMovieConfirmationModal").modal("show");

    isSubmitting = false;

    filterMoviesByGenre(genre);
  });

  function resetForm(){
    $("#addMovieForm")[0].reset();
  }

  $("a[href='#movie-posters']").click(function(e){
    e.preventDefault();
    filterMoviesByGenre('');
  });
});

function renderMoviesByGenre(genre){
  selectedGenre = genre;
  $("#movie-posters").empty();

  movies.forEach(movie =>{
    if (!genre || movie.genre.toLowerCase()===genre.toLowerCase()){
      const posterHTML = `
        <div class="col-md-4 movie-card" data-genre="${movie.genre}">
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
    }
  });
}

addMovie("North by Northwest", "1959", "Action", "One of the most beloved and iconic films from legendary director Alfred Hitchcock, North by Northwest follows advertising man Roger Thornhill, the furthest thing from an action hero. The film blends mystery, comedy, and action to create a perfect blending and one-of-a-kind experience that would prove to be highly influential for action movies as a whole. North by Northwest proves the creativity and magic of action movies as a whole, showing that highly exhilarating setpieces and sequences don't have to come from a standard hero storyline. The film's implementation of comedy was also highly effective for the era, creating a distinct style that was incredibly ahead of its time when it came to action comedy filmmaking.");
addMovie("Princess Mononoke", "1997", "Action", "One of the very few animated action movies to be highly praised by IMDb, Princess Mononoke follows the story of Ashitaka, the prince of the disappearing Emishi people. In the west, he finds himself at the center of an ecological battle, with one side featuring San, a woman raised by wolves fighting to protect the forest, and the other side featuring Lady Eboshi, the leader of a local tribe looking to destroy the forest for the sake of her growing community. Despite the preconceived notions of an animated film, Princess Mononoke makes the most of the medium to create one of the most enthralling and exciting action movie experiences possible.");
addMovie("Star Wars: Episode VI - Return of the Jedi", "1983", "Action", "The final chapter of the original sci-fi masterpiece trilogy, Return of the Jedi initially follows Luke Skywalker as he leads a mission to save his friend Han Solo from the clutches of the nefarious Jabba the Hutt. Luke must find the honor and power within himself to stop the Emperor as well as confront his father, Darth Vader. Capping off one of the most iconic and beloved science fiction franchises of all time is a tough task in itself, yet for the most part, Return of the Jedi acted as a highly satisfying finale for the franchise. ");
addMovie("Oldboy", "2003", "Action", "Director Park Chan-wook has already established a reputation for producing unsettling films with unexpected turns, the most notable of which was Oldboy. Viewers who are tired of Hollywood's action movies can turn to Oldboy, a masterpiece of Asian cinema, and enjoy a seamless integration of heart-wrenching drama mixed with heart-pounding action sequences, all of which makes the movie a riveting one that no remake will ever be able to match.");
addMovie("Avengers: Infinity War", "2018", "Action", "Acting as the beginning of the end for the Infinity Saga of the MCU, Avengers: Infinity War saw the Avengers finally facing off against the mad titan himself, Thanos. However, Thanos as a central and powerful villain is the key to making the film work as well as it does, as it massively increases the stakes and has the entire film built around him and his ominous power. The result is a film with still highly memorable action sequences, as well as perfectly setting the stage for one of the biggest films in cinematic history.");

addMovie("My Cousin Vinny", "1992", "Comedy", "This film taught an entire generation about the features of the Chevy Bel Air. The whole movie is exceptionally quotable and has a devoted fan base, partially thanks to the powerhouse performances of Joe Pesci and Marisa Tomei. While the film only garnered 2.5 stars from Roger Ebert in 1992, the movie now boasts an 87% on Rotten Tomatoes from both fans and critics. The film became a classic through DVD and VHS rentals, which almost adds to the perfect 1990s nature of this now classic comedy.");
addMovie("Step Brothers", "2008", "Comedy", "While Judd Apatow and Adam Sandler flicks grounded this subgenre in the mid-2000s, buddy comedies are nothing new and have been popular with audiences since names like Laurel and Hardy were on marquees. Step Brothers feels like a classic buddy comedy. The wackiness of the premise is part of what makes Step Brothers a laugh-out-loud comedy. The film received mixed reviews on its initial run but has garnered a cult classic status in subsequent years.");
addMovie("The Big Sick", "2017", "Comedy", "The Big Sick is a rom-com, a com-com and a profoundly human film. The film stars Kumail Nanjiani and Zoe Kazan and was directed by Michael Showalter. The semi-autobiographical film follows the early romance between Nanjiani and his wife, Emily V. Gordon and Nanjiani wrote the screenplay together. Something that Nanjiani has since apologized for.");
addMovie("The Addams Family", "1991", "Comedy", "Many family comedies are created based on existing intellectual property, and many fail to capture the feeling of the source material while still standing on their own as a film. This film is remembered for its powerhouse performances from the late Raul Julia, Anjelica Huston, Christina Ricci and Christopher Lloyd. The New York Times said of the movie in 1991, “Making his directorial debut, the excellent cinematographer Barry Sonnenfeld … gives the film a visual wit to match its screenplay's ghoulish gags.” The film is currently streaming on Netflix, AMC+ and Paramount+.");
addMovie("Best In Show", "2000", "Comedy", "Improv is hard to pull off, but Best In Show does it well. Best In Show follows five dogs and their people competing in a Philadelphia dog show. The ensemble cast includes Eugene Levy, Catherine O’Hara, Parker Posey, Fred Willard, Jane Lynch, Jennifer Coolidge and many others. Best In Show is currently available for purchase to stream on Amazon Prime, Google Play, Apple TV and YouTube.");

addMovie("The Father", "2020", "Drama", "A horrifying but nevertheless empathetic examination of dementia and loss of one's autonomy, The Father is a deliberately mind-bending movie that uses clever editing and set design to put the viewer in a position where they can't trust their own memory. The film's real secret weapon, though, is Anthony Hopkins, who plays the titular father (aka Anthony) and delivers his best performance since Hannibal Lecter, swerving over the top caricature and giving Anthony a heartbreaking dignity.");
addMovie("No Country for Old Men", "2007", "Drama", "As methodical as a hitman stalking his mark and just as terrifying, No Country For Old Men is a film that embodies fatigue and a sense of impending doom. His portrayal of the deadly Anton Chigurh, a merciless hitman who makes the Terminator look like a cuddly community support officer, is one of the scariest performances ever put to film and what helps the film live on in the memory (or nightmares) of film fans around the world.");
addMovie("The Truman Show", "1998", "Drama", "Part dark comedy, part psychological drama, The Truman Show ranks amongst Jim Carrey's best movies and may just edge out Eternal Sunshine of the Spotless Mind for the top spot. It helps, of course, that his leading man, Jim Carrey, was at the height of his acting powers at the time, switching from a high-energy, funny man to a paranoid and world-weary soul at the flick of an internal switch.");
addMovie("There Will Be Blood", "2007", "Drama", "A genuine masterpiece from Paul Thomas Anderson about the corrosive nature of greed told through the eyes of Daniel Day-Lewis's ruthless oil tycoon, There Will Be Blood is unarguably one of the best movies ever made. Day-Lewis is, of course, brilliant (when is he not?), delivering a monstrous and magnetic performance that rightly won him his second Best Actor Oscar, but this is the film that arguably put Paul Dano on the road to superstardom, and for that alone, we love it.");
addMovie("Taxi Driver", "1976", "Drama", "Perhaps Martin Scorsese's most iconic film and certainly one of his darkest, Taxi Driver, explores the damaged mind of Travis Bickle (Robert De Niro), a cab driver working the sleazy streets of New York City. Grittier than an arctic road in winter and a borderline horror film at times, this bleak tale of a man slowly losing his mind is rooted in DeNiro's hypnotic and unhinged performance.");

addMovie("Galaxy Quest", "1999", "Sci-Fi", "Hailed as the best (non-Star Trek) Star Trek movie, Galaxy Quest is a hilarious love letter to both sci-fi fandom and iconic performers in sci-fi properties perhaps held back in their careers because of their association with said sci-fi. Starring Tim Allen, Sigourney Weaver, Alan Rickman, and more as the cast of a beloved yesteryear space exploration series, Galaxy Quest finds the funny in a cosmic fish-out-of-water scenario where actors must battle in space for real and pedantic nerds save they day with their obscure knowledge.");
addMovie("WALL-E", "2008", "Sci-Fi", "Finding Nemo's Andrew Stanton went from deep sea to deep space for this delightfully warped trek, seen through the eyes of a trash-bot tasked with cleaning up a centuries-later Earth smothered in garbage. Evoking the distinguished charm of old silent movies, while still featuring occasional dialogue, WALL-E clings to optimism in the wake of waste.");
addMovie("Ex Machina", "2014", "Sci-Fi", "Alex Garland's intimate, close-quarters sci-fi suspense piece Ex Machina centers on a lowly programmer (Domhnall Gleeson) who gets invited to the house of his CEO (Oscar Isaac) to administer the Turing test to the CEO's latest creation -- a humanoid robot (Alicia Vikander). As a stylish and savage slow-burn thriller, Ex Machina is the perfect example of the genre taking a huge leap forward with a small-scale film.");
addMovie("Inception", "2010", "Sci-Fi", "Christopher Nolan movies won the hearts and minds of fanboys with Batman Begins and The Dark Knight, but he truly solidified his status as a filmmaker at the top of his game with 2010's Inception. A mind-bending sci-fi stunner that proved Hollywood blockbusters could still be smart while also dazzling us on a visual and visceral level, Inception is certainly one of the best films to hit, sci-fi or not, in this still young 21st century. Buoyed by a great cast (including Joseph Gordon-Levitt, Elliot Page, Tom Hardy, Ken Watanabe and Michael Caine), stunning visual effects and those rarest of Hollywood commodities -- an original and intelligent script -- Inception is a no-brainer for this list.");
addMovie("Everything Everywhere All at Once", "2022", "Sci-Fi", "Michelle Yeoh stars as a bitter laundromat owner confronted with a dimension-hopping variant of her own husband (Ke Huy Quan) and different branching destinies of her own life as she battles an entity threatening all of existence. It's a rollicking sob-fest, delighting fans with warped humor, uncanny imagination, and powerful heartache.");

addMovie("THE EXORCIST", "1973", "Horror", "You may not agree that The Exorcist is the scariest movie ever, but it probably also isn’t much of a surprise to see it at the top of our list — with a whopping 19% of all the votes cast. William Friedkin’s adaptation of the eponymous novel about a demon-possessed child and the attempts to banish said demon became the highest-grossing R-rated horror film ever and the first to be nominated for Best Picture at the Oscars (it earned nine other nominations and took home two trophies).");
addMovie("HEREDITARY", "2018", "Horror", "Writer-director Ari Aster made a huge splash with his feature directorial debut, a dark family drama about the nature of grief couched within a supernatural horror film. Toni Collette earned a spot in the pantheon of great Oscar snubs with her slowly-ratcheted-up-to-11 performance as bedeviled mother Annie, but the movie’s biggest shock came courtesy of… Well, we won’t spoil that here. Suffice it to say Hereditary struck such a nerve with moviegoers that it instantly turned Aster into a director to watch and shot up to second place on our list.");
addMovie("THE CONJURING", "2013", "Horror", "James Wan has staked out a place among the modern masters of horror, directing films like Saw, Dead Silence, Insidious, and this inspired-by-true-events chiller based on the experiences of real-life paranormal investigators Ed and Lorraine Warren. The Warrens, best known for their work on the strange case that inspired the Amityville Horror movies (which played a part in The Conjuring 2), were portrayed by Patrick Wilson and Vera Farmiga, who grounded the effective jump scares and freak-out moments with a believable world-weariness. Together, Wan and his co-leads found fresh terror in familiar genre tropes, and the end result is a sprawling cinematic universe that only continues to grow.");
addMovie("THE SHINING", "1980", "Horror", "Literally dozens of Stephen King’s novels and stories have been adapted for the big screen, and several of those films are considered classics today, like Carrie, Misery, and Pet Sematary (and that doesn’t even account for non-horror stuff like The Shawshank Redemption and Stand By Me). A marvel of set and production design and a genuinely unnerving take on the traditional haunted house story, The Shining features a host of memorable images and an iconic Jack Nicholson performance.");
addMovie("THE TEXAS CHAINSAW MASSACRE", "1974", "Horror", "While the top four movies on this list collectively garnered 42% of the total votes counted, they were followed by six films that all earned around 3% of the vote each. Texas Chainsaw’s grimy aesthetic helped lend it an air of authenticity, which made it all the more frightening (“This could actually happen, you guys!”), and the massive, menacing presence of Gunnar Hansen’s Leatherface paved the way for other brutes like Michael Myers and Jason Voorhees.");

$(document).ready(function(){
  function fetchQuote(){
    $.ajax({
      jsonp:"jsonp",
      dataType:"jsonp",
      url:"http://api.forismatic.com/api/1.0/",
      contentType: "application/jsonp",
      data: {
      lang:"en",
      method:"getQuote",
      format:'jsonp'
      },
      success: function(response) {
      var quote = response.quoteText;
      var author = response.quoteAuthor || "Unknown";

      $(".quote-text").html(quote);
      $(".quote-author").html(author);
      },
      error:function(){
        $(".quote-text").html("Failed to fetch a quote.");
      }
    });
  }

  $(".fetch-button").click(function(){
    fetchQuote();
  });
        
  fetchQuote();
});

$(document).ready(function(){
  $(window).scroll(function(){
    if ($(this).scrollTop() > 20){
      $('#scrollTopBtn').fadeIn();
    } else{
      $('#scrollTopBtn').fadeOut();
    }
  });

  $('#scrollTopBtn').click(function(){
    $('html, body').animate({scrollTop: 0}, 'slow');
  });
});