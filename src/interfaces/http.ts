export interface IInfo {
  protocolAcNo: string;
  prodTotalAmount: string;
  availableBalance: string;
  cid: string | number;
}
export interface ICashOut {
  reqNo: string;
  amount: string;
  protocolAcNo: string;
  remark: string;
  status: string;
  message: string;
}
export interface IRequest<T> {
  code: string;
  message: string;
  content: T;
  succeeded: Boolean;
}
