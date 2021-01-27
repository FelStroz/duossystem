import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        type:"dark",
    }
});

export const initialState = () => ({
    theme: localStorage.getItem('theme'),
    grid: localStorage.getItem('grid'),
})
