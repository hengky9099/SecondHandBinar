export const currencyToIDR = price => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(price)
    .split(','[0]);
};
