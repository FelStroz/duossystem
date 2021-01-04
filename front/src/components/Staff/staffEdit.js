import * as React from "react";
import {
    Edit,
    TextInput,
    Toolbar,
    SaveButton,
    DeleteButton,
    required,
    DateInput,
    ArrayInput,
    SelectInput,
    SimpleFormIterator,
    NumberInput,
    TabbedForm,
    FormTab,
    minValue,
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import BackButton from "../BackButton";
import {InputAdornment, useMediaQuery} from "@material-ui/core";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SimpleBar from "simplebar-react";

const CategoryName = ({record}) => {
    return <span>Editar {record.name}</span>;
};

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton label="Salvar" submitOnEnter={true} />
        <DeleteButton resource="staff" undoable={true}/>
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

const choices = [
    {id: 'Ativo', name: 'Ativo'},
    {id: 'Demitido', name: 'Demitido'}
];

export const StaffEdit = ({permissions, ...props}) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <SimpleBar style={{maxHeight: '100%'}}>

        <Edit undoable={false} title={<CategoryName/>} actions={(isSmall) ? <BackButton color='secondary'>Voltar</BackButton>
            : <TopToolBar/>} {...props}>
            <TabbedForm style={{ width: "100%" }} centered={true} redirect="list" toolbar={<CustomToolbar/>}>
                <FormTab label="Informações Pessoais">
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginTop: '10px',
                        marginBottom: '10px',
                    }}
                >
                    Nome Completo
                </p>
                <TextInput label=" " source="name" validate={[required()]}/>
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                    }}
                >
                    Cargo
                </p>
                <TextInput label=" " source="profession" validate={[required()]}/>
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '15px',
                    }}
                >
                    Telefone
                </p>
                <TextInput label=" " source="phone" validate={[required()]}/>
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                    }}
                >
                    Data de Nascimento
                </p>
                <DateInput label=" " source="birthday" validate={[required()]}/>
                    <p
                        style={{
                            color: 'rgba(0, 0, 0, 0.54)',
                            padding: 0,
                            fontSize: '0.85rem',
                            fontFamily: "Helvetica",
                            fontWeight: 400,
                            lineHeight: 1,
                            letterSpacing: '0.00938em',
                            marginBottom: '10px',
                        }}
                    >
                        Status
                    </p>
                    <SelectInput label="Status" source="actualStatus" choices={choices}
                                 optionText="name"/>
                </FormTab>
                <FormTab label="Financeiro">
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                        marginTop: '10px'
                    }}
                >
                    Gastos
                </p>
                <ArrayInput label=" " source="spending">
                    <SimpleFormIterator addButton={<LibraryAddIcon cursor={'pointer'}/>} removeButton={<DeleteForeverIcon cursor={'pointer'} />}>
                        <NumberInput label="Valor" source="value" validate={[required(), minValue(0)]} min={0} InputProps={{
                            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        }} />
                        <TextInput label="Razão" source="reason" validate={[required()]}/>
                    </SimpleFormIterator>
                </ArrayInput>
                </FormTab>
                <FormTab label="Presença">
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                        marginTop: '10px'
                    }}
                >
                    Faltas
                </p>
                <ArrayInput label=" " source="fouls">
                    <SimpleFormIterator addButton={<LibraryAddIcon cursor={'pointer'}/>} removeButton={<DeleteForeverIcon cursor={'pointer'} />}>
                        <DateInput label="Data da Falta" source="date" validate={[required()]}/>
                        <TextInput label="Razão" source="reason" validate={[required()]}/>
                    </SimpleFormIterator>
                </ArrayInput>
                </FormTab>
            </TabbedForm>
        </Edit>
        </SimpleBar>
    );
}
