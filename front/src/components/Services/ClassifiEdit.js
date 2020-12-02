import React from 'react';
import {
    ArrayInput,
    Edit,
    TextInput,
    SimpleFormIterator,
    required,
    SimpleForm,
    Toolbar,
    FormDataConsumer
} from 'react-admin';
import BackButton from "../BackButton/BackButton";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const ConditionalInputEntity = ({record}) => {
    return (record.nome_entidade) ?
        <TextInput label={"nome_entidade"} source='nome_entidade' validate={[required()]}/>
        : ""

}

const ConditionalInputTypeOf = ({record}) => {
    return (record.tipo_de) ?
        <div>
            <p style={{color: 'gray', marginBlockEnd: 0, marginBlockStart: 0 }}>tipo_de</p>
            <ArrayInput label="" source="tipo_de">
                <SimpleFormIterator>
                    <FormDataConsumer>
                        {({
                              formData, // The whole form data
                              scopedFormData, // The data for this item of the ArrayInput
                              getSource, // A function to get the valid source inside an ArrayInput
                              ...rest
                          }) => <TextInput label={{...rest}.id.split('[')[1].split(']')} source={{...rest}.id}/> //ajeitar
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
        </div>
        : ""

}

const ConditionalInputRelatedWith = ({record}) => {
    return (record.relacionado_a) ?
        <div>
        <p style={{color: 'gray', marginBlockEnd: 0, marginBlockStart: 0 }}>relacionado_a</p>
        <ArrayInput label="" source="relacionado_a">
            <SimpleFormIterator>
                <FormDataConsumer>
                    {({
                          formData, // The whole form data
                          scopedFormData, // The data for this item of the ArrayInput
                          getSource, // A function to get the valid source inside an ArrayInput
                          ...rest
                      }) => <TextInput label={{...rest}.id.split('[')[1].split(']')} source={{...rest}.id}/>
                    }
                </FormDataConsumer>
            </SimpleFormIterator>
        </ArrayInput>
        </div>
        : ""

}

const ConditionalInputNamesServices = ({record}) => {
    return (record.nomes_servicos_completos) ?
        <div>
        <p style={{color: 'gray', marginBlockEnd: 0, marginBlockStart: 0 }}>nomes_servicos_completos</p>
        <ArrayInput label="" source="nomes_servicos_completos">
            <SimpleFormIterator>
                <FormDataConsumer>
                    {({
                          formData, // The whole form data
                          scopedFormData, // The data for this item of the ArrayInput
                          getSource, // A function to get the valid source inside an ArrayInput
                          ...rest
                      }) => <TextInput label={{...rest}.id.split('[')[1].split(']')} source={{...rest}.id} validate={[required()]}/>
                    }
                </FormDataConsumer>
            </SimpleFormIterator>
        </ArrayInput>
        </div>
        : ""

}

const ConditionalInputSection = ({record}) => {
    return (record.section) ?
        <div>
        <p style={{color: 'gray', marginBlockEnd: 0, marginBlockStart: 0 }}>section</p>
        <ArrayInput label="" source="section">
            <SimpleFormIterator>
                <FormDataConsumer>
                    {({
                          formData, // The whole form data
                          scopedFormData, // The data for this item of the ArrayInput
                          getSource, // A function to get the valid source inside an ArrayInput
                          ...rest
                      }) => <TextInput label={{...rest}.id.split('[')[1].split(']')} source={{...rest}.id}/>
                    }
                </FormDataConsumer>
            </SimpleFormIterator>
        </ArrayInput>
        </div>
        : ""

}

const ClassifiTitle = ({record}) => {

    return <span>Editando {record.nome_entidade}</span> //retornando um componente html

}

const TopToolBar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <BackButton
            color='secondary'
        >
            Voltar
        </BackButton>
    </Toolbar>
);

const ClassifiEdit = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Edit title={<ClassifiTitle/>} actions={(isSmall) ? <BackButton color='secondary'>Voltar</BackButton>
            : <TopToolBar/>} {...props}>
            <SimpleForm>
                <ConditionalInputEntity/>
                <ConditionalInputNamesServices/>
                <ConditionalInputTypeOf/>
                <ConditionalInputRelatedWith/>
                <ConditionalInputSection/>
            </SimpleForm>
        </Edit>
    )
}

export default ClassifiEdit;
