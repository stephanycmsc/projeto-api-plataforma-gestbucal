import { Query, Send } from 'express-static-serve-core'

export type ID = number

export interface TypedReq<T extends Query, U> extends Express.Request {
  body: U,
  query: T
}

export interface TypedRes<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}