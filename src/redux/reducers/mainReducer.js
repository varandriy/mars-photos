import {combineReducers} from 'redux';
import {marsReducer} from './marsReducer'

export const mainReducer = combineReducers({
    photos: marsReducer
})
