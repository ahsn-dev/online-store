export const formatPrice = (price: number): string => {
  return price?.toLocaleString();
};

export const formatPriceFa = (price: number): string => {
  const formatter = new Intl.NumberFormat("fa-IR");
  return formatter.format(price);
};
