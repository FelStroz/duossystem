import * as React from "react";
import {
    List,
    TextField,
    Pagination,
    Filter,
    SearchInput,
    Datagrid,
    ArrayField,
    SingleFieldList,
    ChipField,
    DateField,
    TextInput,
    SelectInput,
} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import {useMediaQuery} from "@material-ui/core";
import {ServiceEdit} from "./servicesEdit";

import {makeStyles, Chip} from '@material-ui/core';
import SimpleBar from "simplebar-react";

const useQuickFilterStyles = makeStyles(theme => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));

const QuickFilter = ({label}) => {
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={label}/>;
}

const ServicesFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Localizar" source="q" alwaysOn/>
        <TextInput label="Placa do Carro" source="licensePlate"/>
        <TextInput label="Marca" source="carBrand"/>
        <SelectInput label="Método" source="paymentMethod" choices={choices}
                     optionText="name"/>
        <SelectInput label="Status" source="status" choices={status}
                     optionText="name" initialValue="Em aberto"/>
        <QuickFilter source="timestamp" label="Hoje" defaultValue={"day"}/>
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
                             basePath,
                             currentSort,
                             displayedFilters,
                             filters,
                             filterValues,
                             onUnselectItems,
                             resource,
                             selectedIds,
                             showFilter,
                             total
                         }) => (
    <Toolbar style={{display: 'flex', alignItems: 'center'}}>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}

    </Toolbar>
);

const ServicesPagination = props => <Pagination label="Itens por Página" initialValue={10}
                                                rowsPerPageOptions={[5, 10, 15, 20, 25]}  {...props} />;

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

export const ServiceList = (props) => {
    return (
        <SimpleBar style={{maxHeight: '100%'}}>
            <List title="Lista de Serviços" sort={{field: 'createdAt', order: 'DESC'}} bulkActionButtons={false}
                  actions={<ServicesActions/>}
                  pagination={<ServicesPagination/>} filters={<ServicesFilter/>} {...props}>
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
                    <TextField label="Marca" source="carBrand"/>
                    {/*<TextField label="Cor" source="color"/>*/}
                    <FieldChipDiscount label="Desconto" source="discount"/>
                    <DateField label="Data" source="date"/>
                    <TextField label="Método" source="paymentMethod"/>
                </Datagrid>
            </List>
        </SimpleBar>
    );
}
