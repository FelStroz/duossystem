import * as React from "react";
import {Create, SimpleForm, TextInput, Toolbar, SaveButton, required, DateInput, FormDataConsumer} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import BackButton from "../BackButton";
import {useMediaQuery} from "@material-ui/core";
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';

const PhoneInput = (props) => {
    return <InputMask mask="(99) 99999-9999" alwaysShowMask={true} maskChar="_" value={props.value}
                      onChange={props.onChange}
                      style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.09)',
                          width: '256px',
                          height: '2.9em',
                          borderRadius: '3px 3px 0 0',
                          paddingLeft: '10px'
                      }}>
        {(inputProps) => <MaterialInput {...inputProps} type="tel" id="createPhoneInput"/>}
    </InputMask>
};

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomToolbar = props => (
    <Toolbar {...props} classes={useStyles()}>
        <SaveButton label="Criar" submitOnEnter={true}/>
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

export const StaffCreate = props => {

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <Create title="Criar Trabalhador" actions={(isSmall) ? <BackButton color='secondary'>Voltar</BackButton>
            : <TopToolBar/>}{...props}>
            <SimpleForm redirect="list" toolbar={<CustomToolbar/>}>
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                    }}
                >
                    Nome Completo
                </p>
                <TextInput label=" " source="name" validate={[required()]}/>
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                    }}
                >
                    Cargo
                </p>
                <TextInput label=" " source="profession" validate={[required()]}/>
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '15px',
                    }}
                >
                    Telefone
                </p>
                <PhoneInput />
                <p
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        padding: 0,
                        fontSize: '0.85rem',
                        fontFamily: "Helvetica",
                        fontWeight: 400,
                        lineHeight: 1,
                        letterSpacing: '0.00938em',
                        marginBottom: '10px',
                        marginTop: '20px'
                    }}
                >
                    Data de Nascimento
                </p>
                <DateInput label=" " source="birthday" validate={[required()]}/>
                <FormDataConsumer>
                    {({formData, basePath, ...rest}) => formData.birthday &&
                        <TextInput source="phone" style={{display: 'none'}}
                                   defaultValue={
                                       ((document.getElementById('createPhoneInput')).value !== "(__) _____-____"
                                       ? document.getElementById('createPhoneInput').value
                                       : "")
                                   }/>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
}
