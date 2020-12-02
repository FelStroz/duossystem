import * as React from "react";
import {Title} from 'react-admin';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

import RestoreTwoToneIcon from '@material-ui/icons/RestoreTwoTone';
import HotTubOutlinedIcon from '@material-ui/icons/HotTubOutlined';




export default () => (
    <Card>
        <Title title="Não encontrado"/>

        <CardContent>

            <Box display="flex" color="text.secondary"  justifyContent="center">

                <HotTubOutlinedIcon style={{ fontSize: 200}} />
                
            </Box>


            <Box display="flex" justifyContent="center" paddingTop="10px">

                <Box color="text.secondary" fontSize="40px" fontWeight="bold">Pagina não encontrada </Box>

            </Box>


            <Box display="flex" justifyContent="center" paddingTop="20px">

                <Box color="text.secondary" fontSize="20px"  >URL errado ou link incorreto</Box>

            </Box>
           

            <Box display="flex" justifyContent="center" paddingTop="20px">
                
                <Button  variant="contained" color="primary" href= "#" >
                 
                  <RestoreTwoToneIcon/> Voltar

                </Button>

            </Box>
            

        </CardContent>


    </Card>
    
);