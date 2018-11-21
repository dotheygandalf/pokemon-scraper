import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

var pokemonList = require('../../build/pokemonList.json');

import {
  parseMoves,
  parseWhereToFind,
  parseEvolutions,
  parseTms
} from './parsers';

const getPokemonData = (pokemon) => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: `https://pokemondb.net/pokedex/${pokemon.name}`,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(($) => {
        const tables = [];
        $('#tab-moves-17 table').each((index, element) => {
          tables.push($(element));
        });

        const pokemonProperties = {
          moves: parseMoves($, tables[0]),
          tms: parseTms($, tables[1]),
          evolutions: parseEvolutions($),
          locations: parseWhereToFind($)
        };
        resolve({...pokemon, ...pokemonProperties});
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const getAllPokemonData = () => {
  const pokemon = pokemonList[0];
  getPokemonData(pokemon).then((res) => {
    console.log(JSON.stringify(res, null, 2));
  });
};