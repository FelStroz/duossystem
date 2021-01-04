import React from 'react';
import {
    Create,
    DateInput,
    TextInput,
    SimpleForm,
    required,
    SelectInput,
    NumberInput, ArrayInput, SimpleFormIterator, minValue, AutocompleteInput, ReferenceInput
} from 'react-admin';
import {useLocation} from 'react-router';
// import PostReferenceInput from './PostReferenceInput';
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {InputAdornment} from "@material-ui/core";

const today = new Date();

const choices = [
    {id: 'Crédito', name: 'Crédito'},
    {id: 'Débito', name: 'Débito'},
    {id: 'Dinheiro', name: 'Dinheiro'},
];

const services = [
    {id: 'Lavagem Completa', name: 'Lavagem Completa'},
    {id: 'Lavagem de Banco', name: 'Lavagem de Banco'},
    {id: 'Vidrificação', name: 'Vidrificação'},
];

const CommentCreate = props => {
    // Read the post_id from the location
    const location = useLocation();
    const id =
        location.state && location.state.record
            ? location.state.record.id
            : undefined;
    const redirect = id ? `/clients/${id}/show` : false;

    return (
        <Create {...props}>
            <SimpleForm
                defaultValue={{id}}
                redirect={redirect}
            >

                <ReferenceInput label="Placa do Carro" source="id" reference="cars" allowEmpty>
                    <AutocompleteInput optionText="licensePlate" />
                </ReferenceInput>
                {/*<AutocompleteInput*/}
                {/*    source="licensePlate"*/}
                {/*    reference="cars"*/}
                {/*    allowEmpty*/}
                {/*    validate={required()}*/}
                {/*    perPage={10000}*/}
                {/*/>*/}

                {/*<div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: '15px'}}>*/}
                {/*    <TextInput label="Marca" source="carBrand"  validate={[required()]} />*/}
                {/*    <TextInput label="Cor" source="color" validate={[required()]} style={{marginLeft:'50px'}} />*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: '15px'}}>*/}
                {/*    <SelectInput label="Método de Pagamento" source="paymentMethod" choices={choices}*/}
                {/*                 optionText="name" validate={[required()]} />*/}
                {/*    <DateInput label="Data do Atendimento" source="date" validate={[required()]} style={{marginLeft:'50px'}}/>*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: '15px'}}>*/}
                {/*    <ArrayInput label=" " source="service" style={{marginLeft:'50px'}}>*/}
                {/*        <SimpleFormIterator addButton={<LibraryAddIcon cursor={'pointer'}/>} removeButton={<DeleteForeverIcon cursor={'pointer'} />}>*/}
                {/*            <NumberInput label="Valor" source="price" validate={[required(), minValue(0)]} min={0} InputProps={{*/}
                {/*                startAdornment: <InputAdornment position="start">R$</InputAdornment>,*/}
                {/*            }} />*/}
                {/*            <SelectInput label="Serviços" source="service" choices={services}*/}
                {/*                         optionText="name" validate={[required()]}/>*/}
                {/*        </SimpleFormIterator>*/}
                {/*    </ArrayInput>*/}
                {/*</div>*/}
                {/*<div style={{display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: '15px'}}>*/}
                {/*    <TextInput label="Observação" source="observation" validate={[required()]}/>*/}
                {/*    <NumberInput min={0} max={100} source="discount" validate={[required()]} style={{marginLeft:'50px'}}/>*/}
                {/*</div>*/}
                {/*    <TextInput label="Marca" source="carBrand"  validate={[required()]} />*/}
                {/*    <TextInput label="Cor" source="color" validate={[required()]} style={{marginLeft:'50px'}} />*/}
                <SelectInput label="Método de Pagamento" source="paymentMethod" choices={choices}
                             optionText="name" validate={[required()]}/>
                <DateInput label="Data do Atendimento" source="date" validate={[required()]}
                />
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
                    Serviços
                </p>
                <ArrayInput label=" " source="service">
                    <SimpleFormIterator addButton={<LibraryAddIcon cursor={'pointer'}/>}
                                        removeButton={<DeleteForeverIcon cursor={'pointer'}/>}>
                        <NumberInput label="Valor" source="price" validate={[required(), minValue(0)]} min={0}
                                     InputProps={{
                                         startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                     }}/>
                        <SelectInput label="Serviços" source="service" choices={services}
                                     optionText="name" validate={[required()]}/>
                    </SimpleFormIterator>
                </ArrayInput>
                <TextInput label="Observação" source="observation" validate={[required()]}/>
                <NumberInput min={0} max={100} label="Desconto" source="discount" validate={[required()]} />
            </SimpleForm>
        </Create>
    );
};

export default CommentCreate;
