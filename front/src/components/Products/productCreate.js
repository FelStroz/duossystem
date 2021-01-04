import * as React from "react";
import {
    Create,
    SimpleForm,
    Toolbar,
    SaveButton,
    ImageInput,
    TextInput,
    NumberInput,
    ImageField
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
        <SaveButton label="Criar"/>
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

export const ProductCreate = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Create title="Criar Produto" actions={(isSmall) ? <BackButton color='secondary'>Voltar</BackButton>
            : <TopToolBar/>} {...props}>
            <SimpleForm toolbar={<CustomToolbar/>} redirect="edit">
                <TextInput source="name" label="Nome do produto"/>
                <TextInput source="description" label="Descrição"/>
                <TextInput source="tecnicalInformation" label="Informações Técnicas"/>
                <NumberInput source="price" label="Preço"/>
                <TextInput source="category" label="Categoria"/>
                <ImageInput maxSize={20000000} source="photo"
                            label="Foto do Produto" accept="image/*"
                            placeholder={
                                <p style={{fontSize: '0.8em', color: 'gray'}}>
                                    Clique aqui para tirar ou escolher uma foto...
                                </p>
                            }
                >
                    <ImageField source="src" title="title"/>
                </ImageInput>
            </SimpleForm>
        </Create>
    );
}
