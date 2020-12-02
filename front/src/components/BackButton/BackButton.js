import React from 'react'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import ChevronLeft from "@material-ui/icons/ChevronLeft";

const BackButton = ({ history: { goBack }, children, ...props }) => (
    <Button {...props} style={{alignItems: 'center'}} onClick={goBack} startIcon={<ChevronLeft style={{fontSize: "3em"}} />}>
        {children}
    </Button>
)

export default withRouter(BackButton)
