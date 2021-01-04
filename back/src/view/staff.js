module.exports = {
    created: ({name, profession, actualStatus, creationDate}, status, res) => {
        res.status(201).json({
            status: status,
            data: {
                name,
                profession,
                actualStatus,
                creationDate
            }
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map((staff) => {
                return one(staff).data
            }),
            total
        });
    },
    showOne: (staff, res) => {
        res.status(200).json(one(staff));
    },
    showUpdated: (staff, status, res) => {
        res.status(200).json({
            status: status,
            data: one(staff).data
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

function one({_id: id, name, birthday, spending, fouls, phone, profession, actualStatus, creationDate}) {
    return {
        data: {
            id,
            name,
            birthday,
            spending,
            fouls,
            phone,
            profession,
            actualStatus,
            creationDate
        }
    }
}
