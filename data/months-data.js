const MONTHS_DATA = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getAllMonths = () => {
  return MONTHS_DATA;
};

const getMonthByIndex = i => {
  return MONTHS_DATA.filter((e, idx) => i === idx);
};

export { getAllMonths, getMonthByIndex };
