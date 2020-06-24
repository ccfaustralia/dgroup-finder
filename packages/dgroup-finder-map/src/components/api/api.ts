import axios from 'axios';

export const findDgroup = (lat: number, lng : number) => {
    const baseurl: string = process.env.REACT_APP_API_URL as string;
    const url = `${baseurl}/dgroup?lat=${lat}&lng=${lng}&radius=5`;
    return axios.get(url).then(response => response.data);
};