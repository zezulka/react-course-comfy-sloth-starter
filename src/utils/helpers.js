const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (p) => formatter.format(p / 100);

export const getUniqueValues = (data, type) => {
  return ["all", ...new Set(data.map((p) => p[type]).flat())];
};
