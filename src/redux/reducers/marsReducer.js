import { SET_PHOTOS } from '../actions/marsActions'

const initialState = [];


export const marsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            return action.payload;
        default: return state;
    }
};