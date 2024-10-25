export interface IResponse<T = undefined> {
  code: number;
  data?: T;
  msg: string;
}
