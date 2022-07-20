export const thisDate = update => {
  const date = new Date(update);
  const formatDate = {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  };
  const dateString = date.toLocaleDateString('en-IE', formatDate);

  return dateString;
};
