import * as React from "react";
import {
    List,
    TextField,
    Pagination,
    CreateButton,
    Filter, SearchInput
} from 'react-admin';
import Toolbar from "@material-ui/core/Toolbar";
import {Link} from 'react-router-dom';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {useMediaQuery} from "@material-ui/core";

const ProductFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Localizar" source="q" alwaysOn/>
    </Filter>
);
const ProductActions = ({
                           basePath,
                           currentSort,
                           displayedFilters,
                           filters,
                           filterValues,
                           onUnselectItems,
                           resource,
                           selectedIds,
                           showFilter,
                           total
                       }) => (
    <Toolbar style={{display: 'flex', alignItems: 'center'}}>
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        })}
        <CreateButton basePath={basePath}/>
    </Toolbar>
);

const getColsForWidth = (width) => {
    if (width === 'xs') return 1;
    if (width === 'sm') return 1;
    if (width === 'md') return 3;
    if (width === 'lg') return 4;
    return 5;
};

const ProductPagination = props => <Pagination label="Itens por Página" initialValue={10}
                                              rowsPerPageOptions={[4, 10, 16, 22, 28]}  {...props} />;

const root = {
    margin: 0,
}

const gridPic = {
    width: '15%',
}

const gridPicMobile = {
    width: '50%',
}

const gridList = {
    width: 'calc(100% - 40px)',
    margin: 20,
}

const tileBar = {
    background:
        'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
}

const price = {
    display: 'inline',
    fontSize: '1em',
}

const LoadedGridList = ({ids, data, basePath}) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return(
        <div style={root}>
            <MuiGridList
                cellHeight={180}
                cols={(isSmall) ? getColsForWidth("sm") : getColsForWidth("lg")}
                style={gridList}
            >
                {ids.map(id => (
                    <GridListTile
                        component={Link}
                        key={id}
                        to={`/products/${id}`}
                        style={(isSmall) ? gridPicMobile : gridPic}
                    >
                        <img src={`http://localhost:8000/files/${data[id].photo[0]}`} alt="Loading..."/>
                        <GridListTileBar
                            style={tileBar}
                            title={
                                data[id].name
                            }
                            subtitle={
                                <span>R$
                                    <TextField
                                        style={price}
                                        source="price"
                                        record={data[id]}
                                        color="inherit"
                                    />
                                </span>
                            }
                        />
                    </GridListTile>
                ))}
            </MuiGridList>
        </div>
    );
}

export const ProductList = (props) => {
    return (
    <List title="Lista de Produtos" sort={{field: 'createdAt', order: 'DESC'}} actions={<ProductActions/>}
          pagination={<ProductPagination/>} filters={<ProductFilter/>} {...props}>
        <LoadedGridList/>
    </List>
);
}
