import React, {useEffect, useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, SimpleShowLayout, TextField, useGetOne, DateField } from 'react-admin';
import provider from '../../utils/Providers/dataProvider';

const useStyles = makeStyles({
    field: {
        '& span': {
            display: 'inline-block',
            maxWidth: '20em'
        }
    }
});

const PostQuickPreviewButton = ({ id }) => {
    const [showPanel, setShowPanel] = useState(false);
    const [list, setList] = useState();
    const classes = useStyles();
    const handleClick = () => {
        setShowPanel(true);
        provider.getOne('clients', {id: id}).then((data) => {
            setList(data.data);
        }).catch(e => {
            console.log(e);
        });
    };

    const handleCloseClick = () => {
        setShowPanel(false);
    };

    return (
        <>
            <Button onClick={handleClick} label="ra.action.show">
                <IconImageEye />
            </Button>
            <Drawer anchor="right" open={showPanel} onClose={handleCloseClick}>
                <div>
                    <Button label="Fechar" onClick={handleCloseClick}>
                        <IconKeyboardArrowRight />
                    </Button>
                </div>
                <SimpleShowLayout
                    record={list}
                    basePath="/clients"
                    resource="clients"
                >
                    <h2>Cliente</h2>
                    <TextField source="name" label={"Nome"} />
                    <TextField source="instagram" label={"Instagram"} className={classes.field} />
                    <TextField source="phone" label={"Telefone"} className={classes.field} />
                    <DateField source="birthday" label={"Data de Nascimento"} className={classes.field} />
                    <TextField source="address" label={"Enredeço"} className={classes.field} />
                </SimpleShowLayout>
            </Drawer>
        </>
    );
};

export default PostQuickPreviewButton;
