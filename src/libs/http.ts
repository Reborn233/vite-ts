// import { IRequest } from '../interfaces/http';

class Http {
  post<T>(url: string, data?: any) {
    return new Promise<T>((reslove, reject) => {
      let request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8',
      );
      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          const response = JSON.parse(this.response);
          reslove(response as T);
        } else {
          reject(this);
        }
      };

      request.onerror = function (error) {
        reject(error);
      };

      let params = '';
      for (let key in data) {
        if (data[key] !== '') {
          params += `${key}=${data[key]}&`;
        }
      }
      params += `_t=${Date.now()}`;
      console.log(params);
      request.send(params);
    });
  }
}

export default new Http();
