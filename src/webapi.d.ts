import { IRequest, IInfo, ICashOut } from './interfaces/http';

declare namespace webapi {
  export namespace request {}

  export namespace response {
    export type TInfo = IRequest<IInfo>;
    export type TCashOut = IRequest<ICashOut>;
    export type TSendCode = IRequest<string>;
    export type TAccountClose = IRequest<string>;
  }
}
