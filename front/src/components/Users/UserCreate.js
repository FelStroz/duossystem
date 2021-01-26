import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    Toolbar,
    SaveButton,
    required,
    BooleanInput,
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import BackButton from "../BackButton";
import {useMediaQuery} from "@material-ui/core";

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton label="Criar" submitOnEnter={true}/>
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

export const UserCreate = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Create title="Criar Usuário" actions={(isSmall) ? <BackButton color='secondary'>Voltar</BackButton>
            : <TopToolBar/>} {...props}>
            <SimpleForm redirect="list" toolbar={<CustomToolbar/>}>
                <TextInput source="name" validate={[required()]}/>
                <TextInput source="email" validate={[required()]}/>
                <PasswordInput source="password" validate={[required()]}/>
                <BooleanInput label="Administrador" source="idAdmin"/>
            </SimpleForm>
        </Create>
    );
}
