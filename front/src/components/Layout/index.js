import * as React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch, connect} from 'react-redux';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core';
import Menu from '../Menu'
import 'simplebar/dist/simplebar.min.css';

import {
    AppBar,
    Notification,
    Sidebar,
    setSidebarVisibility,
    ComponentPropType,
    getResources
} from "react-admin";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: 'calc(100vh - 80px)',
        padding: 10,
        position: 'relative',
        backgroundColor: '#dbe8f8',
    },
    appBar: {
        display: 'none',
    },
    drawerPaper: {
        borderRadius: 20,
        boxShadow: '20px rgba(0, 0, 0, 0.2)',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'none',
        backgroundColor: '#eef2fb',
        borderRadius: 20,
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
        padding: 10,
    },
    content: {
        paddingLeft: 8,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        backgroundColor: '#eef2fb',
        borderRadius: 20,
        height: 'calc(100vh - 100px)',
        width: 'calc(100vw - 500px)',
    },
}));

const baseTheme = createMuiTheme();

const CustomLayout = ({
                          children,
                          isLoading,
                          logout,
                      }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    // console.log(state => state.admin)
    useEffect(() => {
        dispatch(setSidebarVisibility(true))
    }, [dispatch]);

    return (
        <ThemeProvider theme={baseTheme}>
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar open={true} className={classes.appBar}/>
                    <main className={classes.contentWithSidebar}>
                        <Sidebar className={classes.drawerPaper}>
                            <Menu logout={logout}/>
                        </Sidebar>
                        <div className={classes.content}>
                            {/*<SimpleBar style={{maxHeight: '100%'}}>*/}
                                {children}
                            {/*</SimpleBar>*/}
                        </div>
                    </main>
                    <Notification autoHideDuration={5000}/>
                </div>
            </div>
        </ThemeProvider>
    );
};

CustomLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    logout: ComponentPropType,
    isLoading: PropTypes.bool.isRequired,
    // setSidebarVisibility: PropTypes.func.isRequired,
    // title: PropTypes.string.isRequired,
}
const mapStateToProps = state => ({isLoading: state.admin.loading > 0, resources: getResources(state)});

export default connect(mapStateToProps)(withStyles(useStyles)(CustomLayout));
