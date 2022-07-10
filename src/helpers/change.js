export const currencyToIDR = price => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(price)
    .split(',')[0];
};

export const thisDate = updated => {
  return new Date(updated).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: `2-digit`,
  });
};
