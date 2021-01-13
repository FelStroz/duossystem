module.exports = {
    showOne: (plate, res) => {
        res.status(200).json(one(plate));
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
};

function one({_id: id, licensePlate, client}) {
    return {
        data: {
            id,
            licensePlate,
            client,
        }
    }
}
