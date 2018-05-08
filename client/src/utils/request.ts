import axios from 'axios';
import {AxiosPromise} from 'axios';

import {HTTPMethod} from './httpMethod';

/**
 * Sends a request of the given method to the URL and wraps the result in a
 * Promise.
 *
 * @param method
 * @param url
 */
export const request = (method: HTTPMethod, url: string): Promise<JSON> => {
  let axiosRequest: AxiosPromise<JSON>;

  switch (method) {
    case HTTPMethod.GET:
      axiosRequest = axios.get<JSON>(url);
    case HTTPMethod.POST:
      axiosRequest = axios.post<JSON>(url);
  }

  return new Promise<JSON>((resolve, reject) => {
    axiosRequest
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};