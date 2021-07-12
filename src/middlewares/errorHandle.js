const Trycatch = (f) => async (req, res, next) => {
  try {
    // console.log('try');
    await f(req, res, next)
  } catch (error) {
    next(error)
    // console.log('err handle');
    // errorHandle(error, req, res, next);
  }
}

const errorHandle = (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    error: {
      message: err.message
    }
  })
  // next();
}

module.exports = {
  errorHandle,
  Trycatch
}