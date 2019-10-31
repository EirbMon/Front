import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

// Visual Items
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

// Other Module
import TablePagination from '@material-ui/core/TablePagination';

//Functionalities 
import pagination from '../actions/pagination/index';

const styles = theme => ({
    paginationStyle: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(3),
        "&:last-child th, &:last-child td": {
            borderBottom: 0,
        },
    },

})


class PaginationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangePage(link) {
        this.props.dispatch(pagination.HandleChangePage(link, this.props.type));
    }

    handleChangeRowsPerPage(evt) {
        this.props.dispatch(pagination.HandleChangePage( this.props.links.self.href, this.props.type, evt.target.value));
    }


    tablePaginationActions() {
        const theme = useTheme();
        const classes = this.props.classes;

        const page = this.props.page;
        const links = this.props.links;



        function handleFirstPageButtonClick() {
            this.handleChangePage(links.first.href);
        }

        function handleBackButtonClick() {
            this.handleChangePage(links.prev.href);
        }

        function handleNextButtonClick() {
            this.handleChangePage(links.next.href);
        }

        function handleLastPageButtonClick() {
            this.handleChangePage(links.last.href);
        }

        return (
            <div className={classes.paginationStyle}>
                <IconButton
                    onClick={handleFirstPageButtonClick.bind(this)}
                    disabled={page.number === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick.bind(this)} disabled={page.number === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick.bind(this)}
                    disabled={page.number >= Math.ceil(page.totalElements / page.size) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick.bind(this)}
                    disabled={page.number >= Math.ceil(page.totalElements / page.size) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </div>
        );
    }

    render() {
        const page = this.props.page;

        return (

            <TablePagination
                id="tablePaginationNoBorder"
                colSpan={3}
                rowsPerPageOptions={[5, 10, 15, 20]}
                count={page.totalElements}
                rowsPerPage={page.size}
                page={page.number}
                labelRowsPerPage="row per page"
                onChangePage={this.handleChangePage.bind(this)}
                onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                ActionsComponent={this.tablePaginationActions.bind(this)}
            />

        )
    }


}

function select() {
    return {};
}

export default connect(select)(withStyles(styles)(PaginationComponent))

