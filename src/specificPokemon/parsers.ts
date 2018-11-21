
export const parseWhereToFind = ($) => {
  return $('.igame.lets-go-eevee').parent().next().text().split(',').map((item) => {
    return item.trim();
  });
};

export const parseEvolutions = ($) => {
  const evolutions = [];
  $('.infocard-list-evo .infocard').each((index, element) => {
    const name = $(element).find('.ent-name').text();

    if (name === '') {
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
};