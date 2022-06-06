import { Query } from 'express-static-serve-core'

export type ID = number
export type BaseResponse<Body> = { statusCode: number, body?: Body }

export type BaseResponseBody<ResponseContract> = {
  status?: number
  message?: string
  data?: ResponseContract
  error?: {
    message: string
    detail: string
    stack?: string
  }
}

export interface TypedReq<T extends Query, U> extends Express.Request { query: T, body: U }