import React from "react";
import {Admin, Resource} from 'react-admin';
import {initialState} from "./styles";
import {authProvider, dataProvider, i18nProvider} from '../../utils';
import NotFound from '../../components/NotFound';

import CustomLayout from '../../components/Layout';
import {UserList} from "../../components/Users/userList";
import {UserEdit} from "../../components/Users/userEdit";
import {UserCreate} from "../../components/Users/userCreate";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {ClientList} from "../../components/Clients/clientsList";
import {ClientShow} from "../../components/Clients/clientsShow";
import {ClientEdit} from "../../components/Clients/clientsEdit";
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {StaffCreate} from "../../components/Staff/staffCreate";
import {StaffEdit} from "../../components/Staff/staffEdit";
import {StaffList} from "../../components/Staff/staffList";
import {ServiceList} from "../../components/Services/servicesList";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import customRoutes from '../../utils/custom/customRoutes';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ServiceCreate from "../../components/Services/serviceCreate";

export default function AdminPage() {
    return (
        <Admin title="Duos" authProvider={authProvider} dataProvider={dataProvider}
               i18nProvider={i18nProvider} catchAll={NotFound} layout={CustomLayout}
               initialState={initialState} customRoutes={customRoutes}
        >
            {
                permission => [
                    <Resource options={{ label: 'Serviços' }} name="cars" list={ServiceList} icon={DriveEtaIcon}/>,
                    <Resource options={{ label: 'Novo Serviço' }} name="create-service" create={ServiceCreate} icon={AddToQueueIcon}/>,
                    (permission === "true" ?
                        <Resource options={{ label: 'Clientes' }} name="clients" edit={ClientEdit} show={ClientShow} list={ClientList} icon={PeopleIcon}/>
                        :false
                    ),
                    (permission === "true" ?
                        <Resource options={{ label: 'Finanças' }} name="finantial" icon={LocalAtmIcon}/>
                        : false
                    ),
                    (permission === "true" ?
                        <Resource options={{ label: 'Staff' }} name="staff" list={StaffList} edit={StaffEdit} create={StaffCreate} icon={AssignmentIndIcon} />
                        : false
                    ),
                    (permission === "true" ?
                        <Resource options={{ label: 'Usuários' }} name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={AccountCircleIcon}/>
                        : false
                    ),
                ]
            }
        </Admin>
    )
}
