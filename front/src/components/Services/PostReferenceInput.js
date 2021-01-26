import React, { useState, useCallback } from 'react';
import { useFormState } from 'react-final-form';
import { ReferenceInput, AutocompleteInput } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import PostQuickCreateButton from './PostQuickCreateButton';
import PostQuickPreviewButton from './PostQuickPreviewButton';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center'
    }
});

const spySubscription = { values: true };

const PostReferenceInput = props => {
    const classes = useStyles();
    const [version, setVersion] = useState(0);
    const { values } = useFormState({ subscription: spySubscription });
    const handleChange = useCallback(() => setVersion(version + 1), [version]);
    return (
        <div className={classes.root}>
            <ReferenceInput label="Cliente" key={version} {...props}>
                <AutocompleteInput optionText={props.optionText} />
            </ReferenceInput>

            <PostQuickCreateButton onChange={handleChange} />
            {!!values.id && <PostQuickPreviewButton id={values.id} />}
        </div>
    );
};

export default PostReferenceInput;
