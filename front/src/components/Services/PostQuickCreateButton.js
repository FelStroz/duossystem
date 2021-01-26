import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
    required,
    Button,
    SaveButton,
    TextInput,
    useCreate,
    useNotify,
    FormWithRedirect,
    DateInput
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

function PostQuickCreateButton({ onChange }) {
    const [showDialog, setShowDialog] = useState(false);
    const [create, { loading }] = useCreate('clients');
    const notify = useNotify();
    const form = useForm();

    const handleClick = () => {
        setShowDialog(true);
    };

    const handleCloseClick = () => {
        setShowDialog(false);
    };

    const handleSubmit = async values => {
        create(
            { payload: { data: values } },
            {
                onSuccess: ({ data }) => {
                    setShowDialog(false);
                    // Update the comment form to target the newly created post
                    // Updating the ReferenceInput value will force it to reload the available posts
                    form.change('id', data.id);
                    onChange();
                    notify("Cliente Criado");
                },
                onFailure: ({ error }) => {
                    // console.log(error);
                    notify(error.message, 'error');
                }
            }
        );
    };

    return (
        <>
            <Button onClick={handleClick} label="ra.action.create">
                <IconContentAdd />
            </Button>
            <Dialog
                fullWidth
                open={showDialog}
                onClose={handleCloseClick}
                aria-label="Criar Cliente"
            >
                <DialogTitle>Criar Cliente</DialogTitle>

                <FormWithRedirect
                    resource="clients"
                    save={handleSubmit}
                    render={({
                                 handleSubmitWithRedirect,
                                 pristine,
                                 saving
                             }) => (
                        <>
                            <DialogContent>
                                <TextInput
                                    source="name"
                                    label={"Nome"}
                                    validate={required()}
                                    fullWidth
                                />
                                <TextInput
                                    source="instagram"
                                    label={"Instagram"}
                                    validate={required()}
                                    defaultValue={"@"}
                                    fullWidth
                                />
                                <DateInput
                                    source="birthday"
                                    label={"Data de nascimento"}
                                    validate={required()}
                                    fullWidth
                                />
                                <TextInput
                                    source="address"
                                    label={"Endereço"}
                                    validate={required()}
                                    fullWidth
                                />
                                <TextInput
                                    source="phone"
                                    label={"Telefone"}
                                    validate={required()}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    label="ra.action.cancel"
                                    onClick={handleCloseClick}
                                    disabled={loading}
                                >
                                    <IconCancel />
                                </Button>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    pristine={pristine}
                                    saving={saving}
                                    disabled={loading}
                                />
                            </DialogActions>
                        </>
                    )}
                />
            </Dialog>
        </>
    );
}

export default PostQuickCreateButton;
