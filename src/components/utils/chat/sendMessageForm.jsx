import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, Typography, IconButton, Drawer, Toolbar, List, Divider } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
    content: {
        padding: '2px !important',
        paddingLeft: '10px !important',
        marginTop: '10px'
    }
});

class SendMessageForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmite = this.onSubmite.bind(this)
    }

    onChange(e) {
        this.setState({
            text: e.target.value,
        })
        this.props.onChange()
    }

    onSubmite(e) {
        e.preventDefault()
        this.props.onSubmite(this.state.text)
    }

    render() {
        return (
            <div className={this.props.classes.content}>
                <form onSubmit={this.onSubmite}>
                    <TextField label="Message" variant="outlined" onChange={this.onChange} />
                    <IconButton color="inherit" aria-label="ExitToAppIcon" type="submit">
                        <ExitToAppIcon />
                    </IconButton>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SendMessageForm)
