module.exports = {
    created: ({name, instagram, firstTime}, status, res) => {
        res.status(201).json({
            status: status,
            data: {
                name,
                instagram,
                firstTime
            }
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map((client) => {
                return one(client).data
            }),
            total
        });
    },
    showOne: (client, res) => {
        res.status(200).json(one(client));
    },
    showUpdated: (client, status, res) => {
        res.status(200).json({
            status: status,
            data: one(client).data
        });
    },
    showDeleted: ({_id}, status, res) => {
        res.status(200).json({
            status: status,
            data: {
                id: _id
            }
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
    message: (status, message, res) => {
        res.status(200).json({
            feedback: {
                status: status,
                message: message
            }
        });
    },
};

function one({_id: id, name, birthday, instagram, phone, address, services, firstTime, updatedAt}) {
    return {
        data: {
            id,
            name,
            birthday,
            instagram,
            phone,
            address,
            services,
            firstTime,
            updatedAt,
        }
    }
}
