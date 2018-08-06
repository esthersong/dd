import * as types from '../actions/actionTypes';
const defaultState = {
  username: '',
  rooms: [{}],
  room: {},
  messages: {},
  loader: false,
  showChatroom: false
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username
      }
    case 'SHOW_PROFILE':
      return {
        ...state,
        showChatroom: action.showChatroom,
        room: {}
      }
    case 'GET_ROOMS':
      return {
        ...state,
        rooms: [
          ...action.rooms
        ]
      }
    case 'GET_ROOM_DATA_STARTED':
      return {
        ...state,
        showChatroom: action.showChatroom,
        loader: action.loader
      }
    case 'GET_ROOM_DATA_SUCCESS':
      return {
        ...state,
        loader: action.loader,
        room: action.room,
        messages: {
          ...state.messages,
          [action.room.id]: action.messages
        },
        showChatroom: true
      }
    case 'POST_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.roomId]: [
            ...state.messages[action.roomId],
            action.newMsg
          ]
        }
      }

  // case 'EDIT_TASK_TEXT':
  //   tasks[action.index]['text'] = action.text;
  //   return {
  //     ...state,
  //     tasks: [
  //       ...tasks
  //     ]
  //   }
  // case 'EDIT_TASK_STATUS':
  //   tasks[action.index]['completed'] = action.status;
  //   return {
  //     ...state,
  //     tasks: [
  //       ...tasks
  //     ]
  //   }
  default:
    return state
  }
}
