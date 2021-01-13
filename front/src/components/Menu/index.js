import * as React from 'react';
import {createElement, useState} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@material-ui/core';
import {getResources} from 'react-admin';
import {withRouter, useHistory} from 'react-router-dom';
import {MenuItem, ContainerImage, LetterImage, TextName, Container, LogoutButton} from "./styles";

const Menu = ({onMenuClick, logout}) => {
    const {pathname} = useHistory().location;

    function capitalize(s) {
        return s[0]?.toUpperCase() + s.slice(1);
    }

    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(() => true);
    const resources = useSelector(getResources);
    const completeName = localStorage.getItem('username') ? localStorage.getItem('username') : 'abc';
    const firstLetter = completeName ? completeName.substring(0, 1).toLowerCase() : 'a';

    return (
        <Container>
            <div>
            <ContainerImage>
                <LetterImage
                    src={`https://img.icons8.com/ios-filled/96/000000/circled-${firstLetter}.png`}
                    alt={"Loading..."}
                />
                <TextName>{capitalize(completeName)}</TextName>
            </ContainerImage>
                {resources.map(resource => {
                    if (resource.name === "create-service")
                        return <MenuItem
                            key={resource.name}
                            to={`/${resource.name}/create`}
                            primaryText={resource.options && resource.options.label || resource.name}
                            leftIcon={createElement(resource.icon)}
                            onClick={onMenuClick}
                            sidebarIsOpen={open}
                            selected={pathname.includes(resource.name)}
                        />
                    else
                        return <MenuItem
                        key={resource.name}
                        to={`/${resource.name}`}
                        primaryText={resource.options && resource.options.label || resource.name}
                        leftIcon={createElement(resource.icon)}
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                        selected={pathname.includes(resource.name)}
                    />
                })}
            </div>
            <div>
                <LogoutButton>
                    {logout}
                </LogoutButton>
            </div>
        </Container>
    );
}

export default withRouter(Menu);
