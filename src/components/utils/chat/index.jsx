import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

import MessageList from './messageList'
import SendMessageForm from './sendMessageForm'
import TypingIndicator from './typingIndicator'
import generateAuthenSalonChatUrl from '../../../middleWare/generateAuthenSalonChatUrl'

const styles = () => ({
    container: {
        margin: '10px',
    }
});

class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            whoIsTying: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)

    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:e4efdafc-0767-447d-ba5c-9c77cea3fe19',
            userId: sessionStorage.getItem('email'),
            tokenProvider: new TokenProvider({
                url: generateAuthenSalonChatUrl
            })
        })

        chatManager.connect()
            .then(currentUser => {
                this.setState({ currentUser })
                console.log('Successful connection', currentUser)
                return currentUser.subscribeToRoom({
                    roomId: this.props.chatChannel,
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message]
                            })
                        },
                        onUserStartedTyping: user => {
                            console.log(user.name)
                            this.setState({
                                whoIsTying: [...this.state.whoIsTying, user.name],
                            })
                            console.log(this.state.whoIsTying)
                        },
                        onUserStoppedTyping: user => {
                            console.log('End', user.name)
                            this.setState({
                                whoIsTying: this.state.whoIsTying.filter(
                                    username => username !== user.name
                                ),
                            })
                        },
                    }
                })
            })
            .then((currentRoom) => this.setState({ currentRoom }))
            .catch(err => {
                console.log('Error on connection', err)
            })
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    sendTypingEvent() {
        this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.log('error', error))
    }

    render() {
        return (
            <div className={this.props.classes.container}>
                <h1>{this.state.currentRoom.name}</h1>
                <MessageList messages={this.state.messages} />
                <SendMessageForm
                    onSubmite={this.sendMessage}
                    onChange={this.sendTypingEvent}
                />
                <TypingIndicator whoIsTying={this.state.whoIsTying} />
            </div>
        )
    }
}

export default withStyles(styles)(ChatScreen)
