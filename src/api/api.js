import * as axios from 'axios';

const baseURL = 'https://api.nasa.gov/mars-photos/api/v1';
const api_key = 'MKT91Mamn0mGLQUV16Zv84NMc3sh7wilGk76NJAO';

export const userAPI = {
  getPhotos: (rover, camera, sol) => {
    return axios.get(`${baseURL}/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${api_key}`);
  },
  getManifest: (rover) => {
    return axios.get(`${baseURL}/manifests/${rover}?api_key=${api_key}`);
  },
};
