import { SET_PHOTOS } from '../actions/photosActions';

const initialState = [];

export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return action.payload;
    default:
      return state;
  }
};
