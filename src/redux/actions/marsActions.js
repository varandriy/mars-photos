import { userAPI } from '../../Api/api'

export const SET_PHOTOS = "SET_PHOTOS";


// export const setPhotos = (data) => ({ type: SET_PHOTOS, payload: data });

export const fetchPhotos = (rover, camera, sol) => {
    return async (dispatch) => {
        const data = await userAPI.getPhotos(rover, camera, sol);
        dispatch({ type: SET_PHOTOS, payload: data.data.photos })
    }
}
