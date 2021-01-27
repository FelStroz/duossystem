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

const FaturadoManyButton = ({ selectedIds }) => {
    const [open, setOpen] = useState(false);
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [updateMany, { loading }] = useUpdateMany(
        'cars',
        selectedIds,
        { status: "Faturado", paymentMethod: "Faturado" },
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
            <Button label="Marcar Faturado" onClick={handleClick} />
            <Confirm
                isOpen={open}
                loading={loading}
                title="Atualizar Método de Pagamento"
                content="Você tem certeza que quer atualizar o método de pagamento dos serviços para faturado?"
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            />
        </Fragment>
    );
}

export default FaturadoManyButton;
