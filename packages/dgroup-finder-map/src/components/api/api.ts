import axios from 'axios';
import {useEffect} from "react";

export const findDgroup = () => {
    const baseurl: string = process.env.REACT_APP_API_URL as string;
    const url = `${baseurl}/dgroup`;

    return axios.get(url).then((result: any) => {
        result.forEach((res: any) => {
           const result = res;
        });
    }).catch(() => {

    });
};