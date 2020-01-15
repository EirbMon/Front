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
        this.listRef = React.createRef();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.messages.length < this.props.messages.length) {
            const list = this.listRef.current;
            return list.scrollHeight - list.scrollTop;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }
    }

    render() {
        return (
            <div className={this.props.classes.container} ref={this.listRef}>
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
