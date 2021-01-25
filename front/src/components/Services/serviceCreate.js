import React, {useState} from 'react';
import {
    Create,
    TextInput,
    required,
    List,
    Datagrid,
    TextField,
    ArrayField,
    SingleFieldList,
    ChipField,
    DateField,
    useListContext,
    TabbedForm,
    FormTab,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    NumberInput,
    minValue,
    DateInput,
    FormDataConsumer,
    useNotify
} from 'react-admin';
import PostReferenceInput from './PostReferenceInput';
import Toolbar from "@material-ui/core/Toolbar";
import SimpleBar from "simplebar-react";
import {Button, InputAdornment} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from '@material-ui/icons/Search';
import provider from "../../utils/Providers/dataProvider";
import PostQuickPreviewButton from "./PostQuickPreviewButton";

const FieldChipPrice = ({record}) => {
    return <span style={{
        display: 'flex',
        backgroundColor: 'rgb(224, 224, 224)',
        borderRadius: '16px',
        height: '25px',
        width: '50px',
        padding: '3px',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3px'
    }}>R$ {record.price}</span>
};

const FieldChipDiscount = ({record}) => {
    return <span style={{
        display: 'flex',
        backgroundColor: 'rgb(224, 224, 224)',
        borderRadius: '16px',
        height: '25px',
        width: '50px',
        padding: '3px',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    }}>R$ {record.discount}</span>
};

const ServicesShowRowStyle = (record) => ({
    borderLeftColor: record.status === "Faturado" ? 'rgb(66,94,255)' : record.status === "Atrasado" ? 'rgba(255,72,72,0.38)' : record.status === "Em aberto" ? 'rgba(255,255,15,0.79)' : 'rgba(92,255,64,0.38)',
    borderLeftWidth: 5,
    borderLeftStyle: 'solid',
});

const ServicesPagination = () => {
    const {page, total, setPage} = useListContext();
    const nbPages = Math.ceil(total / 3) || 1;
    return (
        nbPages > 1 &&
        <Toolbar>
            {page > 1 &&
            <Button color="primary" key="prev" onClick={() => setPage(page - 1)}>
                <ChevronLeft/>
                Anterior
            </Button>
            }
            {page !== nbPages &&
            <Button color="primary" key="next" onClick={() => setPage(page + 1)}>
                Próximo
                <ChevronRight/>
            </Button>
            }
        </Toolbar>
    );
}

const services = [
    {id: 'Lavagem Simples (P)', name: 'Lavagem Simples (P)'},
    {id: 'Lavagem Simples (G)', name: 'Lavagem Simples (G)'},
    {id: 'Lavagem Completa (P)', name: 'Lavagem Completa (P)'},
    {id: 'Lavagem Completa (G)', name: 'Lavagem Completa (G)'},
    {id: 'Lavagem Geral (P)', name: 'Lavagem Geral (P)'},
    {id: 'Lavagem Geral (G)', name: 'Lavagem Geral (G)'},
    {id: 'Ducha Simples (P)', name: 'Ducha Simples (P)'},
    {id: 'Ducha Simples (G)', name: 'Ducha Simples (G)'},
    {id: 'Ducha Completa (P)', name: 'Ducha Completa (P)'},
    {id: 'Ducha Completa (G)', name: 'Ducha Completa (G)'},
    {id: 'Outro', name: 'Outro'},

];

const FieldChipClient = ({record}) => {
    return <span style={{
        display: 'flex',
        backgroundColor: 'rgb(224, 224, 224)',
        borderRadius: '16px',
        height: '25px',
        width: 'auto',
        padding: '3px',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3px'
    }}>{record.name}</span>
};

const today = new Date();

const ServiceCreate = props => {
    let notify = useNotify();
    const [plate, setPlate] = useState("");
    const [list, setList] = useState(null);

    function handleSearchClick() {
        return provider.getOne('plates', {licensePlate: plate.toUpperCase()}).then((data) => {
            if (data.error) {
                notify(data.error.completeMessage);
                setList(null)
                return data.error.completeMessage;
            }
            setList(data.data);
            return data.data;
        }).catch(e => {
            console.log(e);
        });
    }

    const handleChange = (value) => {
        // console.log(value.licensePlate);
        setPlate(value.licensePlate);
    };

    return (<SimpleBar style={{maxHeight: '100%'}}>
            <Create {...props}>
                <TabbedForm
                    onSubmit={() => setList(null)}
                    style={{width: "100%"}}
                    centered={true}
                    redirect={"/cars"}
                >
                    <FormTab label="Informações">
                        <div style={{width: '100%', height: '77px', display: 'flex', flexDirection: 'row'}}>
                            <TextInput source="licensePlate" label="Placa" validate={[required()]}/>
                            <FormDataConsumer>
                                {({formData, ...rest}) => formData.licensePlate && handleChange(formData)}
                            </FormDataConsumer>
                            <FormDataConsumer>
                                {({formData, ...rest}) => !formData.licensePlate && setList(null)}
                            </FormDataConsumer>
                            <FormDataConsumer>
                                {({formData, ...rest}) => (formData.licensePlate && formData.licensePlate.length < 7) &&
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 25,
                                        backgroundColor: 'lavender',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'no-drop',
                                        marginLeft: '14px',
                                        marginTop: '14px'
                                    }}>
                                        <SearchIcon style={{color: 'darkgray'}}/>
                                    </div>
                                }
                            </FormDataConsumer>
                            <FormDataConsumer>
                                {({
                                      formData,
                                      ...rest
                                  }) => (formData.licensePlate && formData.licensePlate.length >= 7) &&
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 25,
                                        backgroundColor: 'lavender',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '14px',
                                        marginLeft: '14px',
                                        cursor: 'pointer',
                                    }} onClick={async () => handleSearchClick()}>
                                        <SearchIcon/>
                                    </div>
                                }
                            </FormDataConsumer>
                        </div>
                        {(list)
                            ?
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <p style={{
                                    color: 'rgba(0, 0, 0, 0.54)',
                                    padding: '0',
                                    fontSize: '0.76rem',
                                    fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
                                    fontWeight: 400,
                                    lineHeight: 1,
                                    letterSpacing: '0.00938em',
                                    marginTop: '15px',
                                    marginBottom: '10px',
                                }}>
                                    Cliente
                                </p>
                                <div>
                                    <FieldChipClient record={list.client}/>
                                    <PostQuickPreviewButton id={list.client._id}/>
                                </div>
                                <div className={"divInputs"}>
                                    <TextInput label="Modelo" source="carBrand" validate={[required()]}/>
                                    <TextInput label="Cor" source="color" validate={[required()]}/>
                                    <DateInput label="Data do Serviço" source="date" defaultValue={today}
                                               validate={[required()]}/>
                                </div>
                                <TextInput source={"client"} defaultValue={list.client._id} style={{display: 'none'}}/>
                                <TextInput source={"nameClient"} defaultValue={list.client.name}
                                           style={{display: 'none'}}/>
                            </div>
                            :
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{width: 'max-content'}}>
                                    <PostReferenceInput
                                        source="id"
                                        reference="clients"
                                        allowEmpty
                                        validate={required()}
                                        perPage={10000}
                                        optionText={"name"}
                                    />
                                </div>
                                <div className={"divInputs"}>
                                    <TextInput label="Modelo" source="carBrand" validate={[required()]}/>
                                    <TextInput label="Cor" source="color" validate={[required()]}/>
                                    <DateInput label="Data do Serviço" source="date" defaultValue={today}
                                               validate={[required()]}/>
                                </div>
                            </div>
                        }
                    </FormTab>
                    <FormTab label="Serviços">
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
                            Serviços
                        </p>
                        <ArrayInput label=" " source="service" defaultValue={[{name: "", price: ""}]}>
                            <SimpleFormIterator addButton={<LibraryAddIcon cursor={'pointer'}/>}
                                                removeButton={<DeleteForeverIcon cursor={'pointer'}/>}>
                                <SelectInput label="Serviço" source="name" choices={services}
                                             optionText="name" validate={[required()]}/>
                                <NumberInput label="Valor" source="price"
                                                     validate={[required(), minValue(0)]} min={0}
                                                     InputProps={{
                                                         startAdornment: <InputAdornment
                                                             position="start">R$</InputAdornment>,
                                                     }}/>
                                {/*<FormDataConsumer>*/}
                                {/*    {({*/}
                                {/*          formData, ...rest*/}
                                {/*      }) => {if (formData.service[formData.service.length - 1]?.name == "Outro")*/}
                                {/*            return <span style={{display: "flex", flexDirection: "column"}}>*/}
                                {/*            <TextInput source="name" label="Serviço"/>*/}
                                {/*            <NumberInput style={{marginTop: '15px'}} label="Valor" source="price"*/}
                                {/*            validate={[required(), minValue(0)]} min={0}*/}
                                {/*            InputProps={{*/}
                                {/*            startAdornment: <InputAdornment*/}
                                {/*            position="start">R$</InputAdornment>,*/}
                                {/*        }}/>*/}
                                {/*            </span>*/}
                                {/*        else*/}
                                {/*        return <NumberInput label="Valor" source="price"*/}
                                {/*                     validate={[required(), minValue(0)]} min={0}*/}
                                {/*                     InputProps={{*/}
                                {/*                         startAdornment: <InputAdornment*/}
                                {/*                             position="start">R$</InputAdornment>,*/}
                                {/*                     }}/>*/}
                                {/*    }}*/}
                                {/*</FormDataConsumer>*/}
                                <FormDataConsumer>
                                    {({
                                          formData, ...rest
                                      }) => {
                                        formData.service.map((service) => {
                                            console.log(service, formData, {...rest});
                                            if (service?.name === "Lavagem Simples (P)")
                                                service.price = 40;
                                            else if (service?.name === "Lavagem Simples (G)")
                                                service.price = 45;
                                            else if (service?.name === "Lavagem Completa (P)")
                                                service.price = 45;
                                            else if (service?.name === "Lavagem Completa (G)")
                                                service.price = 50;
                                            else if (service?.name === "Lavagem Geral (P)")
                                                service.price = 80;
                                            else if (service?.name === "Lavagem Geral (G)")
                                                service.price = 100;
                                            else if (service?.name === "Ducha Simples (P)")
                                                service.price = 20;
                                            else if (service?.name === "Ducha Simples (G)")
                                                service.price = 25;
                                            else if (service?.name === "Ducha Completa (P)")
                                                service.price = 25;
                                            else if (service?.name === "Ducha Completa (G)")
                                                service.price = 30;
                                        })
                                    }}
                                </FormDataConsumer>
                            </SimpleFormIterator>
                        </ArrayInput>
                        <div className={"divMarcaCor"}>
                            <TextInput label="Observação" source="observation"/>
                            <NumberInput label="Desconto" min={0} source="discount" validate={[minValue(0)]}
                                         style={{marginLeft: '50px'}}/>
                        </div>
                    </FormTab>
                </TabbedForm>
            </Create>
            <List style={{marginTop: 5}}
                  empty={<h2 style={{marginTop: '40px', fontFamily: 'cursive'}}>Não foram realizados nenhum serviço
                      hoje!</h2>}
                  pagination={<ServicesPagination/>} perPage={3} actions={false}
                  bulkActionButtons={false} {...props}>
                <Datagrid rowStyle={ServicesShowRowStyle}>
                    <TextField label="Cliente" source="client.name"/>
                    <TextField label="Status" source="status"/>
                    <ArrayField label="Serviços" source="service">
                        <SingleFieldList linkType={false}>
                            <ChipField source="name"/>
                        </SingleFieldList>
                    </ArrayField>
                    <ArrayField label="Preço" source="service">
                        <SingleFieldList linkType={false}>
                            <FieldChipPrice/>
                        </SingleFieldList>
                    </ArrayField>
                    <TextField label="Placa" source="licensePlate"/>
                    <TextField label="Modelo" source="carBrand"/>
                    <TextField label="Cor" source="color"/>
                    <FieldChipDiscount label="Desconto" source="discount"/>
                    <DateField label="Data" source="date"/>
                    <TextField label="Método" source="paymentMethod"/>
                </Datagrid>
            </List>
        </SimpleBar>
    );
};

export default ServiceCreate;
