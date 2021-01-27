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
import SimpleBar from "simplebar-react";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import config from "../../config.json";

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
        <InstagramIcon className={classes.icon}/>
    </a>
}

const ClientActions = ({
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
                                              rowsPerPageOptions={[5, 9, 10, 15, 20, 30, 50]} {...props} />;

async function getClients() {
    let url = `${config.backUrl}/clients`;
    let headers = {'Content-Type': "application/json", authorization: `Bearer ${localStorage.getItem("authToken")}`};

    let response = await fetch(url, {method: 'GET', headers}).catch((e) => console.log(e));
    if (response.status !== 200) return Promise.reject(await response.json());
    let json;

    try {
        json = await response.json();
    } catch (e) {
        return Promise.reject('Erro desconhecido, tente novamente mais tarde.');
    }

    return json;
}

export const ClientList = props => {
    const [birthdayCount, setBirthdayCount] = useState(0);
    const [frequencyCount, setfrequencyCount] = useState(0);
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    useEffect(() => {
        getClients().then((data) => {
            let numberOfBirthdays = 0, numberOfFrequency = 0, getDate = new Date();
            data.data.map((client) => {
                let birthday = new Date(client.birthday)
                if(birthday.getUTCDate() === getDate.getDate() && (birthday.getUTCMonth() + 1) === (getDate.getUTCMonth() + 1)){
                    numberOfBirthdays++;
                }
                let daysMissing = parseInt(formattedDateSubtract(getDate.toISOString(), client.updatedAt, "DD"));
                if(daysMissing > 30 ||  daysMissing > 15){
                    numberOfFrequency++;
                }
                setBirthdayCount(numberOfBirthdays);
                setfrequencyCount(numberOfFrequency);
            });
        });
    },[]);
    localStorage.setItem("birthdayCount", `${birthdayCount}`);
    localStorage.setItem("frequencyCount", `${frequencyCount}`);

    return (
        <SimpleBar style={{maxHeight: '100%'}}>
            <List title="Lista de Clientes" bulkActionButtons={false} filters={<ClientFilter/>}
                  actions={<ClientActions/>}
                  pagination={<ClientPagination/>}
                  perPage={9}
                  {...props}>
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
        </SimpleBar>
    );
}
