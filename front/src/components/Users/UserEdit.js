import React from 'react'
import {Edit, SimpleForm, TextInput, required, Toolbar} from 'react-admin'
import BackButton from "../BackButton/BackButton";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

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

const UserTitle = ({record}) => {

return <span>Editando {record.nome}</span> //retornando um componente html

}

const UserEdit = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return(

    <Edit title= {<UserTitle/>} actions={(isSmall)? <BackButton color='secondary'>Voltar</BackButton>
        : <TopToolBar/>}{...props}>

            <SimpleForm>

                <TextInput label="Nome" source='nome' validate={[required()]}/>
                <TextInput label="Email" source='email' validate={[required()]}/>

            </SimpleForm>

        </Edit>
    )
}

export default UserEdit
