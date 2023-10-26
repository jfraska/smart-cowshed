const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const axios = require("axios");
const FormData = require("form-data");

const getPredictModel = async (image) => {
  const file = new FormData();
  file.append("file", image, { filename: "temp.jpg" });

  const response = await axios.post(
    `http://${process.env.ML_SERVICE_HOST}/predict`,
    file,
    {
      headers: {
        ...file.getHeaders(),
      },
    }
  );

  if (!response.data) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Model error");
  }

  return response.data.prediction;
};

module.exports = {
  getPredictModel,
};
