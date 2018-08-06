import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import App from './App';
import * as actions from './actions/actions';
import * as types from './actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to add a message', () => {
    const id = 0;
    const name = 'username';
    const message = "This is a test message";
    const store = mockStore({});
    const expectedMessage = message;
    const expectedName = name;
    const expectedAction = types.POST_MESSAGE;

    return store.dispatch(actions.postMessage(id, name, message)).then(() => {
      expect(store.getActions()[0]["newMsg"]["message"]).toEqual(expectedMessage);
      expect(store.getActions()[0]["newMsg"]["name"]).toEqual(expectedName);
      expect(store.getActions()[0]["type"]).toEqual(expectedAction);
    })
  });

  it('should create an action to get chatrooms', () => {
    const store = mockStore({});
    return store.dispatch(actions.getRooms())
    .then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it("should create an action to get a chatroom's info", () => {
    const id = 0;
    const store = mockStore({});
    return store.dispatch(actions.getRoom(id))
    .then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });


})
