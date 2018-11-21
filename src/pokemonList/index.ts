import * as fs from 'fs';
import * as path from 'path';

import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

import paths from '../../paths';

export const getPokemonList = () => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: `https://pokemondb.net/pokedex/game/lets-go-pikachu-eevee`,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    rp(options)
      .then(($) => {
        const pokemons = [];
        $('.ent-name').each((index, element) => {
          pokemons.push({
            number: index + 1,
            name: $(element).text()
          });
        });
        resolve(pokemons);2
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const writePokemonList = () => {
  getPokemonList().then((pokemons) => {
    var dir = path.join(paths.basePath, 'build');

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFile(path.join(paths.basePath, 'build', 'pokemonList.json'), JSON.stringify(pokemons, null, 2), () => {
      console.log('Successfully written pokemon list file');
    });
  });
};