import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import {
    List,
    Datagrid,
    TextField,
    EmailField,
    SimpleList

} from 'react-admin'

const UserList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return <List bulkActionButtons= {false} exporter={false} title="Listagem De Usuários" {...props}>

{isSmall ? (
                <SimpleList
                    primaryText={record => record.nome}
                    secondaryText={record => record.email}
                />
            ) : (
                <Datagrid rowClick={ "edit" }>

                <TextField label="Nome" source='nome'/>
                <EmailField label="Email" source='email'/>

            </Datagrid>
            )}


    </List>
}

export default UserList;
