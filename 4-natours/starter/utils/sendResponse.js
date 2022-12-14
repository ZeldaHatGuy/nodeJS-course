module.exports = (res, status, code, data) => {
  res.status(code).json({
    status: status,
    requestedAt: res.requestedAt,
    results: data.length,
    data: {
      data,
    },
  });
};
