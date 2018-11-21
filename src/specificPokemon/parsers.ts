
export const parseWhereToFind = ($) => {
  return $('.igame.lets-go-eevee').parent().next().text().split(',').map((item) => {
    return item.trim();
  });
};