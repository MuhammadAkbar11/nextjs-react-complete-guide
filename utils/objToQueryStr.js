function toQueriesToString(queries) {
  Object.keys(queries).forEach(key => {
    if (queries[key] === null) delete queries[key];
    if (queries[key] === undefined) delete queries[key];
    if (typeof queries[key] === "string" && queries[key].trim() === "")
      delete queries[key];
  });

  return Object.keys(queries)
    .map(key => {
      return `${key}=${queries[key]}`;
    })
    .join("&");
}

export default toQueriesToString;
