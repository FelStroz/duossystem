import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import {Container, Subtitle, InformationText, ImageError} from './styles';
import { Title, MenuItemLink} from 'react-admin';

export default () => (
    <Card>
        <Title title="Not Found" />
        <CardContent>
            <Container>
                <ImageError src={"https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"}/>
                <Subtitle>OPS!</Subtitle>
                <InformationText>Não encontramos o que você está buscando.</InformationText>
                <MenuItemLink to={'/'}  primaryText={'Clique aqui para retornar para à página principal'} style={{ color: "#002afa" }} />
            </Container>
        </CardContent>
    </Card>
);
