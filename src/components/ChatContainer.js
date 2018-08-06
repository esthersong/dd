import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import ChatMenu from './ChatMenu';
import Chatroom from './Chatroom';
import Profile from './Profile';
import * as chatActions from '../actions/actions';

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesOnline: 0,
      username: ''
    }
  }

  componentDidMount() {
    this.props.getRooms();
    setInterval(() => {
      this.setState({
        minutes: this.state.minutes + 1
      })
    }, 60000);
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.setUsername(this.state.username);
  }

  render() {
    const { messages, room, rooms, username } = this.props;
    const roomMessages = messages[room.id] || [];
    let viewpage;
    if (username.length > 0) {
      viewpage = <div className="chatrooms">
        <ChatMenu rooms={rooms} name={username} selectedRoom={this.props.room} minutes={this.state.minutesOnline} onChatroomClick={this.props.onChatroomClick} onProfileClick={this.props.onProfileClick}/>
        {this.props.showChatroom ? <Chatroom room={this.props.room} name={username} messages={roomMessages} postMessage={this.props.postMessage} loader={this.props.loader}/> : <Profile name={username}/>}
      </div>
    } else {
      viewpage = <div className="set-username">
        <form onSubmit={this.onFormSubmit}>
          <input placeholder="Type your username..." value={this.state.username} onChange={this.handleChange}/>
          <button>Join the DoorDash Chat!</button>
        </form>
      </div>
    }
    return (
      <div className="chat-container">
      {viewpage}
      </div>
    )
  }
}


function mapStateToProps(state, props) {
  return {
    rooms: state.chatReducer.rooms,
    room: state.chatReducer.room,
    loader: state.chatReducer.loader,
    showChatroom: state.chatReducer.showChatroom,
    messages: state.chatReducer.messages,
    username: state.chatReducer.username
  };
}

const mapDispatchToProps = {
  getRooms: chatActions.getRooms,
  onChatroomClick: chatActions.getRoom,
  onProfileClick: chatActions.showProfile,
  postMessage: chatActions.postMessage,
  setUsername: chatActions.setUsername
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
