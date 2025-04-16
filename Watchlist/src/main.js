import './style.css';

// DOM Elements
const searchInput = document.getElementById('item-input');
const searchButton = document.getElementById('new-search-button'); // Updated button ID
const resultsList = document.getElementById('results-list');
const searchResults = document.getElementById('results-list');
const watchlist = document.getElementById('watchlist');
const trendingSection = document.querySelector('#trending-section .movie-grid');
const latestSection = document.querySelector('#latest-section .movie-grid');

// OMDB API Base URL
const API_URL = 'https://www.omdbapi.com/?apikey=465bcc93';

// Function to fetch movies from the API
async function fetchMovies(query) {
  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
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

// Function to display search results
async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a search term.');
    return;
  }

  resultsList.innerHTML = '<li>Loading...</li>'; // Show loading message
  try {
    const movies = await fetchMovies(query); // Fetch movies from the API

    if (movies.length > 0) {
      resultsList.innerHTML = ''; // Clear previous results
      movies.forEach((movie) => {
        const li = document.createElement('li');
        li.classList.add('search-result-item');
        li.innerHTML = `
          <div class="movie-item">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : '/images/placeholder.png'}" alt="${movie.Title}" />
            <div class="details">
              <h3>${movie.Title}</h3>
              <p class="rating">⭐ ${movie.Year}</p>
            </div>
            <button class="add-to-watchlist">Add to Watchlist</button>
          </div>
        `;
        li.querySelector('.add-to-watchlist').addEventListener('click', () => addToWatchlist(movie));
        resultsList.appendChild(li);
      });
    } else {
      resultsList.innerHTML = `<li>No movies found for "${query}".</li>`;
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    resultsList.innerHTML = '<li>Failed to fetch search results. Please try again later.</li>';
  }
}

// Function to add a movie to the watchlist
function addToWatchlist(movie) {
  const watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
  if (watchlistItems.some((item) => item.imdbID === movie.imdbID)) {
    alert('This movie is already in your watchlist.');
    return;
  }

  watchlistItems.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlistItems));
  renderWatchlist();
}

// Function to render the watchlist
function renderWatchlist() {
  const watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.innerHTML = watchlistItems
    .map(
      (movie) => `
      <li class="watchlist-item">
        <span>${movie.Title} (${movie.Year})</span>
        <button class="remove-from-watchlist" data-id="${movie.imdbID}">Remove</button>
      </li>`
    )
    .join('');

  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-from-watchlist').forEach((button) => {
    button.addEventListener('click', (event) => {
      const imdbID = event.target.getAttribute('data-id');
      removeFromWatchlist(imdbID);
    });
  });
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(imdbID) {
  const watchlistItems = JSON.parse(localStorage.getItem('watchlist')) || [];
  const updatedWatchlist = watchlistItems.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  renderWatchlist();
}

// Function to display trending movies
async function displayTrendingMovies() {
  const movies = await fetchMovies('Avengers'); // Replace 'Avengers' with a valid search term
  if (movies.length > 0) {
    trendingSection.innerHTML = movies
      .map(
        (movie) => `
        <div class="movie-item">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : '/images/placeholder.png'}" alt="${movie.Title}" />
          <div class="details">
            <h3>${movie.Title}</h3>
            <p class="rating">⭐ ${movie.Year}</p>
          </div>
        </div>`
      )
      .join('');
  } else {
    trendingSection.innerHTML = '<div>No trending movies available.</div>';
  }
}

// Function to display latest movies
async function displayLatestMovies() {
  const movies = await fetchMovies('Batman'); // Replace 'Batman' with a valid search term
  if (movies.length > 0) {
    latestSection.innerHTML = movies
      .map(
        (movie) => `
        <div class="movie-item">
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : '/images/placeholder.png'}" alt="${movie.Title}" />
          <div class="details">
            <h3>${movie.Title}</h3>
            <p class="rating">⭐ ${movie.Year}</p>
          </div>
        </div>`
      )
      .join('');
  } else {
    latestSection.innerHTML = '<div>No latest movies available.</div>';
  }
}

// Function to handle search and redirect to results page
function handleSearchRedirect() {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a search term.');
    return;
  }
  window.location.href = `/results.html?query=${encodeURIComponent(query)}`;
}

// Event Listeners
searchButton.addEventListener('click', handleSearchRedirect);

// Initialize placeholders
displayTrendingMovies();
displayLatestMovies();

// Initialize watchlist on page load
document.addEventListener('DOMContentLoaded', () => {
  renderWatchlist();
});

