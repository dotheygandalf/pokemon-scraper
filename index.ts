const rp = require('request-promise');
const cheerio = require('cheerio');

const parsers = require('./src/parsers');

const options = {
  uri: `https://pokemondb.net/pokedex/bulbasaur`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log(parsers.parseWhereToFind($));
  })
  .catch((err) => {
    console.log(err);
  });
