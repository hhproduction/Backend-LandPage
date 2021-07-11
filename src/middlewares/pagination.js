const pagination = (req, res, next) => {
    const { page, size, sort } = req.query;
    req.pagination = {
        limit: parseInt(size) || 12,
        offset: parseInt(page - 1) * size || 0,
        sort: sort
    }
    next()
}
module.exports = pagination