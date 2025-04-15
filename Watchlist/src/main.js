import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('main.js').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    <div id="trending-section">
      <h2>Trending Movies</h2>
      <div class="placeholder"></div>
    </div>
    <div id="latest-section">
      <h2>Latest Movies</h2>
      <div class="placeholder"></div>
    </div>
    <div>
      <input id="item-input" type="text" placeholder="Search for movies..." />
      <button id="search-button">Search</button>
      <ul id="results-list"></ul>
    </div>
    <div>
      <h2>Watchlist</h2>
      <ul id="watchlist"></ul>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))

// DOM Elements
const searchInput = document.getElementById('item-input');
const searchButton = document.getElementById('search-button');
const resultsList = document.getElementById('results-list');
const watchlist = document.getElementById('watchlist');
const trendingSection = document.querySelector('#trending-section .placeholder');
const latestSection = document.querySelector('#latest-section .placeholder');

// Sample data for trending and latest movies
const trendingMovies = ['Ghost Writer', 'King Horror', 'Hercules'];
const latestMovies = ['The New Dawn', 'Mystic River', 'Shadow Realm'];

// Function to display trending movies
function displayTrendingMovies() {
  trendingSection.innerHTML = trendingMovies
    .map(movie => `<div class="movie-item">${movie}</div>`)
    .join('');
}

// Function to display latest movies
function displayLatestMovies() {
  latestSection.innerHTML = latestMovies
    .map(movie => `<div class="movie-item">${movie}</div>`)
    .join('');
}

// Function to handle search
function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    resultsList.innerHTML = `<li>Searching for "${query}"...</li>`;
    // Simulate search results
    setTimeout(() => {
      resultsList.innerHTML = `
        <li>${query} - Result 1</li>
        <li>${query} - Result 2</li>
        <li>${query} - Result 3</li>
        <button onclick="addToWatchlist('${query} - Result 1')">Add to Watchlist</button>
      `;
    }, 1000);
  } else {
    resultsList.innerHTML = '<li>Please enter a search term.</li>';
  }
}

// Function to add a movie to the watchlist
function addToWatchlist(movie) {
  const listItem = document.createElement('li');
  listItem.textContent = movie;
  watchlist.appendChild(listItem);
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);

// Initialize placeholders
displayTrendingMovies();
displayLatestMovies();
