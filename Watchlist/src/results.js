import './style.css'; // Corrected the path to the CSS file

// DOM Elements
const resultsList = document.getElementById('results-list');
const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []; // Load watchlist from localStorage

// OMDB API Base URL
const API_URL = 'https://www.omdbapi.com/?apikey=465bcc93';

// Function to fetch movies from the API
async function fetchMovies(query) {
  try {
    console.log(`Fetching movies for query: ${query}`); // Debugging
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log('API Response:', data); // Debugging
    if (data.Response === 'True') {
      return data.Search; // Return the array of movies
    } else {
      console.error('No movies found:', data.Error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Function to add a movie to the watchlist
function addToWatchlist(movie) {
  if (watchlist.some((item) => item.imdbID === movie.imdbID)) {
    alert('This movie is already in your watchlist.');
    return;
  }
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Save watchlist to localStorage
  alert(`${movie.Title} has been added to your watchlist.`);
}

// Function to display search results
async function displaySearchResults() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');

  if (!query) {
    resultsList.innerHTML = '<li>No search query provided.</li>';
    return;
  }

  resultsList.innerHTML = '<li>Loading...</li>'; // Show loading message
  const movies = await fetchMovies(query);

  if (movies.length > 0) {
    resultsList.innerHTML = ''; // Clear previous results
    movies.forEach((movie) => {
      const li = document.createElement('li');
      li.classList.add('search-result-item');
      li.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : '/images/placeholder.png'}" alt="${movie.Title}" />
        <div class="details">
          <h3>${movie.Title}</h3>
          <p class="rating">⭐ ${movie.Year}</p>
          <button class="add-to-watchlist">Add to Watchlist</button>
          <a href="/details.html?id=${movie.imdbID}" class="view-details">View Details</a>
        </div>
      `;
      li.querySelector('.add-to-watchlist').addEventListener('click', () => addToWatchlist(movie));
      resultsList.appendChild(li);
    });
  } else {
    resultsList.innerHTML = `<li>No movies found for "${query}".</li>`;
  }
}

// Initialize
displaySearchResults();
