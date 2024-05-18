function successHandler(res, data) {
    res.status(200).json({
        success: true,
        data: data
    });
}

module.exports = successHandler;