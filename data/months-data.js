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

const MONTHS_SORT_DATA = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getAllMonths = (type = "long") => {
  let resultArr = [];
  if (type === "shortened") resultArr = MONTHS_SORT_DATA;
  if (type === "long") resultArr = MONTHS_DATA;
  return resultArr;
};

const getMonthByIndex = (i, type = "long") => {
  let monthsArr = MONTHS_DATA;
  if (type === "shortened") monthsArr = MONTHS_SORT_DATA;
  if (type === "long") monthsArr = MONTHS_DATA;
  return monthsArr.find((e, idx) => i === idx);
};

export { getAllMonths, getMonthByIndex };
