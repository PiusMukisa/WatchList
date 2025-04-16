import './style.css'; // Corrected the path to the CSS file

// DOM Elements
const movieDetailsContainer = document.getElementById('movie-details');

// OMDB API Base URL
const API_URL = 'https://www.omdbapi.com/?apikey=465bcc93';

// Function to fetch movie details from the API
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(`${API_URL}&i=${encodeURIComponent(imdbID)}`);
    const data = await response.json();
    if (data.Response === 'True') {
      return data; // Return the movie details
    } else {
      console.error('No movie details found:', data.Error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Function to display movie details
async function displayMovieDetails() {
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get('id');

  if (!imdbID) {
    movieDetailsContainer.innerHTML = '<p>No movie ID provided.</p>';
    return;
  }

  movieDetailsContainer.innerHTML = '<p>Loading...</p>'; // Show loading message
  const movie = await fetchMovieDetails(imdbID);

  if (movie) {
    movieDetailsContainer.innerHTML = `
      <div class="movie-details-card">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : '/images/placeholder.png'}" alt="${movie.Title}" />
        <div class="details">
          <h2>${movie.Title} (${movie.Year})</h2>
          <p><strong>Genre:</strong> ${movie.Genre}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> ⭐ ${movie.imdbRating}</p>
          <div class="trailer">
            <h3>Trailer</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed?autoplay=1&rel=0&showinfo=0" title="YouTube trailer" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    `;
  } else {
    movieDetailsContainer.innerHTML = '<p>Failed to load movie details. Please try again later.</p>';
  }
}

// Initialize
displayMovieDetails();
