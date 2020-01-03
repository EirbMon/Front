import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    container: {
        height: '500px',
        overflowY: 'auto',
    },
    card: {
        marginTop: '10px',
        marginBottom: '10px'
    },
    content: {
        padding: '2px !important',
        paddingLeft: '10px !important'
    }
});

class MessageList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.classes.container}>
                {this.props.messages.map((message, index) => (
                    <Card key={index} className={this.props.classes.card}>
                        <CardContent className={this.props.classes.content}>
                            <Typography color="textSecondary" gutterBottom>
                                {message.senderId}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {message.text}
                            </Typography>
                        </CardContent>

                    </Card>

                ))}
            </div>
        )
    }
}

export default withStyles(styles)(MessageList)
