export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const formatPeriod = (period) => {
  const periods = {
    '2h': '2 Hours',
    'day': '24 Hours',
    'week': '7 Days',
    'month': '30 Days'
  };
  return periods[period] || period;
};