module.exports = {
  success: (res, data, message) => {
    res.status(200).json({
      data,
      message,
    });
  },
  successWithPagination: (res, data, pagination, message) => {
    res.status(200).json({
      data,
      pagination,
      message,
    });
  },
  failed: (res, error, message) => {
    res.status(400).json({
      data: null,
      error,
      message,
    });
  },
  successAuth: (res, data, token, message) => {
    res.status(200).json({
      data,
      token,
      message,
    });
  },
  forbidden: (res, error) => {
    res.status(403).json({
      data: null,
      error,
      message: 'Forbidden',
    });
  },
  notFound: (res, error) => {
    res.status(404).json({
      data: null,
      error,
      message: 'Not found',
    });
  },
  unauthorized: (res, error) => {
    res.status(401).json({
      data: null,
      error,
      message: 'Unauthorized',
    });
  },
  internalError: (res, error) => {
    res.status(500).json({
      data: null,
      error,
      message: 'Internal server error',
    });
  },
};
