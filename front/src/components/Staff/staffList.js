import * as React from "react";
import {List, Datagrid, TextField, DateField, Filter, SearchInput, CreateButton, Pagination, SimpleList} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import { useMediaQuery } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const StaffFilter = (props) => (
  <Filter {...props}>
    <SearchInput placeholder="Localizar" source="q" alwaysOn/>
  </Filter>
);

const FoulsField = ({record}) => {
    return <span>{record.fouls.length}</span>
}

const SpendField = ({record}) => {
    let totalCost = 0;
    record.spending.map((item) => {
        totalCost += item.value;
    })
    return <span>R$ {totalCost}</span>
}

const ActiveField = ({record}) => {
    return (record.actualStatus === 'Ativo')
        ? <CheckCircleIcon style={{color:"forestgreen"}}/>
        : <CancelRoundedIcon style={{color:"firebrick"}}/>
}

const StaffActions = ({
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

const StaffPagination = props => <Pagination label="Itens por Página"
                                            rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}  {...props} />;

export const StaffList = props => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <List title="Lista de Trabalhadores" bulkActionButtons={false} filters={<StaffFilter/>} actions={<StaffActions/>}
          pagination={<StaffPagination/>} {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.name}
          secondaryText={record => record.profession}
          tertiaryText={record => <ActiveField record={record}/>}
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="Nome Completo" source="name"/>
          <DateField label="Data de Nascimento" source="birthday"/>
          <TextField label="Telefone" source="phone"/>
          <TextField label="Profissão" source="profession"/>
          <FoulsField label="Número de Faltas"/>
          <SpendField label="Gasto Total"/>
          <ActiveField label="Ativo"/>
        </Datagrid>
      )}
    </List>
  );
}
