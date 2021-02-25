import toast from './toast';
import http from './http';
import * as WebApi from '../webapi';

type Res_info = WebApi.webapi.response.TInfo;
type Res_cashOut = WebApi.webapi.response.TCashOut;
type Res_sendCode = WebApi.webapi.response.TSendCode;
type Res_accountClose = WebApi.webapi.response.TAccountClose;

interface IApiParams {
  protocolAcNo: string;
  cId?: string;
}
const PREFIX = '/autocloud';
class Api {
  params: IApiParams;
  constructor(protocolAcNo: string, cId: string) {
    this.params = {
      protocolAcNo: protocolAcNo,
      cId: cId || '',
    };
  }
  error() {
    toast('请求出错,请检查网络!');
  }
  query() {
    const url = PREFIX + '/account/asserts/query';
    return http.post<Res_info>(url, this.params);
  }
  cashOut() {
    const url = PREFIX + '/account/asserts/cashOut';
    return http.post<Res_cashOut>(url, this.params);
  }
  sendCode() {
    const url = PREFIX + '/account/asserts/sendCloseCode';
    return http.post<Res_sendCode>(url, this.params);
  }
  closeAccount(params = {}) {
    const url = PREFIX + '/account/asserts/closeAccount';
    Object.assign(params, this.params);
    return http.post<Res_accountClose>(url, params);
  }
}
export default Api;
