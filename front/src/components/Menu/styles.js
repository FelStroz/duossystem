import { MenuItemLink } from 'react-admin';
import styled, {css} from "styled-components";

export const MenuItem = styled(MenuItemLink)`
    &:hover{
        background-color: #0075ff80;
        color: white;
    }
    ${props => props.selected && css`
        background-color: #0075ff !important;
        border-radius: 10px;
        color: white;
    `}
    border-radius: 10px;
    height: 6vh;
`;

export const ContainerImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    margin: 20px 0 40px 15px;
`;

export const TextName = styled.text`
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 20px;
`;

export const LetterImage = styled.img`
    height: 6vh;
`;

export const Container = styled.div`
    padding: 0px 15px;  
    display: flex;
    justify-content: space-between;
    flex-direction: column;  
    height: 100%;
`;

export const LogoutButton = styled.div`
    &:hover{
        transition: 0.5s;
        background-color: red;
        color: white;
    }
    border-radius: 10px;
`;
