import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    Toolbar,
    SaveButton,
    DeleteButton,
    required,
    DateInput,
    Labeled,
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import BackButton from "../BackButton";
import {useMediaQuery} from "@material-ui/core";
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';

const ClientName = ({record}) => {
    return <span>Editar Cliente {record.name}</span>;
};

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton label="Salvar" submitOnEnter={true}/>
        <DeleteButton resource="clients" undoable={true}/>
    </Toolbar>
);

const TopToolBar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <BackButton
            color='secondary'
        >
            Voltar
        </BackButton>
    </Toolbar>
);

export const ClientEdit = ({ permissions, ...props }) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Edit title={<ClientName/>} actions={(isSmall)? <BackButton color='secondary'>Voltar</BackButton>
            : <TopToolBar/>} {...props}>
            <SimpleForm redirect="list" toolbar={<CustomToolbar/>}>
                <TextInput label="Nome Completo" source="name" validate={[required()]}/>
                <DateInput label="Data de Nascimento" source="birthday" validate={[required()]}/>
                <TextInput label="Telefone" source="phone" validate={[required()]}/>
                <TextInput label="Instagram" source="instagram" defaultValue="@" validate={[required()]}/>
                <TextInput label="Endereço" source="address" validate={[required()]}/>
            </SimpleForm>
        </Edit>
    );
}
