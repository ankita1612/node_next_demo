import { Request, Response, NextFunction, RequestHandler } from 'express';
export declare const asyncHandler: (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => RequestHandler;
