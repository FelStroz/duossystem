import * as React from "react";
import {List, Datagrid, TextField, EmailField, Filter, SearchInput, CreateButton, Pagination, SimpleList} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import { useMediaQuery } from '@material-ui/core';

const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput placeholder="Localizar" source="q" alwaysOn/>
  </Filter>
);

const UserActions = ({
                       basePath,
                       displayedFilters,
                       filters,
                       filterValues,
                       resource,
                       showFilter,
                     }) => (
  <Toolbar>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    })}
    <CreateButton basePath={basePath}/>

  </Toolbar>
);

const UserPagination = props => <Pagination label="Itens por Página"
                                            rowsPerPageOptions={[5, 10, 15, 30]}  {...props} />;

export const UserList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List title="Lista de Usuários" bulkActionButtons={false} filters={<UserFilter/>} actions={<UserActions/>}
          pagination={<UserPagination/>} {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.email}
          tertiaryText={record => (record.isAdmin) ? "ADMIN": ""}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="Nome" source="name"/>
          <EmailField source="email"/>
        </Datagrid>
      )}
    </List>
  );
}
