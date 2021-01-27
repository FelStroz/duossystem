import * as React from 'react';
import { Fragment, useState } from 'react';
import {
    Button,
    Confirm,
    useUpdateMany,
    useRefresh,
    useNotify,
    useUnselectAll,
} from 'react-admin';

const PayManyButton = ({ selectedIds }) => {
    const [open, setOpen] = useState(false);
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useUpdateMany(
        'cars',
        selectedIds,
        { status: "Pago", paymentMethod: "Crédito" },
        {
            onSuccess: () => {
                refresh();
                notify('Serviços atualizados');
                unselectAll('cars');
            },
            onFailure: error => notify('Error: Serviços não atualizados', 'warning'),
        }
    );
    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleConfirm = () => {
        updateMany();
        setOpen(false);
    };

    return (
        <Fragment>
            <Button label="Marcar Pago" onClick={handleClick} />
            <Confirm
                isOpen={open}
                loading={loading}
                title="Atualizar Método de Pagamento"
                content="Você tem certeza que quer atualizar o método de pagamento dos serviços para pago?"
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </Fragment>
    );
}

export default PayManyButton;
