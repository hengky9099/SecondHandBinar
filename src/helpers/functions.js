export const textToBinary = str => {
  let res = '';
  res = str
    .split('')
    .map(char => {
      return char.charCodeAt(0).toString(2);
    })
    .join(' ');
  return res;
};
