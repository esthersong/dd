import React from 'react';

const Message = ({message, name}) => (
  <div className="message-box">
    <div className={message.name.toLowerCase() === name ? 'my-msg' : 'user-msg'}>
      <div className="message">{message.message}</div>
      <div className="message-name">{message.name === undefined || message.name === name ? '' : message.name}</div>
    </div>
  </div>
)

export default Message;
