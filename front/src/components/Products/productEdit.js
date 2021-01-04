import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    Toolbar,
    SaveButton,
    NumberInput
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import BackButton from "../BackButton";
import {useMediaQuery} from "@material-ui/core";


const ResultName = ({record}) => {
    return <span>Verificação do produto</span>;
};


const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const imageDesktop = {
    padding: '14px 6px 4px',
    height: '55vh',
    cursor: 'pointer'
}

const imageMobile = {
    padding: '14px 6px 4px',
    height: '45vh',
    width: '88vw',
    cursor: 'pointer'
}

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton label="Salvar"/>
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

export const ProductEdit = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <Edit title={<ResultName/>} actions={(isSmall)? <BackButton color='secondary'>Voltar</BackButton>
                                                  : <TopToolBar/>} {...props}>
        <SimpleForm redirect="list" toolbar={<CustomToolbar/>}>
            <TextInput source="name" label="Nome do produto"/>
            <TextInput source="description" label="Descrição"/>
            <TextInput source="tecnicalInformation" label="Informações Técnicas"/>
            <NumberInput source="price" label="Preço"/>
            <TextInput source="category" label="Categoria"/>
        </SimpleForm>
    </Edit>
);
}
