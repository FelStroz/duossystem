module.exports = {
    created: ({_id: id, date, service, licensePlate, protocol}, status, res) => {
        res.status(201).json({
            data: {
                id,
                protocol,
                service,
                licensePlate,
                date
            }
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map((service) => {
                return one(service).data
            }),
            total
        });
    },
    showOne: (service, res) => {
        res.status(200).json(one(service));
    },
    showUpdated: (service, status, res) => {
        res.status(200).json({
            status: status,
            data: one(service).data
        });
    },
    showDeleted: ({_id, status}, statuss, res) => {
        res.status(200).json({
            status: statuss,
            data: {
                id: _id,
                status
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

function one({_id: id, client, date, service, paymentMethod, status, licensePlate, carBrand, protocol, color, observation, discount, nameClient, createdAt, updatedAt}) {
    return {
        data: {
            id,
            client,
            date,
            service,
            paymentMethod,
            status,
            licensePlate,
            carBrand,
            protocol,
            color,
            observation,
            discount,
            nameClient,
            createdAt,
            updatedAt,
        }
    }
}
