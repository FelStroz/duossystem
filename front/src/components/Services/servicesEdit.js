import * as React from "react";
import {Edit, SimpleForm, SelectInput, required, Toolbar, SaveButton} from 'react-admin';
import makeStyles from "@material-ui/core/styles/makeStyles";

const choices = [
    {id: 'Faturado', name: 'Faturado'},
    {id: 'Pago', name: 'Pago'},
    {id: 'Em aberto', name: 'Em aberto', not_available: true},
    {id: 'Atrasado', name: 'Atrasado'}
];

const paymentMethods = [
    {id: 'Crédito', name: 'Crédito'},
    {id: 'Débito', name: 'Débito'},
    {id: 'Dinheiro', name: 'Dinheiro'},
    {id: 'Faturado', name: 'Faturado'},
    {id: 'A definir', name: 'A definir', not_available: true},
];

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton />
    </Toolbar>
);

export const ServiceEdit = props => {
    return (
        <Edit {...props}>
            <SimpleForm toolbar={<CustomToolbar />} redirect="list">
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                    <SelectInput label="Status" source="status" choices={choices}
                                 optionText="name" initialValue="Em aberto" disableValue="not_available"/>
                    <SelectInput label="Pagamento" source="paymentMethod" choices={paymentMethods}
                                 optionText="name" validate={[required()]} initialValue="A definir" disableValue="not_available"/>
                </div>
            </SimpleForm>
        </Edit>
    );
}
