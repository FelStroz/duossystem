import * as React from 'react';
import {Admin,Resource} from 'react-admin'; //importando o react admin
import restProvider from 'ra-data-simple-rest'; //importando o provedor de dados rest
import authProvider from './Providers/authProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot'
import portugueseMessages from 'ra-language-portuguese';
import dataProvider from "../src/Providers/dataProvider";

import ClassifiList from './components/Services/ClassifiList'; //importanto lista de classificações
// import ClassifiCreate from './components/Services/ClassifiCreate'; // importando criação de classificações
import ClassifiEdit from './components/Services/ClassifiEdit'; //importanto Edição do post

import UserList from './components/Users/UserList'; //importanto lista de usuario
import UserCreate from './components/Users/UserCreate'; // importando criação de usuario
import UserEdit from './components/Users/UserEdit'; //importanto Edição do usuario

import NotFound from './components/NotFound/NotFound';

const i18nProvider = polyglotI18nProvider(() => portugueseMessages, 'pt');

const App = () => {
  return <Admin catchAll={NotFound} i18nProvider={i18nProvider} authProvider={authProvider} dataProvider={dataProvider}>

    <Resource
      options={{label: "Usuários" }}
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
    />

    <Resource
      options={{label: "Serviços" }}
      name="services"
      list={ClassifiList}
      // create={ClassifiCreate}
      edit={ClassifiEdit}
    />
  </Admin>
}

export default App;
