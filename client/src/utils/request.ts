import axios from 'axios';
import {AxiosPromise} from 'axios';

import {HTTPMethod} from './httpMethod';

export const request = (method: HTTPMethod, url: string): Promise<JSON> => {
  let axiosRequest: AxiosPromise<JSON>;

  switch (method) {
    case HTTPMethod.GET:
      axiosRequest = axios.get<JSON>(url);
    case HTTPMethod.POST:
      axiosRequest = axios.post<JSON>(url);
  }

  return new Promise((resolve, reject) => {
    axiosRequest
      .then(res => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};