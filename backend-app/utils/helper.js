const getPagingData = (datas, page, limit) => {
  const { count: totalItems, rows: data } = datas;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { data, meta: { totalItems, totalPages, currentPage } };
};

const convertNumberTelp = (phoneNumber) => {
  phoneNumber = phoneNumber.replace(/\D/g, "");

  if (!phoneNumber.startsWith("+62") || !phoneNumber.startsWith("02")) {
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "+62" + phoneNumber.slice(1);
    } else if (phoneNumber.startsWith("62")) {
      phoneNumber = "+62" + phoneNumber.slice(2);
    }
  }

  return phoneNumber;
};

module.exports = { getPagingData, convertNumberTelp };
