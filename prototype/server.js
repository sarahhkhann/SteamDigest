const express = require('express');
const fetch = require('node-fetch');
const app = express();

const apiKey = '9F8C1996E787E164C62A6FB2C317AA21'; 

// set the view engine to ejs
app.set('view engine', 'ejs');

// define route for homepage
app.get('/', (req, res) => {
  res.render('index');
});

// define route to handle search form submission
app.get('/search', async (req, res) => {
  const gameName = req.query.game_name;
  const gamePlatform = req.query.game_platform;

  // make API request to RAWG database
  const response = await fetch(`https://accujazz-rawg-video-games-database.p.rapidapi.com/games?search=${gameName}&platforms=${gamePlatform}`, {
    headers: {
      'x-rapidapi-host': 'accujazz-rawg-video-games-database.p.rapidapi.com',
      'x-rapidapi-key': apiKey,
      'useQueryString': true,
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const data = await response.json();
  const games = data.results;

  // render search results template with the game data
  res.render('search-results', { games });
});

// start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});