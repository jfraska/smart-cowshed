const getPagingData = (datas, page, limit) => {
  const { count: totalItems, rows: data } = datas;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { data, meta: { totalItems, totalPages, currentPage } };
};

module.exports = getPagingData;
