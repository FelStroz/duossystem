import * as React from "react";
import { Route } from 'react-router-dom';
import FinantialList from '../../components/Finantial/finantialList';
import CreateService from '../../components/Services/servicesCreate';

export default [
    <Route exact path="/finantial" component={FinantialList} />,
    <Route exact path="/create-service" component={CreateService} />,
];
