import React from "react";
import {Admin, Resource} from 'react-admin';
import {theme, initialState} from "./styles";
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
import CommentCreate from "../../components/Services/servicesCreate";

import {PurchasesList} from "../../components/Purchases/purchasesList";
import {ProductList} from "../../components/Products/productList";
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import {ProductCreate} from "../../components/Products/productCreate";
import {ProductEdit} from "../../components/Products/productEdit";

export default function AdminPage() {
    return (
        <Admin title="Duos" authProvider={authProvider} dataProvider={dataProvider}
               i18nProvider={i18nProvider} catchAll={NotFound} layout={CustomLayout}
               initialState={initialState}
        >
            {
                permission => [
                    <Resource options={{ label: 'Clientes' }} name="clients" edit={ClientEdit} show={ClientShow} list={ClientList} icon={PeopleIcon}/>,
                    <Resource options={{ label: 'Serviços' }} name="cars" create={CommentCreate} icon={PeopleIcon}/>,
                    <Resource options={{ label: 'Staff' }} name="staff" list={StaffList} edit={StaffEdit} create={StaffCreate} icon={AssignmentIndIcon} />,
                    (permission === "true" ?
                        <Resource options={{ label: 'Usuários' }} name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={AccountCircleIcon}/>
                        : false
                    ),

                ]
            }
            {/*<Resource options={{ label: 'Clientes' }} name="clients" list={ClientList} icon={PeopleIcon}/>*/}

            {/*<Resource options={{ label: 'Compras' }} name="purchases" list={PurchasesList} icon={ShoppingBasketIcon}/>*/}
            {/*<Resource options={{ label: 'Produtos' }} name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={DynamicFeedIcon} />*/}

        </Admin>
    )
}
