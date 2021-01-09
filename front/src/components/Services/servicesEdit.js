import * as React from "react";
import {Edit, SimpleForm, SelectInput, TextInput} from 'react-admin';
import {useMediaQuery} from "@material-ui/core";

const choices = [
    {id: 'Faturado', name: 'Faturado'},
    {id: 'Pago', name: 'Pago'},
    {id: 'Em aberto', name: 'Em aberto', not_available: true},
    {id: 'Atrasado', name: 'Atrasado'}
];

export const ServiceEdit = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Edit {...props}>
            <SimpleForm redirect="list">
                <SelectInput label="Status" source="status" choices={choices}
                             optionText="name" initialValue="Em aberto" disableValue="not_available"/>
            </SimpleForm>
        </Edit>
    );
}
