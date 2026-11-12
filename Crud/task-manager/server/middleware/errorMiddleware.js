const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Invalid resource ID"
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

export default errorMiddleware