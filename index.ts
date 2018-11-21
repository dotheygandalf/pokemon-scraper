const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: `https://pokemondb.net/pokedex/bulbasaur`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

const parseWhereToFind = ($) => {
  return $('.igame.lets-go-eevee').parent().next().text().split(',').map((item) => {
    return item.trim();
  });
};

rp(options)
  .then(($) => {
    console.log(parseWhereToFind($));
  })
  .catch((err) => {
    console.log(err);
  });
