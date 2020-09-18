import { combineReducers } from 'redux';
import { photosReducer } from './photosReducer';

export const mainReducer = combineReducers({
  photos: photosReducer,
});
