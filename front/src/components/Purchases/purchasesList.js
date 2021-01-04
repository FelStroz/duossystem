import * as React from "react";
import {List, Datagrid, TextField, NumberField, Filter, SearchInput, Pagination, SimpleList, ExportButton} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import { useMediaQuery } from '@material-ui/core';
import {useListContext} from "ra-core";

const PurchasesFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Localizar" source="q" alwaysOn/>
    </Filter>
);

const PurchasePrice = ({record}) => {
    return <span>R$ {record.product[0].price}</span>;
};

const PurchaseActions = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;
    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext();
    return (
    <Toolbar>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
<ExportButton
    disabled={total === 0}
    resource={resource}
    sort={currentSort}
    filterValues={filterValues}
    maxResults={maxResults}
/>
    </Toolbar>
)};

const PurchasesPagination = props => <Pagination label="Itens por Página"
                                            rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}  {...props} />;

export const PurchasesList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List title="Lista de Compras" bulkActionButtons={false} filters={<PurchasesFilter/>} actions={<PurchaseActions/>}
              pagination={<PurchasesPagination/>} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.email}
                    tertiaryText={record => (record.admin) ? "ADMIN": ""}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField label="Comprador" source='client.name'/>
                    <TextField label="CPF do Comprador" source='client.cpf'/>
                    <TextField label="Produto" source='product[0].name'/>
                    <TextField label="Categoria do produto" source='product[0].category'/>
                    <PurchasePrice label="Total da Compra" />
                </Datagrid>
            )}

        </List>
    );
}
