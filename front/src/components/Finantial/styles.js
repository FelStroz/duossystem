import styled from 'styled-components';

export const ButtonExporter = styled.div`
  width: 7%;
  height: 50px;
  border-radius: 25px;
  background-color: ivory;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 80px;
  transition: width 0.3s;
  box-shadow: 3px 3px 4px 0px black;
  cursor: pointer;
  &:hover {
    width: 15%;
  }
`;

