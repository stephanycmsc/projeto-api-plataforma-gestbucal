import { Request } from 'express';
import { ID } from './Core';

export type SessionUser = {
  id: ID;
  name: string;
  email: string;
  deleted: boolean;
  isActive: boolean;
};

interface ParamsDictionary {
  [key: string]: string;
}

export interface RequestWithSessionUser<P = ParamsDictionary> extends Request<P> {
  user?: SessionUser;
}

export type RequestWithID<T = {}> = RequestWithSessionUser<
  {
    id: ID;
  } & T
>;
