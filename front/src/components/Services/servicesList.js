import * as React from "react";
import {
    List,
    TextField,
    Pagination,
    Filter,
    Datagrid,
    ArrayField,
    SingleFieldList,
    ChipField,
    DateField,
    TextInput,
    SelectInput,
    ExportButton, DateInput
} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import {ServiceEdit} from "./servicesEdit";
import SimpleBar from "simplebar-react";
import jsonExport from 'jsonexport';
import { Fragment } from 'react';
import FaturadoManyButton from '../FaturadoManyButton';
import PayManyButton from '../PayManyButton';

const ServicesFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Nome do Cliente" source={"nameClient"}/>
        <TextInput label="Placa do Carro" source="licensePlate"/>
        <TextInput label="Modelo" source="carBrand"/>
        <TextInput label="Serviço Realizado" source="serviceName"/>
        <SelectInput label="Método" source="paymentMethod" choices={choices}
                     optionText="name"/>
        <SelectInput label="Status" source="status" choices={status}
                     optionText="name" />
        <DateInput source="timeInterval.startDate" label="Data de início"/>
        <DateInput source="timeInterval.endDate" initialValue={new Date} label="Data de término"/>
    </Filter>
);

const choices = [
    {id: 'Crédito', name: 'Crédito'},
    {id: 'Débito', name: 'Débito'},
    {id: 'Dinheiro', name: 'Dinheiro'},
    {id: 'Faturado', name: 'Faturado'},
];

const status = [
    {id: 'Faturado', name: 'Faturado'},
    {id: 'Pago', name: 'Pago'},
    {id: 'Em aberto', name: 'Em aberto'},
    {id: 'Atrasado', name: 'Atrasado'}
];

const ServicesActions = ({
                             displayedFilters,
                             filters,
                             filterValues,
                             resource,
                             showFilter,
                         }) => (
    <Toolbar style={{display: 'flex', alignItems: 'center'}}>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        <ExportButton basePath={'/cars?populate=clients'}/>
    </Toolbar>
);

const ServicesPagination = props => <Pagination label="Itens por Página"
                                                rowsPerPageOptions={[3, 6, 10, 15, 20, 25]}  {...props} />;

const ServiceRowStyle = (record) => ({
    borderLeftColor: record.status === "Faturado" ? 'rgb(66,94,255)' : record.status === "Atrasado" ? 'rgba(255,72,72,0.38)' : record.status === "Em aberto" ? 'rgba(255,255,15,0.79)' : 'rgba(92,255,64,0.38)',
    borderLeftWidth: 5,
    borderLeftStyle: 'solid',
});

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

const exporter = (services) => {
    let allServices = [];
    for(let serv in services){
        let servicesForExport = {}, total = 0;
        let service = services[serv];
        for(let namePrice of service.service){
            if(!servicesForExport.Serviço)
                servicesForExport.Serviço = namePrice.name;
            else
                servicesForExport.Serviço += "/" + namePrice.name;
            total += namePrice.price;
        }
        delete service._id;
        delete service.updatedAt;
        delete service.createdAt;
        delete service.__v;
        delete service.client;

        servicesForExport.Nome = service.nameClient;
        servicesForExport.Protocolo = service.protocol;
        servicesForExport.Preço = 'R$ ' + `${total}` + ',00';
        servicesForExport.Modelo = service.carBrand;
        servicesForExport.Placa = service.licensePlate;
        servicesForExport.Cor = service.color;
        servicesForExport.Desconto = 'R$ ' + `${service.discount}` + ',00';
        servicesForExport.Total = 'R$ ' + `${total - service.discount}` + ',00';
        servicesForExport.Data = `${new Date(service.date).toLocaleDateString()}`;
        servicesForExport.Observação = (service.observation !== "") ? service.observation : "Sem observação";
        servicesForExport.Método = service.paymentMethod;
        servicesForExport.Status = service.status;

        delete servicesForExport.observation;
        delete servicesForExport.status;
        delete servicesForExport.protocol;
        delete servicesForExport.date;
        delete servicesForExport.paymentMethod;
        delete servicesForExport.licensePlate;
        delete servicesForExport.carBrand
        delete servicesForExport.color;
        delete servicesForExport.observation;
        delete servicesForExport.discount;
        delete servicesForExport.service;
        delete servicesForExport.nameClient;

        allServices.push(servicesForExport);
    }
    jsonExport(allServices, {
        headers: ['Protocolo', 'Status', 'Nome', 'Serviço', 'Modelo', 'Placa', 'Cor', 'Data', 'Método', 'Observação', 'Preço', 'Desconto', 'Total'],
        rowDelimiter: ';',
    }, (err, csv) => {
        let link = window.document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv.toString()));
        link.setAttribute("download", `Lista de Serviços.csv`);
        link.click();
    });
};

const ServicesBulkActionButtons = props => (
    <Fragment>
        <FaturadoManyButton label="Marcar Faturado" {...props} />
        <PayManyButton label="Marcar Pago" {...props} />
    </Fragment>
);

export const ServiceList = (props) => {
    return (
        <SimpleBar style={{maxHeight: '100%'}}>
            <List title="Lista de Serviços" sort={{field: 'createdAt', order: 'DESC'}} bulkActionButtons={<ServicesBulkActionButtons/>}
                  actions={<ServicesActions/>}
                  exporter={exporter}
                  pagination={<ServicesPagination/>} perPage={6} filters={<ServicesFilter/>} {...props}>
                <Datagrid expand={<ServiceEdit/>} rowStyle={ServiceRowStyle}>
                    <TextField label="Status" source="status"/>
                    <TextField label="Cliente" source="client.name"/>
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
                    <FieldChipDiscount label="Desconto" source="discount"/>
                    <DateField label="Data" source="date"/>
                    <TextField label="Método" source="paymentMethod"/>
                </Datagrid>
            </List>
        </SimpleBar>
    );
}
