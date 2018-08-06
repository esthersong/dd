import React from 'react';
import profPic from '../profile_icon.png';

const Profile = ({name}) => (
  <div className="profile">
    <img src={profPic}/>
    <div>{name}</div>
    <div>Online</div>
  </div>
)

export default Profile;
