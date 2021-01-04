import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  required,
  BooleanInput,
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import BackButton from "../BackButton";
import {useMediaQuery} from "@material-ui/core";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const UserName = ({record}) => {
  return <span>Editar Usuário {record.name}</span>;
};

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const CustomToolbar = props => (
  <Toolbar {...props} classes={useStyles()}>
    <SaveButton label="Salvar" submitOnEnter={true}/>
    <DeleteButton resource="users" undoable={true}/>
  </Toolbar>
);

const TopToolBar = props => (
  <Toolbar {...props} classes={useStyles()}>
    <BackButton
      color='secondary'
    >
      Voltar
    </BackButton>
  </Toolbar>
);
export const UserEdit = ({ permissions, ...props }) => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  return (
    <Edit title={<UserName/>} actions={(isSmall)? <BackButton color='secondary'>Voltar</BackButton>
      : <TopToolBar/>} {...props}>
      <SimpleForm redirect="list" toolbar={<CustomToolbar/>}>
        <TextInput label="Nome" source="name" validate={[required()]}/>
        <TextInput source="email" validate={[required()]}/>
        {permissions === "true" && <BooleanInput label="Administrador" source="isAdmin" />}
      </SimpleForm>
    </Edit>
  );
}
