import React, { Component } from 'react'

class TypingIndicator extends Component {
    render() {
        if (this.props.whoIsTying.length === 0) {
            return <div />
        } else if (this.props.whoIsTying.length === 1) {
            return <p>{this.props.whoIsTying[0]} is typing...</p>
        } else if (this.props.whoIsTying.length > 1) {
            return <p>{this.props.whoIsTying.join(' and ')} are typing...</p>
        }
    }
}

export default TypingIndicator
