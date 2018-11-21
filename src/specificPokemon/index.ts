import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

import {
  parseWhereToFind
} from './parsers';

const options = {
  uri: `https://pokemondb.net/pokedex/bulbasaur`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log(parseWhereToFind($));
  })
  .catch((err) => {
    console.log(err);
  });
