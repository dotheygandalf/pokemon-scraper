
export const parseWhereToFind = ($) => {
  return $('.igame.lets-go-eevee').parent().next().text().split(',').map((item) => {
    return item.trim();
  });
};

export const parseMoves = ($, element) => {
  const moves = [];
  $(element).each((index, element) => {
    const dataRows = $(element).find('tbody tr');

    dataRows.each((index, element) => {
      const dataCells = $(element).find('td');

      moves.push({
        level: parseInt($(dataCells[0]).text(), 10),
        name: $(dataCells[1]).text(),
        type: $(dataCells[2]).text(),
        category: $(dataCells[3]).prop('title'),
        power: parseInt($(dataCells[4]).text(), 10),
        accuracy: parseInt($(dataCells[5]).text(), 10)
      });
    })

  });
  return moves;
};

export const parseTms = ($, element) => {
  const moves = [];
  $(element).each((index, element) => {
    const dataRows = $(element).find('tbody tr');

    dataRows.each((index, element) => {
      const dataCells = $(element).find('td');

      moves.push({
        number: parseInt($(dataCells[0]).text(), 10),
        name: $(dataCells[1]).text(),
        type: $(dataCells[2]).text(),
        category: $(dataCells[3]).prop('title'),
        power: parseInt($(dataCells[4]).text(), 10),
        accuracy: parseInt($(dataCells[5]).text(), 10)
      });
    })

  });
  return moves;
};

export const parseEvolutions = ($) => {
  const evolutions = [];
  $('.infocard-list-evo .infocard').each((index, element) => {
    const name = $(element).find('.ent-name').text();

    if (name === '') {
      const level = $(element).find('small').text();
      evolutions[index - 1].level = parseInt(level.match(/\d+/)[0], 10);
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
};