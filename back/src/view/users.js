module.exports = {
    created: ({_id, name, email, creationDate, isAdmin}, status, res) => {
        res.status(201).json({
            status: status,
            data: {
                id: _id,
                name,
                email,
                isAdmin,
                creationDate
            }
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map((user) => {
                return one(user).data
            }),
            total
        });
    },
    showOne: (user, res) => {
        res.status(200).json(one(user));
    },
    showUpdated: (user, status, res) => {
        res.status(200).json({
            status: status,
            data: one(user).data
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
    logged: ({name, email, isAdmin, authToken}, res) => {
        res.status(200).json(one({name, email, isAdmin, authToken}));
    }
};

function one({_id: id, name, email, password, token, isAdmin, authToken, creationDate}) {
    return {
        data: {
            id,
            name,
            email,
            password,
            isAdmin,
            token,
            authToken,
            creationDate
        }
    }
}
