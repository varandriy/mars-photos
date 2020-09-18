import { userAPI } from '../../api/api';

export const SET_PHOTOS = 'SET_PHOTOS';

export const fetchPhotos = (rover, camera, sol) => {
  return async (dispatch) => {
    const response = await userAPI.getPhotos(rover, camera, sol);
    dispatch({ type: SET_PHOTOS, payload: response.data.photos });
  };
};
