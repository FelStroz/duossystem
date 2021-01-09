import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    Filter,
    SearchInput,
    Pagination,
    SimpleList,
    ShowButton,
    TextInput,
} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import {useMediaQuery} from '@material-ui/core';
import {formattedDateSubtract} from 'subtract-date';
import WarningIcon from '@material-ui/icons/Warning';
import CakeIcon from '@material-ui/icons/Cake';
import InstagramIcon from '@material-ui/icons/Instagram';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});

const ClientFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Localizar" source="q" alwaysOn/>
        <TextInput label="Nome Completo" source="name"/>
        <TextInput label="Instagram" source="instagram"/>
        <TextInput label="Telefone" source="phone"/>
        <TextInput label="Endereço" source="address"/>
    </Filter>
);

const ClientNumberServices = ({record}) => {
    return <span>{record.services.length}</span>;
};

const ClientFrequency = ({record}) => {
    let getDate = new Date().toISOString();
    let daysMissing = parseInt(formattedDateSubtract(getDate, record.updatedAt, "DD"));
    return (daysMissing > 30) ? <WarningIcon style={{color: 'crimson'}}/> : (daysMissing < 15) ?
        <WarningIcon style={{color: 'lavenderblush'}}/> : <WarningIcon style={{color: 'gold'}}/>
}

const BirthdayField = ({record}) => {
    let getDate = new Date(), birthday = new Date(record.birthday);
    return (birthday.getUTCDate() === getDate.getDate() && (birthday.getUTCMonth() + 1) === (getDate.getUTCMonth() + 1))
        ? <CakeIcon style={{color: 'coral'}}/> :
        <span>{(birthday.getUTCDate() < 10) ? '0' + birthday.getUTCDate() : birthday.getUTCDate()}/{((birthday.getUTCMonth() + 1) < 10) ? '0' + (birthday.getUTCMonth() + 1) : (birthday.getUTCMonth() + 1)}/{(birthday.getUTCFullYear() < 10) ? '0' + birthday.getUTCFullYear() : birthday.getUTCFullYear()}</span>
}

const ButtonShow = ({basePath, record}) => {
    return <ShowButton basePath={basePath} record={record} label=""/>
}

const InstagramField = ({record = {}, source}) => {
    const classes = useStyles();
    let username = record[source].substring(1, record[source].length)
    let url = `http://instagram.com/${username}`;
    return <a style={{fontSize: '0.95em'}} href={url} target='_blank'>
            {record[source]}
        <InstagramIcon className={classes.icon} />
    </a>
}

const ClientActions = ({
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

    </Toolbar>
);

const ClientPagination = props => <Pagination label="Itens por Página"
                                              rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}  {...props} />;

export const ClientList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List title="Lista de Clientes" bulkActionButtons={false} filters={<ClientFilter/>} actions={<ClientActions/>}
              pagination={<ClientPagination/>} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.name}
                    secondaryText={record => record.instagram}
                    tertiaryText={record => record.phone}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField label="Nome Completo" source="name"/>
                    <BirthdayField label="Data de Nascimento" source="birthday"/>
                    <InstagramField label="Instagram" source="instagram"/>
                    <TextField label="Telefone" source="phone"/>
                    <TextField label="Endereço" source="address"/>
                    <ClientNumberServices label="Número de Serviços"/>
                    <ButtonShow label="Listagem de Serviços"/>
                    <ClientFrequency label="Assiduidade"/>
                </Datagrid>
            )}
        </List>
    );
}
