export const currencyFormatter = (data) => {
  return ((data.amount * 100) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
export const currencyFormatter1 = (data) => {
  return ((data.amount * 100) / 10000).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
