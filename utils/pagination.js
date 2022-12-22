function Pagination(_page, _limit, { defaultLimit = 20, itemKeyName }) {
  const limit = _limit ? +_limit : defaultLimit;
  const page = _page;
  const skip = _page ? (_page - 1) * limit : 0;
  const itemsKeyName = itemKeyName;

  const getPagination = () => ({ limit, skip });

  const getPagingData = (count, rows) => {
    const currentPage = page;
    const totalPages = Math.ceil(count / limit);

    return {
      totalItems: count,
      [itemsKeyName]: rows,
      totalPages,
      currentPage,
    };
  };

  return { getPagination, getPagingData };
}

export default Pagination;
