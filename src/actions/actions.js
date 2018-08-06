import * as types from './actionTypes';
import axios from 'axios';
import * as Constants from '../constants';

function getRoomsSuccess(data) {
  return {
    type: types.GET_ROOMS,
    rooms: data
  }
}

function getRoomDataStarted() {
  return {
    type: types.GET_ROOM_DATA_STARTED,
    loader: true,
    showChatroom: true
  }
}
function getRoomDataSuccess(data) {
  return {
    type: types.GET_ROOM_DATA_SUCCESS,
    loader: false,
    room: data.room,
    messages: data.messages
  }
}

function postMessageSuccess(data, id) {
  return {
    type: types.POST_MESSAGE,
    roomId: id,
    newMsg: data
  }
}

export const setUsername = (username) => {
    return {
      type: types.SET_USERNAME,
      username: username
    }
}

export const showProfile = () => {
  return {
    type: types.SHOW_PROFILE,
    showChatroom: false
  }
}
export const getRooms = () => {
  return function (dispatch) {
    return axios.get(`${Constants.API}rooms`)
    .then(data => {
      console.log('rooms list: ', data.data);
      dispatch(getRoomsSuccess(data.data));
    }).catch(err => {
      console.log('error: ', err);
    });
  }
}

export const getRoom = (id) => {
  return function (dispatch) {
    let promises = [];
    dispatch(getRoomDataStarted());
    promises.push(new Promise((resolve, reject) => {
      axios.get(`${Constants.API}rooms/${id}`)
      .then(data => {
        // console.log('success getting room data: ', data);
        resolve(data.data);
      }).catch(err => {
        console.log('error getting room: ', err);
        reject(err);
      })
    }));
    promises.push(new Promise((resolve, reject) => {
      axios.get(`${Constants.API}rooms/${id}/messages`)
      .then(data => {
        resolve(data.data);
      }).catch(err => {
        console.log('error: ', err);
        reject(err);
      })
    }))
    return Promise.all(promises).then(data => {
      let obj = {
        room: data[0],
        messages: data[1]
      };
      console.log('room and messages data: ', data);
      dispatch(getRoomDataSuccess(obj))
    }).catch(err => {
      console.log('err: ', err);
    })
  }
}

export const postMessage = (id, name, message) => {
  return function (dispatch) {
    return axios.post(`${Constants.API}rooms/${id}/messages`, {
      name: name,
      message: message
    })
    .then(data => {
      console.log('posted message successfully: ', data.data);
      dispatch(postMessageSuccess(data.data, id));
    }).catch(err => {
      console.log('error: ', err);
    });
  }
}
