import { Query, Send } from 'express-static-serve-core'

export type ID = number

export interface TypedReq<T extends Query, U> extends Express.Request {
  query: T,
  body: U
}

export interface TypedRes<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}