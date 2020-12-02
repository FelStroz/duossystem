import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Filter,
    SearchInput,
    Pagination
} from 'react-admin'

const ServicesFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Localizar..." source="q" alwaysOn/>
    </Filter>
);

const ServicesPagination = props => <Pagination label="Itens por Página"
                                               rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}  {...props} />;

const ClassifiList = (props) => {
    return <List bulkActionButtons={false} filters={<ServicesFilter/>} sort={{field: 'nome_entidade', order: 'ASC'}} exporter={false} pagination={<ServicesPagination/>} title="Listagem De Serviços" {...props}>
        <Datagrid rowClick={ "edit" }>

            <TextField label="Id" source='id' />
            <TextField label="Nome Entidade" source='nome_entidade' />

        </Datagrid>
    </List>
}

export default ClassifiList;
