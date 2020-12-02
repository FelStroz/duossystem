import React from 'react';
import {Create, SimpleForm, TextInput, PasswordInput, required, Toolbar } from 'react-admin';
import BackButton from "../BackButton/BackButton";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const TopToolBar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <BackButton
            color='secondary'
        >
            Voltar
        </BackButton>
    </Toolbar>
);

const UserCreate = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return(
            <Create title='Criar Usuário'{...props} actions={(isSmall)? <BackButton color='secondary'>Voltar</BackButton>
                : <TopToolBar/>}>
                <SimpleForm>

                    <TextInput label="Nome" source='nome' validate={[required()]}/>
                    <TextInput multiline label="Email" source='email' validate={[required()]}/>
                    <PasswordInput label="Senha" source="password" validate={[required()]} />

                </SimpleForm>
            </Create>
    )
}

export default UserCreate
