import React from 'react';

const ChatMenu = ({name, rooms, minutes, selectedRoom, onChatroomClick, onProfileClick}) => (
  <div className="chat-menu">
    <div className="user" onClick={onProfileClick}>
      <div className="name">{name}</div>
      <div className="minutes">Online for {minutes} minutes</div>
    </div>
    {rooms.map((room, index) => (
      <div key={index} className={"menu-item " + (selectedRoom.name === room.name ? "selected" : "")} onClick={() => {onChatroomClick(room.id)}} >{room.name}</div>
    ))}
  </div>
)

export default ChatMenu;
