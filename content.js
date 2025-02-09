const apiKey = "35432338";
const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;

// Fetch movies when content.html loads
window.onload = function () {
  fetchMovies();
};

async function fetchMovies() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (!query) return;

  document.getElementById("searchInput").value = query; // Keep last searched value

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;


  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === "False") {
    document.querySelector(".movies-container").innerHTML =
      "<p>No movies found.</p>";
    return;
  }

  document.querySelector(".movies-container").innerHTML = data.Search.map(
    (movie) => movieHTML(movie)
  ).join("");
}

// Generate movie HTML
function movieHTML(movie) {
  return `<div class="movie">
    <figure class="movie__poster-wrapper">
      <img class="movie__poster" src="${movie.Poster}" alt="Movie Poster" />
    </figure>
    <h3 class="movie__title">${movie.Title}</h3>
    <p class="movie__details">Year: ${movie.Year}</p>
  </div>`;
}

// Search function when clicking the magnifying glass
function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    window.location.href = `content.html?query=${query}`;
  }
}

// Search function when pressing "Enter"
function handleKeyPress(event) {
  if (event.key === "Enter") {
    searchMovies();
  }
}
