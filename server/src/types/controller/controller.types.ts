import { Response } from "express";

// For controller which return server responses like res.status(200).json({...})
export type ResponsePromise<
  T = Response<any, Record<string, any>> | undefined
> = Promise<T>;

