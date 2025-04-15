const API_URL = 'https://api.omdbapi.com/movies'; // Replace with your API URL

document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('item-input').value;
  if (!query) return;

  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = '<li>Loading...</li>';

  try {
    const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    resultsList.innerHTML = '';
    data.results.forEach((movie) => {
      const li = document.createElement('li');
      li.textContent = movie.title;

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Watchlist';
      addButton.classList.add('add-to-watchlist');
      addButton.addEventListener('click', () => addToWatchlist(movie.title));

      li.appendChild(addButton);
      resultsList.appendChild(li);
    });
  } catch (error) {
    resultsList.innerHTML = '<li>Error fetching movies. Please try again.</li>';
  }
});

function addToWatchlist(title) {
  const watchlist = document.getElementById('watchlist');
  const li = document.createElement('li');
  li.textContent = title;
  watchlist.appendChild(li);
}
