import React from 'react';
import Message from './Message';

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      firstName: this.props.name.split(' ')[0].toLowerCase()
    }
  }
  scrollToBottom() {
    let el = document.getElementById("message-board-bottom");
    el.scrollIntoView();
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  handleChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    let name = this.state.firstName.charAt(0).toUpperCase() + this.state.firstName.slice(1);
    if (this.state.message != '') {
      this.props.postMessage(this.props.room.id, name, this.state.message);
    }
    this.setState({
      message: ''
    });
  }
  render() {
    const { room, name } = this.props;
    const roomUsers = room.users || [];
    return (
      <div className="chatroom">
        {this.props.loader ? <p>Loading messages...</p> : ''}
        <div className="info">
          <div className="chatroom-name">{this.props.room.name}</div>
          <div className="chatroom-members">
          {
            roomUsers.map((user, index) => {
              if (index === roomUsers.length - 1) {
                return <span style={{color: user.toLowerCase() === this.state.firstName ? '#fc2046' : '#565656'}}>{user}</span>
              } else {
                return <span><span style={{color: user.toLowerCase() === this.state.firstName ? '#fc2046' : '#565656'}}>{user}</span>, </span>
              }
            })
          }
          </div>
        </div>
        <div className="message-board">
          {this.props.messages.map((message, index) => (
            <Message key={index} message={message} name={this.state.firstName}/>
          ))}
          <div id="message-board-bottom"></div>
        </div>
        <form onSubmit={this.onFormSubmit}>
          <input placeholder="Type a message..." value={this.state.message} onChange={this.handleChange}/>
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}
