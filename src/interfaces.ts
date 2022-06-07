import { Query } from 'express-static-serve-core'

export interface TypedReq<T extends Query, U> extends Express.Request { query: T, body: U }