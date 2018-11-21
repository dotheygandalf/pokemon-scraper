import * as fs from 'fs';
import * as path from 'path';

import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

import paths from '../../paths';

var pokemonList = require('../../build/pokemonList.json');

import {
  parseMoves,
  parseWhereToFind,
  parseEvolutions,
  parseTms
} from './parsers';
import { promises } from 'fs';

const getPokemonData = (pokemon) => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: pokemon.url,
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
          // evolutions: parseEvolutions($),
          locations: parseWhereToFind($)
        };
        resolve({...pokemon, ...pokemonProperties});
      })
      .catch((err) => {
        console.log(`error processing: ${pokemon.name}`);
      });
  });
};

export const getAllPokemonData = () => {
  const pokemonDetailPromises = pokemonList.map((pokemon) => {
    return new Promise((resolve, reject) => {
      getPokemonData(pokemon).then((res) => {
        resolve(res);
      });
    });
  });

  Promise.all(pokemonDetailPromises).then((pokemonList) => {
    var dir = path.join(paths.basePath, 'build');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile(path.join(paths.basePath, 'build', 'pokemonListWithDetails.json'), JSON.stringify(pokemonList, null, 2), () => {
      console.log('Successfully written pokemon list file');
    });
  })

};