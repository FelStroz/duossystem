module.exports = {
    showTotal: ({totalPayed, totalServices, services}, status, res) => {
        res.status(200).json({
            totalPayed,
            totalServices,
            services
        });
    },
    error: (error = {}, code, status, res) => {
        let {message, _message} = error;
        res.status(code).json({
            status: status,
            error: {
                message: _message,
                completeMessage: message
            }
        });
    },
}
