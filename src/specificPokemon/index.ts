import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

var pokemonList = require('../../build/pokemonList.json');

import {
  parseWhereToFind
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
        const pokemonProperties = {
          evolutions: (() => {
            const evolutions = [];
            $('.infocard-list-evo .infocard').each((index, element) => {
              const name = $(element).find('.ent-name').text();

              if(name === '') {
                const level = $(element).find('small').text();
                evolutions[index - 1].level = level.match(/\d+/)[0];
              }

              const types = [];
              $(element).find('.itype').each((index, element) => {
                types.push($(element).text());
              });
              evolutions.push({
                name,
                types
              });
            });
            return evolutions.filter((item) => {
              return item.name;
            });
          })(),
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