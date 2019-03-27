
// Api Handler
const _apiHandler = (res, data, message = 'Success') => {
  if (data && data.isBoom && data.isBoom === true) {
    const error = data.output.payload;
    const statusCode = data.output.statusCode;
    if (data.data != null) {
      error.data = data.data;
    }
    res.status(statusCode).json(error);
  } else {
    const response = {
      statusCode: 200,
      message,
      data,
    };
    res.status(200).json(response);
  }
}

module.exports = {
  _apiHandler
}